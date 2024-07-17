import axios from "axios";

const API_KEY = "10923b261ba94d897ac6b81148314a3f";
const BASE_PATH = "https://api.themoviedb.org/3/movie/";

export const getPopularMovies = async () => {
  return await axios.get(`${BASE_PATH}popular?api_key=${API_KEY}`);
};
