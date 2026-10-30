import type { Film } from "@/content/films";
import { youtubeEmbedUrl } from "@/lib/youtube";

export function FilmPlayer({ film }: { film: Film }) {
  if (film.source.type === "youtube") {
    return (
      <div className="relative aspect-video w-full overflow-hidden bg-ink">
        <iframe
          src={youtubeEmbedUrl(film.source.videoId)}
          title={`${film.name} — wedding film by 7C Studio`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 size-full"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full bg-ink">
      <video
        src={film.source.src}
        poster={film.poster}
        controls
        autoPlay
        playsInline
        preload="auto"
        className="absolute inset-0 size-full object-contain"
      />
    </div>
  );
}
