import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/styles/theme";

export const HeaderWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  overflow: hidden;
`;

export const HeaderGradient = styled(LinearGradient).attrs({
  colors: ["rgba(139, 92, 246, 0.1)", "rgba(236, 72, 153, 0.1)", "transparent"],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const HeaderBlur = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(20px);
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.lg}px ${theme.spacing.md}px;
  padding-top: ${theme.spacing.xl + 20}px;
  position: relative;
`;

export const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const HeaderRight = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(249, 115, 22, 0.1);
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.full}px;
  border: 1px solid rgba(249, 115, 22, 0.3);
`;

export const NotificationBadge = styled.View`
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: ${theme.colors.primary[500]};
  width: 18px;
  height: 18px;
  border-radius: 9px;
  align-items: center;
  justify-content: center;
  border: 2px solid ${theme.colors.dark[900]};
`;

export const SearchHeaderContainer = styled.View`
  background-color: rgba(30, 41, 59, 0.6);
  border-radius: ${theme.borderRadius.xl}px;
  padding: ${theme.spacing.md}px;
  margin: ${theme.spacing.md}px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  backdrop-filter: blur(10px);
`;

export const WelcomeContainer = styled.View`
  padding: 0 ${theme.spacing.md}px;
  padding-bottom: ${theme.spacing.md}px;
`;

export const TimeBasedContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${theme.spacing.xs}px;
`;

export const WeatherContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(6, 182, 212, 0.1);
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
  border-radius: ${theme.borderRadius.full}px;
  border: 1px solid rgba(6, 182, 212, 0.3);
`;

// Helper function to calculate header height
export const getHeaderHeight = (variant: string) => {
  const baseHeight = 100; 
  const welcomeHeight = variant === "home" ? 120 : 60; 
  return baseHeight + welcomeHeight;
};
