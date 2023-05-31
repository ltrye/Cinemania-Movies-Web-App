import VideoJS from "./components/videoPlayer";
import "./style/page.scss";
const ggSource =
  "https://onedrive.live.com/download?cid=6E97BF06485D6B01&resid=6E97BF06485D6B01%2155040&authkey=AKRDTrT5StZtSmo";

const videoJsOptions = {
  nativeTextTracks: false,
  nativeControlsForTouch: true,
  autoplay: false,
  fluid: true,
  controls: true,
  controlBar: {
    skipButtons: {
      forward: 5,
      backward: 10,
    },
  },
  tracks: [
    {
      src: "/chap4.vtt",
      kind: "subtitles",
      srclang: "en",
      label: "Vietnamese",
      mode: "showing",
    },
  ],
  sources: [
    {
      src: ggSource,
      type: "video/mp4",
    },
  ],
};
export default function Page({ params }) {
  return (
    <main>
      <VideoJS options={videoJsOptions} />
      <h1 className="play-title">{params.movieName} - Episode 9292</h1>
    </main>
  );
}
