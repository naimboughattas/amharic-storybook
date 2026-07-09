import { Text, View } from "react-native";

import type { AppPalette } from "@/theme/colors";
import { radius, spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { Story } from "@/types/story";

type Props = {
  story: Story;
  palette: AppPalette;
};

type QualityStep = {
  id: string;
  label: string;
  description: string;
  isDone: (story: Story) => boolean;
};

const qualitySteps: QualityStep[] = [
  {
    id: "license",
    label: "Licence",
    description: "Droits, licence et attribution verifies.",
    isDone: (story) => story.qualityChecks.licenseVerified,
  },
  {
    id: "native-review",
    label: "Relecture native",
    description: "Texte relu par une personne native amharophone.",
    isDone: (story) => story.qualityChecks.nativeReviewed,
  },
  {
    id: "child-test",
    label: "Test enfant",
    description: "Lecture essayee avec l'age cible.",
    isDone: (story) => story.qualityChecks.childTested,
  },
  {
    id: "publication",
    label: "Publication",
    description: "Pret pour une version publique de l'app.",
    isDone: (story) => story.qualityChecks.publicationReady,
  },
];

function getQualitySummary(story: Story) {
  if (story.qualityChecks.publicationReady) {
    return "Lecture prete pour publication: licence, revue native et test enfant sont valides.";
  }

  if (story.qualityChecks.licenseVerified) {
    return "Lecture candidate: droits verifies, revue native et test enfant restent necessaires avant publication.";
  }

  if (story.qualityChecks.childTested) {
    return "Lecture testee avec un enfant. Les droits et la revue finale restent a confirmer.";
  }

  if (story.qualityChecks.nativeReviewed) {
    return "Lecture relue par une personne native. Le test enfant et les droits restent a confirmer.";
  }

  if (story.validationStatus === "translated") {
    return "Texte traduit ou redige, mais pas encore pret pour le rituel public.";
  }

  return "Brouillon editorial: garder hors publication.";
}

export function QualityChecklist({ story, palette }: Props) {
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
          Controle qualite
        </Text>
        <Text selectable style={[typography.small, { color: palette.mutedText }]}>
          {completedSteps}/{qualitySteps.length} etapes validees
        </Text>
        <Text selectable style={[typography.body, { color: palette.mutedText }]}>
          {getQualitySummary(story)}
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
                {isDone ? "OK" : "A faire"}
              </Text>
              <View style={{ flex: 1, gap: spacing.xs }}>
                <Text selectable style={[typography.small, { color: palette.text }]}>
                  {step.label}
                </Text>
                <Text selectable style={[typography.small, { color: palette.mutedText }]}>
                  {step.description}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={{ gap: spacing.xs }}>
        <Text selectable style={[typography.small, { color: palette.text }]}>
          Note editoriale
        </Text>
        <Text selectable style={[typography.small, { color: palette.mutedText }]}>
          {story.qualityChecks.editorialNote}
        </Text>
        <Text selectable style={[typography.small, { color: palette.mutedText }]}>
          Modifications : {story.qualityChecks.sourceModifications}
        </Text>
        {isPublishedStatusIncomplete ? (
          <Text selectable style={[typography.small, { color: palette.danger }]}>
            Attention : le statut publie demande toutes les etapes qualite validees.
          </Text>
        ) : null}
      </View>
    </View>
  );
}
