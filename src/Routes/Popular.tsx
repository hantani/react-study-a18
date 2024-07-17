import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../api";
import Loading from "../Components/Loading";
import Cards from "../Components/Cards";

function Popular() {
  const { data: json, isLoading } = useQuery({
    queryKey: ["popular-movies"],
    queryFn: getPopularMovies,
  });

  console.log(json);

  return <>{isLoading ? <Loading /> : <Cards movies={json?.data.results} />}</>;
}

export default Popular;
