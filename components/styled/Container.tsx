import styled from "styled-components/native";
import { theme } from "@/styles/theme";

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.dark[900]};
`;

export const SafeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.colors.dark[900]};
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
  background-color: ${theme.colors.dark[900]};
`;

export const CenterContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.dark[900]};
`;

export const HorizontalContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SpaceBetweenContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PaddedContainer = styled.View`
  padding: ${(props: { padding?: keyof typeof theme.spacing }) =>
    theme.spacing[props.padding || "md"]}px;
`;

export const MarginContainer = styled.View`
  margin: ${(props: { margin?: keyof typeof theme.spacing }) =>
    theme.spacing[props.margin || "md"]}px;
`;

export const ContentContainer = styled.View`
  flex: 1;
  margin-top: ${(props: { headerHeight: number }) => props.headerHeight}px;
`;

export const ScrollContainerWithHeader = styled.ScrollView`
  flex: 1;
  background-color: ${theme.colors.dark[900]};
  padding-top: ${(props: { headerHeight: number }) => props.headerHeight}px;
`;
