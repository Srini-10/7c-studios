export type Film = {
  id: string;
  name: string;
  category: string;
  description: string;
  location: string;
  duration: string;
  image: string;
  imageAlt: string;
  videoSrc: string;
  layout: string;
  isyoutube?: boolean;
  islocalvideo?: boolean;
  youtubeSrc?: string;
};

export type FilmPlayback =
  | { type: "local"; url: string }
  | { type: "youtube"; videoId: string; embedUrl: string };

function parseYouTubeId(source: string): string | null {
  try {
    const url = new URL(source);
    const hostname = url.hostname.replace(/^www\./, "");

    if (hostname === "youtu.be") {
      return url.pathname.slice(1).split("/")[0] || null;
    }

    if (hostname === "youtube.com" || hostname === "m.youtube.com" || hostname === "youtube-nocookie.com") {
      const pathParts = url.pathname.split("/").filter(Boolean);
      const videoId =
        url.searchParams.get("v") ??
        (pathParts[0] === "embed" || pathParts[0] === "shorts" || pathParts[0] === "live"
          ? pathParts[1]
          : null);

      return videoId || null;
    }

    return null;
  } catch {
    return null;
  }
}

export function getFilmPlayback(film: Film): FilmPlayback | null {
  if (film.isyoutube && film.youtubeSrc) {
    const videoId = parseYouTubeId(film.youtubeSrc);

    if (videoId) {
      return {
        type: "youtube",
        videoId,
        embedUrl: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`,
      };
    }
  }

  if (film.videoSrc) {
    return { type: "local", url: film.videoSrc };
  }

  return null;
}

export function getYouTubeWatchUrl(film: Film): string | null {
  const playback = getFilmPlayback(film);

  return playback?.type === "youtube"
    ? `https://www.youtube.com/watch?v=${playback.videoId}`
    : null;
}
