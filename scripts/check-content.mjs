import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const storiesPath = path.join(rootDir, "data", "stories.ts");
const sourceText = fs.readFileSync(storiesPath, "utf8");
const source = ts.createSourceFile(storiesPath, sourceText, ts.ScriptTarget.Latest, true);

const issues = [];

const frenchAccentHints = [
  ["C'etait", "C'était"],
  ["tres", "très"],
  ["matinee", "matinée"],
  ["melange", "mélange/mélangé"],
  ["recolte", "récolte/récolté"],
  ["fraichement", "fraîchement"],
  ["epinards", "épinards"],
  ["gateau", "gâteau"],
  ["regle", "règle"],
  ["Voila", "Voilà"],
  ["premiere", "première"],
  ["commenca", "commença"],
  ["glacage", "glaçage"],
  ["tete", "tête"],
  ["epaules", "épaules"],
  ["lecha", "lécha"],
  ["crierent", "crièrent"],
  ["sure", "sûre"],
  ["reflechit", "réfléchit"],
  ["pere", "père"],
  ["journee", "journée"],
  ["probleme", "problème"],
  ["equitablement", "équitablement"],
];

function lineOf(node) {
  return source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
}

function textOfName(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return name.text;
  }

  return undefined;
}

function prop(objectLiteral, propertyName) {
  return objectLiteral.properties.find((property) => {
    if (!ts.isPropertyAssignment(property)) {
      return false;
    }

    return textOfName(property.name) === propertyName;
  });
}

function stringValue(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }

  if (ts.isTemplateExpression(node)) {
    return node.getText(source);
  }

  return undefined;
}

function addIssue(node, message) {
  issues.push(`${path.relative(rootDir, storiesPath)}:${lineOf(node)} - ${message}`);
}

function checkFrenchText(node, value) {
  for (const [needle, suggestion] of frenchAccentHints) {
    const pattern = new RegExp(`(^|[^\\p{L}])${needle}([^\\p{L}]|$)`, "u");
    if (pattern.test(value)) {
      addIssue(node, `French translation may need proofreading: "${needle}" -> "${suggestion}".`);
    }
  }
}

function checkStringArray(arrayNode, language) {
  arrayNode.elements.forEach((element, index) => {
    const value = stringValue(element);

    if (value == null) {
      return;
    }

    if (value.trim().length === 0) {
      addIssue(element, `${language}[${index}] is empty.`);
    }

    if (language === "fr") {
      checkFrenchText(element, value);
    }
  });
}

function hasBooleanProperty(objectLiteral, propertyName) {
  const property = prop(objectLiteral, propertyName);
  if (!property) {
    return false;
  }

  return property.initializer.kind === ts.SyntaxKind.TrueKeyword;
}

function checkAlignedTranslations(alignedNode, storyObject, storyId) {
  if (!ts.isArrayLiteralExpression(alignedNode)) {
    addIssue(alignedNode, `${storyId}: pageTranslations.aligned must be an array.`);
    return;
  }

  alignedNode.elements.forEach((pageNode, pageIndex) => {
    if (pageNode.kind === ts.SyntaxKind.Identifier && pageNode.getText(source) === "undefined") {
      return;
    }

    if (!ts.isArrayLiteralExpression(pageNode)) {
      addIssue(pageNode, `${storyId}: aligned[${pageIndex}] must be an array of segments.`);
      return;
    }

    if (pageNode.elements.length === 0) {
      addIssue(pageNode, `${storyId}: aligned[${pageIndex}] has no segments.`);
    }

    pageNode.elements.forEach((segmentNode, segmentIndex) => {
      if (!ts.isObjectLiteralExpression(segmentNode)) {
        addIssue(segmentNode, `${storyId}: aligned[${pageIndex}][${segmentIndex}] must be an object.`);
        return;
      }

      for (const language of ["am", "fr", "en"]) {
        const languageProp = prop(segmentNode, language);
        const value = languageProp ? stringValue(languageProp.initializer) : undefined;

        if (!value?.trim()) {
          addIssue(
            segmentNode,
            `${storyId}: aligned[${pageIndex}][${segmentIndex}].${language} is missing or empty.`,
          );
          continue;
        }

        if (language === "fr") {
          checkFrenchText(languageProp.initializer, value);
        }
      }
    });
  });

  const qualityChecks = prop(storyObject, "qualityChecks");
  const qualityLiteral = qualityChecks?.initializer;
  const isPublishable =
    qualityLiteral && ts.isObjectLiteralExpression(qualityLiteral)
      ? hasBooleanProperty(qualityLiteral, "translationProofread") ||
        hasBooleanProperty(qualityLiteral, "publicationReady")
      : false;

  if (!isPublishable) {
    return;
  }

  const pages = prop(storyObject, "pages");
  const pagesLength = pages?.initializer && ts.isArrayLiteralExpression(pages.initializer)
    ? pages.initializer.elements.length
    : undefined;

  if (pagesLength != null && alignedNode.elements.length < pagesLength) {
    addIssue(
      alignedNode,
      `${storyId}: publishable translated stories must align every page (${alignedNode.elements.length}/${pagesLength}).`,
    );
  }
}

function checkStory(storyObject) {
  const idProperty = prop(storyObject, "id");
  const storyId = idProperty ? stringValue(idProperty.initializer) ?? "unknown-story" : "unknown-story";
  const pageTranslations = prop(storyObject, "pageTranslations");

  if (!pageTranslations || !ts.isObjectLiteralExpression(pageTranslations.initializer)) {
    return;
  }

  for (const language of ["fr", "en"]) {
    const languageProperty = prop(pageTranslations.initializer, language);
    if (languageProperty && ts.isArrayLiteralExpression(languageProperty.initializer)) {
      checkStringArray(languageProperty.initializer, language);
    }
  }

  const aligned = prop(pageTranslations.initializer, "aligned");
  if (aligned) {
    checkAlignedTranslations(aligned.initializer, storyObject, storyId);
  }
}

function visit(node) {
  if (
    ts.isVariableDeclaration(node) &&
    ts.isIdentifier(node.name) &&
    node.name.text === "stories" &&
    node.initializer &&
    ts.isArrayLiteralExpression(node.initializer)
  ) {
    node.initializer.elements.forEach((element) => {
      if (ts.isObjectLiteralExpression(element)) {
        checkStory(element);
      }
    });
  }

  ts.forEachChild(node, visit);
}

visit(source);

if (issues.length > 0) {
  console.error("Content validation failed:");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log("Content validation passed.");
