"use client";

import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Filter } from "lucide-react-native";
import type { Movie } from "@/types/movie";
import { movieService } from "@/services/movieService";
import MovieCard from "@/features/movies/components/MovieCard";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import {
  Container,
  CenterContainer,
  PaddedContainer,
} from "@/components/styled/Container";
import { Title, Caption, BodyText } from "@/components/styled/Typography";
import { TabButton } from "@/components/styled/Button";
import { TabContainer } from "@/components/styled/Layout";
import { theme } from "@/styles/theme";

type CategoryType = "popular" | "top-rated" | "upcoming" | "trending";

const categoryConfig = {
  popular: {
    title: "🔥 Popular Movies",
    subtitle: "Most popular movies right now",
    fetchFunction: () => movieService.getPopularMovies(),
  },
  "top-rated": {
    title: "⭐ Top Rated Movies",
    subtitle: "Highest rated movies of all time",
    fetchFunction: () => movieService.getTopRatedMovies(),
  },
  upcoming: {
    title: "🎬 Coming Soon",
    subtitle: "Movies releasing soon",
    fetchFunction: () => movieService.getUpcomingMovies(),
  },
  trending: {
    title: "🔥 Trending Movies",
    subtitle: "What everyone's watching",
    fetchFunction: (timeWindow: "day" | "week" = "week") =>
      movieService.getTrendingMovies(timeWindow),
  },
};

export default function MovieCategoryScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState<"day" | "week">("week");
  const router = useRouter();

  const categoryKey = category as CategoryType;
  const config = categoryConfig[categoryKey];

  useEffect(() => {
    fetchMovies();
  }, [category, timeWindow]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      let result;
      if (categoryKey === "trending") {
        result = await config.fetchFunction(timeWindow);
      } else {
        result = await config.fetchFunction();
      }
      setMovies(result.results || result);
    } catch (error) {
      console.error(`Error fetching ${category} movies:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleMoviePress = (movie: Movie) => {
    router.push(`/movie/${movie.id}`);
  };

  if (!config) {
    return (
      <Container>
        <AnimatedBackground />
        <CenterContainer>
          <BodyText>Category not found</BodyText>
        </CenterContainer>
      </Container>
    );
  }

  return (
    <Container>
      <AnimatedBackground />

      {/* Page Title Section */}
      <PaddedContainer padding="md" style={{ paddingTop: theme.spacing.xl }}>
        <Title
          size="2xl"
          weight="bold"
          style={{ marginBottom: theme.spacing.xs }}
        >
          {config.title}
        </Title>
        <Caption color={theme.colors.dark[400]} size="base">
          {config.subtitle}
        </Caption>
      </PaddedContainer>

      {/* Trending Time Filter */}
      {categoryKey === "trending" && (
        <PaddedContainer padding="md">
          <TabContainer>
            <TabButton
              active={timeWindow === "day"}
              onPress={() => setTimeWindow("day")}
            >
              <Caption
                weight="semibold"
                color={
                  timeWindow === "day"
                    ? theme.colors.dark[50]
                    : theme.colors.dark[400]
                }
              >
                Today
              </Caption>
            </TabButton>
            <TabButton
              active={timeWindow === "week"}
              onPress={() => setTimeWindow("week")}
            >
              <Caption
                weight="semibold"
                color={
                  timeWindow === "week"
                    ? theme.colors.dark[50]
                    : theme.colors.dark[400]
                }
              >
                This Week
              </Caption>
            </TabButton>
          </TabContainer>
        </PaddedContainer>
      )}

      {/* Movies Grid */}
      <FlatList
        data={movies}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 100, // Extra padding for tab bar
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              width: "50%",
              paddingRight: index % 2 === 0 ? 8 : 0,
              paddingLeft: index % 2 === 1 ? 8 : 0,
            }}
          >
            <MovieCard movie={item} onPress={handleMoviePress} size="medium" />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          loading ? (
            <CenterContainer style={{ paddingVertical: 100 }}>
              <BodyText>Loading movies...</BodyText>
            </CenterContainer>
          ) : (
            <CenterContainer style={{ paddingVertical: 100 }}>
              <Filter size={64} color={theme.colors.dark[600]} />
              <Caption
                size="lg"
                color={theme.colors.dark[500]}
                style={{ marginTop: theme.spacing.md, textAlign: "center" }}
              >
                No movies found
              </Caption>
            </CenterContainer>
          )
        }
      />
    </Container>
  );
}
