import styled from "styled-components/native"
import { theme } from "@/styles/theme"

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.md}px;
`

export const SectionContainer = styled.View`
  margin-bottom: ${theme.spacing.xl}px;
`

export const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 ${theme.spacing.md}px;
`

export const HorizontalScrollContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingLeft: 16,
    paddingRight: 8,
  },
})``

export const TabContainer = styled.View`
  background-color: rgba(30, 41, 59, 0.8);
  border-radius: ${theme.borderRadius.xl}px;
  padding: ${theme.spacing.xs}px;
  flex-direction: row;
  margin: ${theme.spacing.md}px;
  border: 1px solid rgba(148, 163, 184, 0.1);
`

export const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: ${theme.spacing.lg}px;
`

export const StatItem = styled.View`
  align-items: center;
`

export const MenuContainer = styled.View`
  background-color: rgba(30, 41, 59, 0.8);
  border-radius: ${theme.borderRadius.xl}px;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.1);
`

export const MenuItem = styled.TouchableOpacity<{ isLast?: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.md}px;
  border-bottom-width: ${({ isLast }) => (isLast ? 0 : 1)}px;
  border-bottom-color: rgba(148, 163, 184, 0.1);
`
