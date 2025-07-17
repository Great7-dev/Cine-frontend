// styles/global.ts
import { DefaultTheme } from "styled-components/native";

// 1. Extend the DefaultTheme interface
declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      textSecondary: string;
      accent: string;
    };
    spacing: {
      small: string;
      medium: string;
      large: string;
      xlarge: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
      xlarge: string;
    };
    fontSizes: {
      small: string;
      medium: string;
      large: string;
      xlarge: string;
      xxlarge: string;
    };
    fontWeights: {
      regular: string;
      medium: string;
      bold: string;
      black: string;
    };
  }
}

// 2. Define your theme with proper typing
export const theme: DefaultTheme = {
  colors: {
    primary: "#ff4d67",
    secondary: "#00c2cb",
    background: "#0f0f1a",
    text: "#ffffff",
    textSecondary: "rgba(255, 255, 255, 0.8)",
    accent: "#ffd700",
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "24px",
    xlarge: "32px",
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "12px",
    xlarge: "30px",
  },
  fontSizes: {
    small: "12px",
    medium: "14px",
    large: "16px",
    xlarge: "24px",
    xxlarge: "32px",
  },
  fontWeights: {
    regular: "400",
    medium: "500",
    bold: "700",
    black: "900",
  },
};

// 3. Define animations separately
export const animations = {
  fadeIn: `
    from { opacity: 0; }
    to { opacity: 1; }
  `,
  slideUp: `
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  `,
};
