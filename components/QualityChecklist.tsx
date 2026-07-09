import { Text, View } from "react-native";

import type { InterfaceLanguage } from "@/features/i18n/translations";
import { uiText } from "@/features/i18n/translations";
import {
  getQualityEditorialNote,
  getQualitySourceModifications,
} from "@/features/i18n/storyText";
import type { AppPalette } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { Story } from "@/types/story";

type Props = {
  story: Story;
  palette: AppPalette;
  language: InterfaceLanguage;
};

type QualityStep = {
  id: string;
  label: Record<InterfaceLanguage, string>;
  description: Record<InterfaceLanguage, string>;
  isDone: (story: Story) => boolean;
};

const qualitySteps: QualityStep[] = [
  {
    id: "license",
    label: { fr: "Licence", en: "License" },
    description: {
      fr: "Droits, licence et attribution verifies.",
      en: "Rights, license and attribution checked.",
    },
    isDone: (story) => story.qualityChecks.licenseVerified,
  },
  {
    id: "native-review",
    label: { fr: "Relecture native", en: "Native review" },
    description: {
      fr: "Texte relu par une personne native amharophone.",
      en: "Text reviewed by a native Amharic speaker.",
    },
    isDone: (story) => story.qualityChecks.nativeReviewed,
  },
  {
    id: "child-test",
    label: { fr: "Test enfant", en: "Child test" },
    description: {
      fr: "Lecture essayee avec l'age cible.",
      en: "Reading tested with the target age group.",
    },
    isDone: (story) => story.qualityChecks.childTested,
  },
  {
    id: "publication",
    label: { fr: "Publication", en: "Publication" },
    description: {
      fr: "Pret pour une version publique de l'app.",
      en: "Ready for a public version of the app.",
    },
    isDone: (story) => story.qualityChecks.publicationReady,
  },
];

function getQualitySummary(story: Story, language: InterfaceLanguage) {
  if (story.qualityChecks.publicationReady) {
    if (language === "en") {
      return "Ready for publication: license, native review and child test are validated.";
    }

    return "Lecture prete pour publication: licence, revue native et test enfant sont valides.";
  }

  if (story.qualityChecks.licenseVerified) {
    if (language === "en") {
      return "Candidate reading: rights checked, native review and child test still needed before publication.";
    }

    return "Lecture candidate: droits verifies, revue native et test enfant restent necessaires avant publication.";
  }

  if (story.qualityChecks.childTested) {
    if (language === "en") {
      return "Reading tested with a child. Rights and final review still need confirmation.";
    }

    return "Lecture testee avec un enfant. Les droits et la revue finale restent a confirmer.";
  }

  if (story.qualityChecks.nativeReviewed) {
    if (language === "en") {
      return "Reading reviewed by a native speaker. Child test and rights still need confirmation.";
    }

    return "Lecture relue par une personne native. Le test enfant et les droits restent a confirmer.";
  }

  if (story.validationStatus === "translated") {
    if (language === "en") {
      return "Text translated or written, but not ready for the public ritual yet.";
    }

    return "Texte traduit ou redige, mais pas encore pret pour le rituel public.";
  }

  if (language === "en") {
    return "Editorial draft: keep out of publication.";
  }

  return "Brouillon editorial: garder hors publication.";
}

export function QualityChecklist({ story, palette, language }: Props) {
  const completedSteps = qualitySteps.filter((step) => step.isDone(story)).length;
  const isPublishedStatusIncomplete =
    story.validationStatus === "published" && !story.qualityChecks.publicationReady;

  return (
    <View
      style={{
        backgroundColor: palette.surfaceStrong,
        borderColor: palette.border,
        borderRadius: radius.md,
        borderWidth: 1,
        gap: spacing.md,
        padding: spacing.md,
      }}
    >
      <View style={{ gap: spacing.xs }}>
        <Text selectable style={[typography.subtitle, { color: palette.text }]}>
          {uiText[language].qualityTitle}
        </Text>
        <Text selectable style={[typography.small, { color: palette.mutedText }]}>
          {completedSteps}/{qualitySteps.length} {uiText[language].validatedSteps}
        </Text>
        <Text selectable style={[typography.body, { color: palette.mutedText }]}>
          {getQualitySummary(story, language)}
        </Text>
      </View>

      <View style={{ gap: spacing.sm }}>
        {qualitySteps.map((step) => {
          const isDone = step.isDone(story);
          const color = isDone ? palette.success : palette.warning;

          return (
            <View
              key={step.id}
              style={{
                alignItems: "flex-start",
                flexDirection: "row",
                gap: spacing.sm,
              }}
            >
              <Text
                selectable
                style={[
                  typography.small,
                  {
                    color,
                    fontWeight: "800",
                    minWidth: 54,
                  },
                ]}
              >
                {isDone ? "OK" : language === "en" ? "To do" : "A faire"}
              </Text>
              <View style={{ flex: 1, gap: spacing.xs }}>
                <Text selectable style={[typography.small, { color: palette.text }]}>
                  {step.label[language]}
                </Text>
                <Text selectable style={[typography.small, { color: palette.mutedText }]}>
                  {step.description[language]}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={{ gap: spacing.xs }}>
        <Text selectable style={[typography.small, { color: palette.text }]}>
          {language === "en" ? "Editorial note" : "Note editoriale"}
        </Text>
        <Text selectable style={[typography.small, { color: palette.mutedText }]}>
          {getQualityEditorialNote(story, language)}
        </Text>
        <Text selectable style={[typography.small, { color: palette.mutedText }]}>
          {language === "en" ? "Modifications" : "Modifications"} :{" "}
          {getQualitySourceModifications(story, language)}
        </Text>
        {isPublishedStatusIncomplete ? (
          <Text selectable style={[typography.small, { color: palette.danger }]}>
            {language === "en"
              ? "Warning: published status requires every quality step to be validated."
              : "Attention : le statut publie demande toutes les etapes qualite validees."}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
