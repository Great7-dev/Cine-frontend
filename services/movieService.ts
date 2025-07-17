import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const BASE_URL = "http://localhost:3001/api/movies";

class MovieService {
  private async fetchData(endpoint: string) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  async getPopularMovies() {
    return this.fetchData("/popular");
  }

  async getTrendingMovies(timeWindow: "day" | "week" = "week") {
    return this.fetchData(`/trending/${timeWindow}`);
  }

  async getTopRatedMovies() {
    return this.fetchData("/top-rated");
  }

  async getUpcomingMovies() {
    return this.fetchData("/upcoming");
  }

  async searchMovies(query: string) {
    return this.fetchData(`/search?query=${encodeURIComponent(query)}`);
  }

  async getMovieDetails(movieId: number) {
    return this.fetchData(`/${movieId}`);
  }

  async getMovieVideos(movieId: number) {
    return this.fetchData(`/${movieId}/videos`);
  }

  async getMovieCredits(movieId: number) {
    return this.fetchData(`/${movieId}/credits`);
  }

  async getGenres() {
    return this.fetchData("/genres");
  }

  async getMoviesByGenre(genreId: number) {
    return this.fetchData(`/genre/${genreId}`);
  }
}

export const movieService = new MovieService();
