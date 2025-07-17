"use client";

import { useEffect, useState } from "react";
import { Image, ActivityIndicator, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";
import { Star, Clock, Calendar, Users } from "lucide-react-native";
import type { Movie } from "@/types/movie";
import { movieService } from "@/services/movieService";
import {
  Container,
  ScrollContainer,
  CenterContainer,
  PaddedContainer,
  HorizontalContainer,
} from "@/components/styled/Container";
import { GlassCard } from "@/components/styled/Card";
import {
  Title,
  Subtitle,
  BodyText,
  Caption,
} from "@/components/styled/Typography";
import { theme } from "@/styles/theme";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import ReactPlayer from "react-player";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
const { width } = Dimensions.get("window");

export default function MovieDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await movieService.getMovieDetails(Number(id));
        const videos = await movieService.getMovieVideos(Number(id));
        // const trailer = videos[0] ?? null; // get first video, or null if empty
        setMovie(data);
        setVideoKey(videos[0]?.key || null); // get first video key or null if no videos
        console.log("Movie details:", data);
        console.log("videos", videos);

        navigation.setOptions({ title: data.title });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <AnimatedBackground />
        <CenterContainer>
          <ActivityIndicator size="large" color={theme.colors.primary[500]} />
        </CenterContainer>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container>
        <AnimatedBackground />
        <CenterContainer>
          <BodyText>Movie not found.</BodyText>
        </CenterContainer>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollContainer contentContainerStyle={{ paddingBottom: 30 }}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={{ width: "100%", height: 400 }}
          resizeMode="cover"
        />

        <PaddedContainer padding="md">
          <Title
            size="3xl"
            weight="bold"
            style={{ marginBottom: theme.spacing.sm }}
          >
            {movie.title}
          </Title>

          <HorizontalContainer style={{ marginBottom: theme.spacing.sm }}>
            <Star
              size={18}
              color={theme.colors.accent.yellow}
              fill={theme.colors.accent.yellow}
            />
            <Caption
              size="base"
              weight="semibold"
              color={theme.colors.accent.yellow}
              style={{ marginLeft: theme.spacing.sm }}
            >
              {movie.vote_average.toFixed(1)}
            </Caption>

            <Users
              size={18}
              color={theme.colors.dark[400]}
              style={{ marginLeft: theme.spacing.md }}
            />
            <Caption
              color={theme.colors.dark[400]}
              style={{ marginLeft: theme.spacing.sm }}
            >
              {movie.vote_count.toLocaleString()} votes
            </Caption>
          </HorizontalContainer>

          <HorizontalContainer style={{ marginBottom: theme.spacing.md }}>
            <Calendar size={16} color={theme.colors.dark[400]} />
            <Caption
              color={theme.colors.dark[400]}
              style={{ marginLeft: theme.spacing.sm }}
            >
              {movie.release_date}
            </Caption>

            <Clock
              size={16}
              color={theme.colors.dark[400]}
              style={{ marginLeft: theme.spacing.md }}
            />
          </HorizontalContainer>

          {movie.genres && (
            <HorizontalContainer
              style={{
                flexWrap: "wrap",
                marginBottom: theme.spacing.md,
              }}
            >
              {movie.genres.map((genre) => (
                <GlassCard
                  key={genre.id}
                  style={{
                    paddingHorizontal: theme.spacing.sm,
                    paddingVertical: theme.spacing.xs,
                    marginRight: theme.spacing.sm,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  <Caption weight="medium">{genre.name}</Caption>
                </GlassCard>
              ))}
            </HorizontalContainer>
          )}

          <BodyText style={{ lineHeight: 24 }}>{movie.overview}</BodyText>
        </PaddedContainer>
        {videoKey && (
          <PaddedContainer padding="md">
            <Subtitle
              size="lg"
              weight="semibold"
              style={{ marginBottom: theme.spacing.sm }}
            >
              Trailer
            </Subtitle>
            <div
              style={{
                position: "relative",
                paddingTop: "56.25%",
                borderRadius: theme.borderRadius.lg,
                overflow: "hidden",
              }}
            >
              {!iframeLoaded && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: theme.colors.dark[700],
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: theme.spacing.sm,
                    }}
                  >
                    <ActivityIndicator
                      size="large"
                      color={theme.colors.primary[500]}
                    />
                    <Caption color={theme.colors.dark[300]}>
                      Loading trailer...
                    </Caption>
                  </div>
                </div>
              )}
              <iframe
                src={`https://www.youtube.com/embed/${videoKey}?modestbranding=1&rel=0&showinfo=0`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: iframeLoaded ? 1 : 0,
                  border: "none",
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setIframeLoaded(true)}
                loading="lazy"
              />
            </div>
          </PaddedContainer>
        )}
      </ScrollContainer>
    </Container>
  );
}
