import { Dimensions, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Star, Calendar, Clock } from "lucide-react-native"
import type { Movie } from "@/types/movie"
import { theme } from "@/styles/theme"
import { MovieCard as StyledMovieCard } from "@/components/styled/Card"
import { Subtitle, Caption } from "@/components/styled/Typography"
import { HorizontalContainer, PaddedContainer } from "@/components/styled/Container"

interface MovieCardProps {
  movie: Movie
  onPress: (movie: Movie) => void
  size?: "small" | "medium" | "large"
}

const { width } = Dimensions.get("window")

export default function MovieCard({ movie, onPress, size = "medium" }: MovieCardProps) {
  const cardWidth = size === "small" ? width * 0.32 : size === "large" ? width * 0.85 : width * 0.45
  const imageHeight = size === "small" ? 140 : size === "large" ? 220 : 180

  const formatRuntime = (minutes?: number) => {
    if (!minutes) return ""
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <StyledMovieCard width={cardWidth} height={imageHeight + 80} onPress={() => onPress(movie)} activeOpacity={0.8}>
      <Image
        source={{
          uri: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/300x450/1e293b/64748b?text=No+Image",
        }}
        style={{
          width: cardWidth,
          height: imageHeight,
          borderTopLeftRadius: theme.borderRadius.xl,
          borderTopRightRadius: theme.borderRadius.xl,
        }}
        resizeMode="cover"
      />

      <LinearGradient
        colors={["transparent", "rgba(15, 23, 42, 0.9)"]}
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          height: imageHeight * 0.6,
          justifyContent: "flex-end",
        }}
      >
        <PaddedContainer padding="sm">
          <Subtitle
            size={size === "small" ? "sm" : "base"}
            numberOfLines={2}
            style={{ marginBottom: theme.spacing.xs }}
          >
            {movie.title}
          </Subtitle>

          <HorizontalContainer style={{ marginBottom: theme.spacing.xs }}>
            <Star size={12} color={theme.colors.accent.yellow} fill={theme.colors.accent.yellow} />
            <Caption size="xs" weight="semibold" color={theme.colors.accent.yellow} style={{ marginLeft: 4 }}>
              {movie.vote_average.toFixed(1)}
            </Caption>
          </HorizontalContainer>
        </PaddedContainer>
      </LinearGradient>

      <PaddedContainer
        padding="sm"
        style={{
          backgroundColor: "rgba(30, 41, 59, 0.95)",
          borderBottomLeftRadius: theme.borderRadius.xl,
          borderBottomRightRadius: theme.borderRadius.xl,
        }}
      >
        {size !== "small" && (
          <>
            <HorizontalContainer style={{ marginBottom: theme.spacing.xs }}>
              <Calendar size={10} color={theme.colors.dark[400]} />
              <Caption size="xs" color={theme.colors.dark[400]} style={{ marginLeft: 4 }}>
                {new Date(movie.release_date).getFullYear()}
              </Caption>
            </HorizontalContainer>

            {movie.runtime && (
              <HorizontalContainer>
                <Clock size={10} color={theme.colors.dark[400]} />
                <Caption size="xs" color={theme.colors.dark[400]} style={{ marginLeft: 4 }}>
                  {formatRuntime(movie.runtime)}
                </Caption>
              </HorizontalContainer>
            )}
          </>
        )}
      </PaddedContainer>
    </StyledMovieCard>
  )
}
