import { Dimensions, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Play, Star, Info } from "lucide-react-native"
import type { Movie } from "@/types/movie"
import { theme } from "@/styles/theme"
import { HeroCard } from "@/components/styled/Card"
import { Title, BodyText, Caption } from "@/components/styled/Typography"
import { GradientButtonTouchable, GradientButton, SecondaryButton } from "@/components/styled/Button"
import { HorizontalContainer, PaddedContainer } from "@/components/styled/Container"

interface HeroSectionProps {
  movie: Movie
  onPlayTrailer: (movie: Movie) => void
  onMoviePress: (movie: Movie) => void
}

const { width, height } = Dimensions.get("window")

export default function HeroSection({ movie, onPlayTrailer, onMoviePress }: HeroSectionProps) {
  return (
    <HeroCard width={width} height={height * 0.65}>
      <Image
        source={{
          uri: movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        style={{ width, height: height * 0.65 }}
        resizeMode="cover"
      />

      <LinearGradient
        colors={theme.gradients.hero}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      <PaddedContainer
        padding="xl"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Title size="4xl" numberOfLines={2} style={{ marginBottom: theme.spacing.sm }}>
          {movie.title}
        </Title>

        <HorizontalContainer style={{ marginBottom: theme.spacing.md }}>
          <Star size={18} color={theme.colors.accent.yellow} fill={theme.colors.accent.yellow} />
          <Caption
            size="lg"
            weight="semibold"
            color={theme.colors.accent.yellow}
            style={{ marginLeft: theme.spacing.sm }}
          >
            {movie.vote_average.toFixed(1)}
          </Caption>
          <Caption size="sm" color={theme.colors.dark[400]} style={{ marginLeft: theme.spacing.sm }}>
            ({movie.vote_count.toLocaleString()} votes)
          </Caption>
        </HorizontalContainer>

        <BodyText
          numberOfLines={3}
          style={{
            marginBottom: theme.spacing.xl,
            lineHeight: 22,
          }}
        >
          {movie.overview}
        </BodyText>

        <HorizontalContainer>
          <GradientButtonTouchable
            onPress={() => onPlayTrailer(movie)}
            style={{ flex: 1, marginRight: theme.spacing.sm }}
          >
            <GradientButton colors={theme.gradients.primary}>
              <Play size={20} color="white" fill="white" />
              <Title size="base" weight="bold" style={{ marginLeft: theme.spacing.sm }}>
                Watch Trailer
              </Title>
            </GradientButton>
          </GradientButtonTouchable>

          <SecondaryButton onPress={() => onMoviePress(movie)}>
            <Info size={20} color={theme.colors.dark[400]} />
            <Caption weight="semibold" color={theme.colors.dark[400]} style={{ marginLeft: theme.spacing.sm }}>
              Details
            </Caption>
          </SecondaryButton>
        </HorizontalContainer>
      </PaddedContainer>
    </HeroCard>
  )
}
