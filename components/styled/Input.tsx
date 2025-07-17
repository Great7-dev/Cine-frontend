import styled from "styled-components/native"
import { theme } from "@/styles/theme"

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(30, 41, 59, 0.8);
  border-radius: ${theme.borderRadius.xl}px;
  padding: ${theme.spacing.md}px;
  margin: ${theme.spacing.md}px 0;
  border: 1px solid rgba(148, 163, 184, 0.1);
  ${theme.shadows.sm};
`

export const SearchInput = styled.TextInput`
  flex: 1;
  color: ${theme.colors.dark[50]};
  font-size: ${theme.typography.sizes.base}px;
  margin-left: ${theme.spacing.sm}px;
  font-weight: ${theme.typography.weights.medium};
`

export const FilterContainer = styled.View`
  background-color: rgba(30, 41, 59, 0.6);
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.xs}px;
  flex-direction: row;
  margin: ${theme.spacing.md}px 0;
  border: 1px solid rgba(148, 163, 184, 0.1);
`
