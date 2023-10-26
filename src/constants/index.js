const COLORS = {
  red: "#E73929",
  green: "#008700",
  blue: "#2563CC",
  yellow: "#F7BA50",

  lightBlue: "#E1F0FF",
  black: "black",
  grey: "#6D7989",
  coolGrey: "#F9FAFB",

  white: "#FFFFFF",
};

//  NOT CONFIRMS BLEOW
const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const SIZES = {
  xxSmall: 4,
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

const BUTTONS = {
  btmButton: {
    position: "absolute",
    bottom: 30,
    backgroundColor: COLORS.yellow,
    width: "100%",
    borderRadius: SIZES.xxSmall,
  },

  btmButtonText: {
    textAlign: "center",
    fontWeight: "600",
    padding: SIZES.small,
    fontSize: SIZES.medium,
  },
};

export { COLORS, FONT, SIZES, SHADOWS, BUTTONS };
