/* eslint-disable import/no-unresolved */
"use client";

import { useState, useEffect } from "react";
import { RefreshControl } from "react-native";
import { router } from "expo-router";
import type { Movie } from "@/types/movie";
import { movieService } from "@/services/movieService";
import MovieSection from "@/features/movies/components/MovieSection";
import CreativeHeader from "@/components/ui/CreativeHeader";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import {
  Container,
  ScrollContainerWithHeader,
  PaddedContainer,
} from "@/components/styled/Container";
import { TabContainer } from "@/components/styled/Layout";
import { Caption } from "@/components/styled/Typography";
import { TabButton } from "@/components/styled/Button";
import { getHeaderHeight } from "@/components/styled/Header";
import { theme } from "@/styles/theme";

export default function TrendingScreen() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [timeWindow, setTimeWindow] = useState<"day" | "week">("week");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const headerHeight = getHeaderHeight("trending");

  const fetchTrendingMovies = async () => {
    try {
      const trending = await movieService.getTrendingMovies(timeWindow);
      setTrendingMovies(trending.results || trending);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, [timeWindow]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTrendingMovies();
  };

  const handleMoviePress = (movie: Movie) => {
    router.push({
      pathname: "/movie/[id]",
      params: { id: movie.id.toString() },
    });
  };

  const handleSearchPress = () => {
    router.push("/search");
  };

  const handleNotificationPress = () => {
    console.log("Notifications pressed");
  };

  return (
    <Container>
      <AnimatedBackground />

      <CreativeHeader
        variant="trending"
        onSearchPress={handleSearchPress}
        onNotificationPress={handleNotificationPress}
      />

      <ScrollContainerWithHeader
        headerHeight={headerHeight}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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

        <MovieSection
          title={`🔥 Trending ${timeWindow === "day" ? "Today" : "This Week"}`}
          movies={trendingMovies}
          onMoviePress={handleMoviePress}
          size="large"
        />
      </ScrollContainerWithHeader>
    </Container>
  );
}
