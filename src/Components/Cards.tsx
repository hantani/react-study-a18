import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const CardLists = styled(motion.ul)`
  width: 720px;
  margin: 0 auto;
  margin-top: 80px;
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
`;
const Card = styled(motion.li)`
  width: 200px;
  cursor: pointer;
`;
const Img = styled(motion.img)`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
`;
const Heading = styled.p`
  text-align: center;
  line-height: 1.5;
  margin-top: 15px;
  pointer-events: none;
`;

const container = {
  hidden: { opacity: 1 },
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

function Cards({ movies }: { movies: IMovie[] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const onCardClick = (movieId: number) => {
    if (location.pathname === "/") {
      navigate(`/movies/${movieId}`);
    } else {
      navigate(`${location.pathname}/movies/${movieId}`);
    }
  };

  return (
    <>
      <CardLists variants={container} initial="hidden" animate="visible">
        {movies.map((movie: IMovie) => (
          <Card key={movie.id} onClick={() => onCardClick(movie.id)}>
            <Img
              whileHover={{ scale: 1.05, y: -15 }}
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            ></Img>
            <Heading>{movie.title}</Heading>
          </Card>
        ))}
      </CardLists>
    </>
  );
}

export default Cards;
