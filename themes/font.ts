export const fontConfig = {
  // For large display text (e.g. splash screens, onboarding headers)
  displaySmall: {
    fontSize: 36, // Alt: 30–36
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 44,
  },
  displayMedium: {
    fontSize: 45, // Alt: 36–44
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 52,
  },
  displayLarge: {
    fontSize: 57, // Alt: 40–52
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 64,
  },

  // For section headers (e.g. "Transaction History", "Settings")
  headlineSmall: {
    fontSize: 24, // Alt: 20–24
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 32,
  },
  headlineMedium: {
    fontSize: 28, // Alt: 22–28
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 36,
  },
  headlineLarge: {
    fontSize: 32, // Alt: 24–30
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 40,
  },

  // For card titles, dialogs, and important subheadings
  titleSmall: {
    fontSize: 14, // Alt: 13–14
    fontWeight: "500",
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  titleMedium: {
    fontSize: 16, // Alt: 14–16
    fontWeight: "500",
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  titleLarge: {
    fontSize: 22, // Alt: 18–22
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 28,
  },

  // For button labels, form field labels, chips, badges
  labelSmall: {
    fontSize: 11, // Alt: 10–12
    fontWeight: "500",
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelMedium: {
    fontSize: 12, // Alt: 11–13
    fontWeight: "500",
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelLarge: {
    fontSize: 14, // Alt: 13–14
    fontWeight: "500",
    letterSpacing: 0.1,
    lineHeight: 20,
  },

  // For general paragraph/body content
  bodySmall: {
    fontSize: 12, // Alt: 12–13
    fontWeight: "400",
    letterSpacing: 0.4,
    lineHeight: 16,
  },
  bodyMedium: {
    fontSize: 14, // Alt: 13–15
    fontWeight: "400",
    letterSpacing: 0.25,
    lineHeight: 20,
  },
  bodyLarge: {
    fontSize: 16, // Alt: 15–17
    fontWeight: "400",
    letterSpacing: 0.15,
    lineHeight: 24,
  },
} as const;
