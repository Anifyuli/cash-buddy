import { fontConfig } from "@/themes/font";
import { ColorSchemeName } from "react-native";
import {
  configureFonts,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";

// Custom colors for light theme with a greenish background
const lightColors = {
  primary: "rgb(46, 125, 50)",
  onPrimary: "rgb(255, 255, 255)",
  primaryContainer: "rgb(200, 230, 201)",
  onPrimaryContainer: "rgb(27, 94, 32)",

  secondary: "rgb(33, 150, 243)",
  onSecondary: "rgb(255, 255, 255)",
  secondaryContainer: "rgb(187, 222, 251)",
  onSecondaryContainer: "rgb(13, 71, 161)",

  tertiary: "rgb(76, 175, 80)",
  onTertiary: "rgb(255, 255, 255)",
  tertiaryContainer: "rgb(220, 237, 200)",
  onTertiaryContainer: "rgb(51, 105, 30)",

  error: "rgb(244, 67, 54)",
  onError: "rgb(255, 255, 255)",
  errorContainer: "rgb(255, 205, 210)",
  onErrorContainer: "rgb(198, 40, 40)",

  background: "rgb(248, 249, 250)",
  onBackground: "rgb(16, 20, 24)",
  surface: "rgb(255, 255, 255)",
  onSurface: "rgb(16, 20, 24)",

  surfaceVariant: "rgb(220, 229, 218)",
  onSurfaceVariant: "rgb(66, 77, 61)",
  outline: "rgb(114, 127, 109)",
  outlineVariant: "rgb(194, 201, 189)",

  shadow: "rgb(0, 0, 0)",
  scrim: "rgb(0, 0, 0)",
  inverseSurface: "rgb(37, 42, 46)",
  inverseOnSurface: "rgb(236, 241, 246)",
  inversePrimary: "rgb(129, 199, 132)",

  elevation: {
    level0: "transparent",
    level1: "rgb(241, 248, 233)",
    level2: "rgb(233, 245, 221)",
    level3: "rgb(224, 242, 208)",
    level4: "rgb(222, 241, 206)",
    level5: "rgb(217, 239, 202)"
  },

  surfaceDisabled: "rgba(16, 20, 24, 0.12)",
  onSurfaceDisabled: "rgba(16, 20, 24, 0.38)",
  backdrop: "rgba(44, 50, 39, 0.4)"
};

// Custom colors for dark theme with a dark greenish background
const darkColors = {
  primary: "rgb(129, 199, 132)",
  onPrimary: "rgb(0, 51, 8)",
  primaryContainer: "rgb(0, 75, 12)",
  onPrimaryContainer: "rgb(157, 213, 160)",

  secondary: "rgb(144, 202, 249)",
  onSecondary: "rgb(0, 30, 66)",
  secondaryContainer: "rgb(0, 48, 99)",
  onSecondaryContainer: "rgb(187, 222, 251)",

  tertiary: "rgb(165, 214, 167)",
  onTertiary: "rgb(26, 69, 28)",
  tertiaryContainer: "rgb(38, 87, 40)",
  onTertiaryContainer: "rgb(193, 242, 195)",

  error: "rgb(255, 180, 171)",
  onError: "rgb(105, 0, 5)",
  errorContainer: "rgb(147, 0, 10)",
  onErrorContainer: "rgb(255, 218, 214)",

  background: "rgb(16, 20, 24)",
  onBackground: "rgb(227, 226, 230)",
  surface: "rgb(16, 20, 24)",
  onSurface: "rgb(227, 226, 230)",

  surfaceVariant: "rgb(66, 77, 61)",
  onSurfaceVariant: "rgb(194, 201, 189)",
  outline: "rgb(140, 147, 135)",
  outlineVariant: "rgb(66, 77, 61)",

  shadow: "rgb(0, 0, 0)",
  scrim: "rgb(0, 0, 0)",
  inverseSurface: "rgb(227, 226, 230)",
  inverseOnSurface: "rgb(48, 47, 51)",
  inversePrimary: "rgb(46, 125, 50)",

  elevation: {
    level0: "transparent",
    level1: "rgb(22, 26, 31)",
    level2: "rgb(26, 32, 38)",
    level3: "rgb(31, 38, 45)",
    level4: "rgb(32, 39, 47)",
    level5: "rgb(35, 42, 51)"
  },

  surfaceDisabled: "rgba(227, 226, 230, 0.12)",
  onSurfaceDisabled: "rgba(227, 226, 230, 0.38)",
  backdrop: "rgba(44, 50, 39, 0.4)"
};

// Combine base theme with custom colors and fonts
export const getTheme = (colorScheme: ColorSchemeName) => {
  const baseTheme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;
  const customColors = colorScheme === "dark" ? darkColors : lightColors;

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      ...customColors,
    },
    fonts: configureFonts({ config: fontConfig, isV3: true }),
  };
};