import styled from "styled-components/native"
import { theme } from "@/styles/theme"

export const Title = styled.Text<{
  size?: keyof typeof theme.typography.sizes
  weight?: keyof typeof theme.typography.weights
  color?: string
}>`
  font-size: ${({ size = "3xl" }) => theme.typography.sizes[size]}px;
  font-weight: ${({ weight = "bold" }) => theme.typography.weights[weight]};
  color: ${({ color = theme.colors.dark[50] }) => color};
  line-height: ${({ size = "3xl" }) => theme.typography.sizes[size] * 1.2}px;
`

export const Subtitle = styled.Text<{
  size?: keyof typeof theme.typography.sizes
  weight?: keyof typeof theme.typography.weights
  color?: string
}>`
  font-size: ${({ size = "xl" }) => theme.typography.sizes[size]}px;
  font-weight: ${({ weight = "semibold" }) => theme.typography.weights[weight]};
  color: ${({ color = theme.colors.dark[50] }) => color};
  line-height: ${({ size = "xl" }) => theme.typography.sizes[size] * 1.3}px;
`

export const BodyText = styled.Text<{
  size?: keyof typeof theme.typography.sizes
  weight?: keyof typeof theme.typography.weights
  color?: string
}>`
  font-size: ${({ size = "base" }) => theme.typography.sizes[size]}px;
  font-weight: ${({ weight = "normal" }) => theme.typography.weights[weight]};
  color: ${({ color = theme.colors.dark[200] }) => color};
  line-height: ${({ size = "base" }) => theme.typography.sizes[size] * 1.5}px;
`

export const Caption = styled.Text<{
  size?: keyof typeof theme.typography.sizes
  weight?: keyof typeof theme.typography.weights
  color?: string
}>`
  font-size: ${({ size = "sm" }) => theme.typography.sizes[size]}px;
  font-weight: ${({ weight = "medium" }) => theme.typography.weights[weight]};
  color: ${({ color = theme.colors.dark[400] }) => color};
  line-height: ${({ size = "sm" }) => theme.typography.sizes[size] * 1.4}px;
`

export const AccentText = styled.Text<{
  size?: keyof typeof theme.typography.sizes
  weight?: keyof typeof theme.typography.weights
}>`
  font-size: ${({ size = "base" }) => theme.typography.sizes[size]}px;
  font-weight: ${({ weight = "semibold" }) => theme.typography.weights[weight]};
  color: ${theme.colors.primary[500]};
  line-height: ${({ size = "base" }) => theme.typography.sizes[size] * 1.4}px;
`
