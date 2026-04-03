import * as PlyrModule from "plyr-react";
const Plyr = (PlyrModule as any).Plyr || (PlyrModule as any).default || PlyrModule;
import "plyr-react/plyr.css";

interface VideoPlayerProps {
  source: string;
}

export function VideoPlayer({ source }: VideoPlayerProps) {
  const isEmbed = source.includes("iframe") || source.includes("embed") || source.includes("playeriframe.sbs");

  if (isEmbed) {
    return (
      <div className="w-full h-full bg-black rounded-md overflow-hidden border border-white/5 shadow-2xl">
        <iframe
          src={source}
          className="w-full h-full border-0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    );
  }

  // Common Plyr options
  const plyrOptions: any = {
    settings: ["quality", "speed"],
    controls: [
      "play-large",
      "play",
      "progress",
      "current-time",
      "mute",
      "volume",
      "captions",
      "settings",
      "pip",
      "airplay",
      "fullscreen",
    ],
    quality: {
      default: 720,
      options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
    },
  };

  return (
    <div className="overflow-hidden rounded-md bg-black shadow-lg h-full">
      <Plyr
        source={{
          type: "video",
          sources: [
            {
              src: source,
              provider: source.includes("youtube.com") ? "youtube" : "html5",
            },
          ],
        }}
        options={plyrOptions}
      />
    </div>
  );
}
