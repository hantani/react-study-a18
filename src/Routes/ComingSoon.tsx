import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Loading";
import Cards from "../Components/Cards";
import { useMatch } from "react-router-dom";
import { getUpcomingMovies } from "../api";

function ComingSoon() {
  const { data: json, isLoading } = useQuery({
    queryKey: ["upcoming-movies"],
    queryFn: getUpcomingMovies,
  });
  const upComingMovieMatch = useMatch("/coming-soon/movies/:movieId");

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Cards movies={json?.data.results} match={upComingMovieMatch} />
      )}
    </>
  );
}

export default ComingSoon;
