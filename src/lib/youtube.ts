export function youtubeThumbnail(videoId: string, quality: "max" | "hq" | "sd" = "max") {
  const file =
    quality === "max"
      ? "maxresdefault"
      : quality === "hq"
        ? "hqdefault"
        : "sddefault";

  return `https://i.ytimg.com/vi/${videoId}/${file}.jpg`;
}

export function youtubeEmbedUrl(videoId: string, autoplay = true) {
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

export function youtubeWatchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}
