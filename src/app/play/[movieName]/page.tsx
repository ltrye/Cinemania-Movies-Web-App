import VideoJS from "./components/videoPlayer";
import "./style/page.scss";

export default async function Page({ params }) {
  const movie = await getMovie(params.movieName);
  console.log(movie);

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
        src: "https://movieflix-ljqx.onrender.com/api/v1/video/647d6f5330afd6685841d955",
        // src: "https://onedrive.live.com/?cid=6E97BF06485D6B01&id=6E97BF06485D6B01%2155040&parId=root&o=OneUp",
        type: "video/mp4",
      },
    ],
  };

  return (
    <main>
      <VideoJS options={videoJsOptions} />
      <h1 className="play-title">{movie.data.name} - Episode 9292</h1>
    </main>
  );
}

async function getMovie(id) {
  const movieData = await fetch(
    `https://movieflix-ljqx.onrender.com/api/v1/film/${id}`,
    {
      method: "GET",
    }
  );
  return movieData.json();
}
