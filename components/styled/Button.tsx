import styled from "styled-components/native"
import { LinearGradient } from "expo-linear-gradient"
import { theme } from "@/styles/theme"

export const PrimaryButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${({ disabled }) => (disabled ? theme.colors.dark[600] : theme.colors.primary[500])};
  border-radius: ${theme.borderRadius.full}px;
  padding: ${theme.spacing.md}px ${theme.spacing.xl}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${theme.shadows.md};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`

export const GradientButton = styled(LinearGradient).attrs(({ colors = theme.gradients.primary }) => ({
  colors,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
}))<{ colors?: string[] }>`
  border-radius: ${theme.borderRadius.full}px;
  padding: ${theme.spacing.md}px ${theme.spacing.xl}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${theme.shadows.lg};
`

export const GradientButtonTouchable = styled.TouchableOpacity`
  border-radius: ${theme.borderRadius.full}px;
  overflow: hidden;
`

export const SecondaryButton = styled.TouchableOpacity`
  border: 2px solid ${theme.colors.dark[600]};
  border-radius: ${theme.borderRadius.full}px;
  padding: ${theme.spacing.md}px ${theme.spacing.xl}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`

export const IconButton = styled.TouchableOpacity<{ size?: number }>`
  width: ${({ size = 48 }) => size}px;
  height: ${({ size = 48 }) => size}px;
  border-radius: ${({ size = 48 }) => size / 2}px;
  background-color: rgba(30, 41, 59, 0.8);
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(148, 163, 184, 0.2);
  ${theme.shadows.md};
`

export const TabButton = styled.TouchableOpacity<{ active?: boolean }>`
  flex: 1;
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md}px;
  background-color: ${({ active }) => (active ? theme.colors.primary[500] : "transparent")};
  align-items: center;
  justify-content: center;
`

export const GenreButton = styled.TouchableOpacity<{ selected?: boolean }>`
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.full}px;
  margin-right: ${theme.spacing.sm}px;
  background-color: ${({ selected }) => (selected ? theme.colors.primary[500] : "rgba(30, 41, 59, 0.8)")};
  border: 1px solid ${({ selected }) => (selected ? theme.colors.primary[500] : "rgba(148, 163, 184, 0.2)")};
`
