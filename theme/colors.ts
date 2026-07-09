export type ThemeMode = "light" | "dark";

export type AppPalette = {
  background: string;
  surface: string;
  surfaceStrong: string;
  text: string;
  mutedText: string;
  border: string;
  primary: string;
  primaryText: string;
  accent: string;
  bedtimeSurface: string;
  bedtimeBorder: string;
  bedtimeText: string;
  success: string;
  warning: string;
  danger: string;
};

export const colors: Record<ThemeMode, AppPalette> = {
  light: {
    background: "#F7FBF7",
    surface: "#FFFFFF",
    surfaceStrong: "#EAF5EF",
    text: "#15211C",
    mutedText: "#52635B",
    border: "#D6E4DC",
    primary: "#007A65",
    primaryText: "#FFFFFF",
    accent: "#C9442E",
    bedtimeSurface: "#FFF6E8",
    bedtimeBorder: "#E6C99D",
    bedtimeText: "#4A2F16",
    success: "#2E7D32",
    warning: "#8A6400",
    danger: "#B3261E",
  },
  dark: {
    background: "#111714",
    surface: "#18231E",
    surfaceStrong: "#24332C",
    text: "#F1F7F3",
    mutedText: "#B8C8C0",
    border: "#31443A",
    primary: "#62D2B4",
    primaryText: "#08221B",
    accent: "#FF8A75",
    bedtimeSurface: "#2B251D",
    bedtimeBorder: "#6B5637",
    bedtimeText: "#FFE8C7",
    success: "#8BD48F",
    warning: "#F8C942",
    danger: "#FFB4AB",
  },
};
