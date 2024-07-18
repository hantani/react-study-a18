import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../api";
import Loading from "../Components/Loading";
import Cards from "../Components/Cards";
import ModalComponent from "../Components/ModalComponent";
import { useMatch } from "react-router-dom";

function Popular() {
  const { data: json, isLoading } = useQuery({
    queryKey: ["popular-movies"],
    queryFn: getPopularMovies,
  });
  const popularMovieMatch = useMatch("/movies/:movieId");

  console.log(json?.data.results[0]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Cards movies={json?.data.results} />
          <ModalComponent
            movies={json?.data.results}
            match={popularMovieMatch}
          />
        </>
      )}
    </>
  );
}

export default Popular;
