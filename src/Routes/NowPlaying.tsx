import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Loading";
import Cards from "../Components/Cards";
import ModalComponent from "../Components/ModalComponent";
import { useMatch } from "react-router-dom";
import { getNowPlayingMovies } from "../api";

function NowPlaying() {
  const { data: json, isLoading } = useQuery({
    queryKey: ["now-playing-movies"],
    queryFn: getNowPlayingMovies,
  });
  const nowPlayingMovieMatch = useMatch("/now-playing/movies/:movieId");

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Cards movies={json?.data.results} />
          <ModalComponent
            movies={json?.data.results}
            match={nowPlayingMovieMatch}
          />
        </>
      )}
    </>
  );
}

export default NowPlaying;
