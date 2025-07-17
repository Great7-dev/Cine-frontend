/* eslint-disable import/no-unresolved */
"use client";

import { useState, useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Search as SearchIcon, Filter } from "lucide-react-native";
import type { Genre, Movie } from "@/types/movie";
import { movieService } from "@/services/movieService";
import MovieCard from "@/features/movies/components/MovieCard";
import CreativeHeader from "@/components/ui/CreativeHeader";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import {
  Container,
  CenterContainer,
  PaddedContainer,
  HorizontalContainer,
  ContentContainer,
} from "@/components/styled/Container";
import { SearchContainer, SearchInput } from "@/components/styled/Input";
import { Caption } from "@/components/styled/Typography";
import { GenreButton } from "@/components/styled/Button";
import { getHeaderHeight } from "@/components/styled/Header";
import { theme } from "@/styles/theme";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const headerHeight = getHeaderHeight("search");

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      searchMovies();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const fetchGenres = async () => {
    try {
      const genresData = await movieService.getGenres();
      setGenres(genresData.genres || genresData);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const searchMovies = async () => {
    setLoading(true);
    try {
      const results = await movieService.searchMovies(searchQuery);
      setSearchResults(results.results || results);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenrePress = async (genreId: number) => {
    if (selectedGenre === genreId) {
      setSelectedGenre(null);
      setSearchResults([]);
    } else {
      setSelectedGenre(genreId);
      setLoading(true);
      try {
        const results = await movieService.getMoviesByGenre(genreId);
        setSearchResults(results.results || results);
      } catch (error) {
        console.error("Error fetching movies by genre:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleMoviePress = (movie: Movie) => {
    router.push({
      pathname: "/movie/[id]",
      params: { id: movie.id.toString() },
    });
  };

  const handleNotificationPress = () => {
    console.log("Notifications pressed");
  };

  return (
    <Container>
      <AnimatedBackground />

      <CreativeHeader
        variant="search"
        showSearch={false}
        onNotificationPress={handleNotificationPress}
      />

      <ContentContainer headerHeight={headerHeight}>
        <PaddedContainer padding="md">
          <SearchContainer>
            <SearchIcon size={20} color={theme.colors.dark[500]} />
            <SearchInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search for movies..."
              placeholderTextColor={theme.colors.dark[500]}
            />
          </SearchContainer>

          <HorizontalContainer style={{ marginBottom: theme.spacing.md }}>
            <Filter size={16} color={theme.colors.dark[400]} />
            <Caption
              weight="medium"
              color={theme.colors.dark[400]}
              style={{ marginLeft: theme.spacing.sm }}
            >
              Browse by Genre
            </Caption>
          </HorizontalContainer>

          <FlatList
            data={genres}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            style={{ marginBottom: theme.spacing.xl }}
            renderItem={({ item }) => (
              <GenreButton
                selected={selectedGenre === item.id}
                onPress={() => handleGenrePress(item.id)}
              >
                <Caption
                  weight="medium"
                  color={
                    selectedGenre === item.id
                      ? theme.colors.dark[50]
                      : theme.colors.dark[400]
                  }
                >
                  {item.name}
                </Caption>
              </GenreButton>
            )}
          />
        </PaddedContainer>

        <FlatList
          data={searchResults}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                width: "50%",
                paddingRight: index % 2 === 0 ? 8 : 0,
                paddingLeft: index % 2 === 1 ? 8 : 0,
              }}
            >
              <MovieCard
                movie={item}
                onPress={handleMoviePress}
                size="medium"
              />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <CenterContainer style={{ paddingVertical: 80 }}>
              <SearchIcon size={64} color={theme.colors.dark[600]} />
              <Caption
                size="lg"
                color={theme.colors.dark[500]}
                style={{ marginTop: theme.spacing.md, textAlign: "center" }}
              >
                {searchQuery.length > 0 || selectedGenre
                  ? "No movies found"
                  : "Search for movies or browse by genre"}
              </Caption>
            </CenterContainer>
          }
        />
      </ContentContainer>
    </Container>
  );
}
