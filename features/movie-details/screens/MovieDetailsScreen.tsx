"use client";

import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";
import { Star, Clock, Calendar, Users } from "lucide-react-native";
import { Movie } from "@/types/movie";
import { movieService } from "@/services/movieService";

const { width } = Dimensions.get("window");

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await movieService.getMovieDetails(Number(id));
        const videos = await movieService.getMovieVideos(Number(id));
        const trailer = videos?.results?.find(
          (v: any) => v.type === "Trailer" && v.site === "YouTube"
        );
        setMovie(data);
        console.log("Movie data:", data);
        console.log("Trailer video:", trailer);

        setVideoKey(trailer?.key ?? null);
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
      <View className="flex-1 items-center justify-center bg-slate-900">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <Text className="text-white" style={{ color: "white" }}>
          Movie not found.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="bg-slate-900"
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={{ width: "100%", height: 400 }}
        resizeMode="cover"
      />

      <View className="px-4 mt-4">
        <Text
          className="text-white text-3xl font-bold"
          style={{ color: "white" }}
        >
          {movie.title}
        </Text>

        <View className="flex-row items-center mt-2 space-x-3">
          <Star size={18} color="#fbbf24" fill="#fbbf24" />
          <Text
            className="text-yellow-400 text-base"
            style={{ color: "white" }}
          >
            {movie.vote_average.toFixed(1)}
          </Text>

          <Users size={18} color="#94a3b8" />
          <Text className="text-slate-400 text-base" style={{ color: "white" }}>
            {movie.vote_count.toLocaleString()} votes
          </Text>
        </View>

        <View className="flex-row items-center mt-2 space-x-4">
          <Calendar size={16} color="#94a3b8" />
          <Text className="text-slate-400" style={{ color: "white" }}>
            {movie.release_date}
          </Text>

          <Clock size={16} color="#94a3b8" />
          {/* <Text className="text-slate-400">
            {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
          </Text> */}
        </View>

        {movie.genres && (
          <View className="flex-row flex-wrap mt-3">
            {movie.genres.map((genre) => (
              <Text
                key={genre.id}
                className="text-sm text-white border border-slate-700 px-3 py-1 rounded-full mr-2 mb-2"
                style={{ color: "white" }}
              >
                {genre.name}
              </Text>
            ))}
          </View>
        )}

        <Text
          className="text-slate-300 mt-4 leading-6"
          style={{ color: "white" }}
        >
          {movie.overview}
        </Text>
      </View>

      {videoKey && (
        <View className="mt-6 px-4">
          <Text
            className="text-white text-lg font-semibold mb-2 "
            style={{ color: "white" }}
          >
            Trailer
          </Text>
          <WebView
            style={{ width: width - 32, height: 220 }}
            javaScriptEnabled
            source={{ uri: `https://www.youtube.com/embed/${videoKey}` }}
          />
        </View>
      )}
    </ScrollView>
  );
}
