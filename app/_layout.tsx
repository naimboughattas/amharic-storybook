import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Histoires amhariques" }} />
      <Stack.Screen name="story/[id]" options={{ title: "Lecture" }} />
    </Stack>
  );
}
