import { TouchableOpacity } from "react-native";
import { ChevronRight } from "lucide-react-native";
import type { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";
import {
  SectionContainer,
  HorizontalScrollContainer,
} from "@/components/styled/Layout";
import {
  PaddedContainer,
  HorizontalContainer,
  SpaceBetweenContainer,
} from "@/components/styled/Container";
import { Title, Caption } from "@/components/styled/Typography";
import { theme } from "@/styles/theme";

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  onMoviePress: (movie: Movie) => void;
  onSeeMorePress?: () => void;
  size?: "small" | "medium" | "large";
  showSeeMore?: boolean;
}

export default function MovieSection({
  title,
  movies,
  onMoviePress,
  onSeeMorePress,
  size = "medium",
  showSeeMore = true,
}: MovieSectionProps) {
  return (
    <SectionContainer>
      <PaddedContainer padding="md">
        <SpaceBetweenContainer style={{ marginBottom: theme.spacing.md }}>
          <Title size="xl" weight="bold">
            {title}
          </Title>

          {showSeeMore && onSeeMorePress && (
            <TouchableOpacity onPress={onSeeMorePress} activeOpacity={0.7}>
              <HorizontalContainer>
                <Caption
                  size="base"
                  weight="semibold"
                  color={theme.colors.primary[500]}
                  style={{ marginRight: theme.spacing.xs }}
                >
                  See More
                </Caption>
                <ChevronRight size={16} color={theme.colors.primary[500]} />
              </HorizontalContainer>
            </TouchableOpacity>
          )}
        </SpaceBetweenContainer>
      </PaddedContainer>

      <HorizontalScrollContainer>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onPress={onMoviePress}
            size={size}
          />
        ))}
      </HorizontalScrollContainer>
    </SectionContainer>
  );
}
