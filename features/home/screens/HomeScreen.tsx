/* eslint-disable import/no-unresolved */
"use client";

import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { movieService } from "@/services/movieService";
import type { Movie } from "@/types/movie";
import HeroSection from "@/features/movies/components/HeroSection";
import MovieSection from "@/features/movies/components/MovieSection";
import CreativeHeader from "@/components/ui/CreativeHeader";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import {
  Container,
  ScrollContainerWithHeader,
  CenterContainer,
} from "@/components/styled/Container";
import { getHeaderHeight } from "@/components/styled/Header";

export default function HomeScreen() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const headerHeight = getHeaderHeight("home");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [popular, topRated, upcoming] = await Promise.all([
          movieService.getPopularMovies(),
          movieService.getTopRatedMovies(),
          movieService.getUpcomingMovies(),
        ]);

        setPopularMovies(popular.results || []);
        setTopRatedMovies(topRated.results || []);
        setUpcomingMovies(upcoming.results || []);
      } catch (err) {
        console.error("Error loading movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handlePlayTrailer = (movie: Movie) => {
    console.log(`Play trailer for: ${movie.title}`);
  };

  const handleMoviePress = (movie: Movie) => {
    router.push(`/movie/${movie.id}`);
  };

  const handleSearchPress = () => {
    router.push("/search");
  };

  const handleNotificationPress = () => {
    console.log("Notifications pressed");
  };

  const handleSeeMorePopular = () => {
    router.push("/movies/popular");
  };

  const handleSeeMoreTopRated = () => {
    router.push("/movies/top-rated");
  };

  const handleSeeMoreUpcoming = () => {
    router.push("/movies/upcoming");
  };

  if (loading) {
    return (
      <Container>
        <AnimatedBackground />
        <CreativeHeader
          variant="home"
          onSearchPress={handleSearchPress}
          onNotificationPress={handleNotificationPress}
        />
        <CenterContainer style={{ marginTop: headerHeight }}>
          <ActivityIndicator size="large" color="#f97316" />
        </CenterContainer>
      </Container>
    );
  }

  return (
    <Container>
      <AnimatedBackground />

      <CreativeHeader
        variant="home"
        onSearchPress={handleSearchPress}
        onNotificationPress={handleNotificationPress}
      />

      <ScrollContainerWithHeader
        headerHeight={headerHeight}
        showsVerticalScrollIndicator={false}
      >
        {popularMovies.length > 0 && (
          <HeroSection
            movie={popularMovies[0]}
            onPlayTrailer={handlePlayTrailer}
            onMoviePress={handleMoviePress}
          />
        )}

        <MovieSection
          title="🔥 Popular Now"
          movies={popularMovies.slice(1, 11)}
          onMoviePress={handleMoviePress}
          onSeeMorePress={handleSeeMorePopular}
          size="medium"
        />

        <MovieSection
          title="⭐ Top Rated"
          movies={topRatedMovies.slice(0, 10)}
          onMoviePress={handleMoviePress}
          onSeeMorePress={handleSeeMoreTopRated}
          size="medium"
        />

        <MovieSection
          title="🎬 Coming Soon"
          movies={upcomingMovies.slice(0, 10)}
          onMoviePress={handleMoviePress}
          onSeeMorePress={handleSeeMoreUpcoming}
          size="medium"
        />
      </ScrollContainerWithHeader>
    </Container>
  );
}
