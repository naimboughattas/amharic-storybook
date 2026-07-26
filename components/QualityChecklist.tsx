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
      fr: "Droits, licence et attribution vérifiés.",
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
    id: "translation-proofread",
    label: { fr: "Relecture FR/EN", en: "FR/EN proofreading" },
    description: {
      fr: "Accents, orthographe, grammaire, syntaxe et conjugaison vérifiés.",
      en: "Accents, spelling, grammar, syntax and conjugation checked.",
    },
    isDone: (story) => story.qualityChecks.translationProofread,
  },
  {
    id: "child-test",
    label: { fr: "Test enfant", en: "Child test" },
    description: {
      fr: "Lecture essayée avec l'âge cible.",
      en: "Reading tested with the target age group.",
    },
    isDone: (story) => story.qualityChecks.childTested,
  },
  {
    id: "publication",
    label: { fr: "Publication", en: "Publication" },
    description: {
      fr: "Prêt pour une version publique de l'app.",
      en: "Ready for a public version of the app.",
    },
    isDone: (story) => story.qualityChecks.publicationReady,
  },
];

/** Most advanced milestone reached, checked from the strongest one down. */
function getQualitySummary(story: Story, language: InterfaceLanguage) {
  const text = uiText[language];

  if (story.qualityChecks.publicationReady) {
    return text.qualitySummaryPublicationReady;
  }

  if (story.qualityChecks.licenseVerified) {
    return text.qualitySummaryLicensed;
  }

  if (story.qualityChecks.childTested) {
    return text.qualitySummaryChildTested;
  }

  if (story.qualityChecks.nativeReviewed) {
    return text.qualitySummaryNativeReviewed;
  }

  if (story.validationStatus === "translated") {
    return text.qualitySummaryTranslated;
  }

  return text.qualitySummaryDraft;
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
                {isDone ? "OK" : uiText[language].todo}
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
          {uiText[language].editorialNote}
        </Text>
        <Text selectable style={[typography.small, { color: palette.mutedText }]}>
          {getQualityEditorialNote(story, language)}
        </Text>
        <Text selectable style={[typography.small, { color: palette.mutedText }]}>
          {uiText[language].modifications} :{" "}
          {getQualitySourceModifications(story, language)}
        </Text>
        {isPublishedStatusIncomplete ? (
          <Text selectable style={[typography.small, { color: palette.danger }]}>
            {uiText[language].publishedStatusWarning}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
