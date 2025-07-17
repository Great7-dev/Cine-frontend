import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/styles/theme";

export const GlassCard = styled.View<{ blur?: boolean }>`
  background-color: rgba(30, 41, 59, 0.8);
  border-radius: ${theme.borderRadius.lg}px;
  border: 1px solid rgba(148, 163, 184, 0.1);
  ${theme.shadows.md};
  backdrop-filter: blur(10px);
`;

export const GradientCard = styled(LinearGradient).attrs({
  colors: theme.gradients.card,
})`
  border-radius: ${theme.borderRadius.lg}px;
  ${theme.shadows.lg};
`;

export const MovieCard = styled.TouchableOpacity<{
  width: number;
  height: number;
}>`
  width: ${(props: { width: number }) => props.width}px;
  height: ${(props: { height: number }) => props.height}px;
  border-radius: ${theme.borderRadius.xl}px;
  overflow: hidden;
  margin-right: ${theme.spacing.sm}px;
  margin-bottom: ${theme.spacing.md}px;
  ${theme.shadows.lg};
`;

export const HeroCard = styled.View<{ width: number; height: number }>`
  width: ${(props: { width: number }) => props.width}px;
  height: ${(props: { height: number }) => props.height}px;
  position: relative;
  overflow: hidden;
`;

export const FloatingCard = styled.View`
  background-color: rgba(15, 23, 42, 0.95);
  border-radius: ${theme.borderRadius.xl}px;
  padding: ${theme.spacing.lg}px;
  margin: ${theme.spacing.md}px;
  border: 1px solid rgba(249, 115, 22, 0.2);
  ${theme.shadows.xl};
`;

export const StatsCard = styled.View`
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.1),
    rgba(236, 72, 153, 0.1)
  );
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.lg}px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  ${theme.shadows.md};
`;
