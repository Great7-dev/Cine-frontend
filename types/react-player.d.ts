import "react-player";

declare module "react-player" {
  interface YouTubeConfig {
    playerVars?: {
      autoplay?: 0 | 1;
      cc_lang_pref?: string;
      cc_load_policy?: 1;
      color?: "red" | "white";
      controls?: 0 | 1 | 2;
      disablekb?: 0 | 1;
      enablejsapi?: 0 | 1;
      end?: number;
      fs?: 0 | 1;
      hl?: string;
      iv_load_policy?: 1 | 3;
      list?: string;
      listType?: "playlist" | "search" | "user_uploads";
      loop?: 0 | 1;
      modestbranding?: 1;
      origin?: string;
      playlist?: string;
      playsinline?: 0 | 1;
      rel?: 0 | 1;
      showinfo?: 0 | 1;
      start?: number;
      // Custom properties you want to add
      [key: string]: any;
    };
  }
}
