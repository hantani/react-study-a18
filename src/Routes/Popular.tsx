import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../api";
import Loading from "../Components/Loading";
import Cards from "../Components/Cards";
import { useMatch } from "react-router-dom";

function Popular() {
  const { data: json, isLoading } = useQuery({
    queryKey: ["popular-movies"],
    queryFn: getPopularMovies,
  });
  const popularMovieMatch = useMatch("/movies/:movieId");

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Cards movies={json?.data.results} match={popularMovieMatch} />
      )}
    </>
  );
}

export default Popular;
