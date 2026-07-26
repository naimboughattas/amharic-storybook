import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";

import { useReadingProgress } from "@/features/progress/useReadingProgress";
import { colors } from "@/theme/colors";

/**
 * The app renders into `#root`, so the page behind it keeps whatever the
 * stylesheet painted before boot. On web that shows up as a white band on
 * overscroll whenever the reader's chosen theme differs from the system one.
 */
function useWebDocumentBackground(background: string) {
  useEffect(() => {
    if (Platform.OS !== "web" || typeof document === "undefined") {
      return;
    }

    document.documentElement.style.backgroundColor = background;
  }, [background]);
}

export default function RootLayout() {
  const { theme } = useReadingProgress();
  const palette = colors[theme];

  useWebDocumentBackground(palette.background);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: palette.background },
        headerTintColor: palette.text,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="story/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
