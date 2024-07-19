import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { PathMatch } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { useState } from "react";

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
`;
const Img = styled(motion.img)`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
  cursor: pointer;
`;
const Heading = styled.p`
  text-align: center;
  line-height: 1.5;
  margin-top: 15px;
  pointer-events: none;
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Modal = styled(motion.div)`
  width: 680px;
  min-height: 400px;
  background-color: #141414;
  border-radius: 15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
`;
const ModalImgWrapper = styled.div`
  height: 400px;

  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 400px;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(0deg, #181818, transparent 20%);
  }
`;
const ModalImg = styled.img`
  display: block;
  width: 100%;
  height: 399px;
  position: relative;
  border-radius: 15px 15px 0 0;
`;
const ModalTitle = styled.h2`
  font-size: 26px;
  line-height: 1.5;
`;
const TextWrapper = styled.div`
  padding: 20px;
`;
const Overview = styled.p`
  line-height: 1.5;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const Text = styled.p`
  margin-top: 10px;
`;
const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
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

function Cards({
  movies,
  match,
}: {
  movies: IMovie[];
  match: PathMatch<"movieId"> | null;
}) {
  const [selectedId, setSelectedId] = useState<string>();
  const navigate = useNavigate();
  const location = useLocation();
  const onCardClick = (movieId: number) => {
    if (location.pathname === "/") {
      navigate(`/movies/${movieId}`);
    } else {
      navigate(`${location.pathname}/movies/${movieId}`);
    }
    setSelectedId(movieId + "");
  };
  const onOverlayClick = () => {
    navigate(-1);
  };
  const selectedMovie = movies.find(
    (movie: { id: number }) => movie.id + "" === match?.params.movieId
  );

  return (
    <>
      <CardLists variants={container} initial="hidden" animate="visible">
        {movies.map((movie: IMovie) => (
          <Card
            key={movie.id}
            variants={item}
            onClick={() => onCardClick(movie.id)}
            layoutId={movie.id + ""}
          >
            <Img
              whileHover={{ scale: 1.05, y: -15 }}
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            ></Img>
            <Heading>{movie.title}</Heading>
          </Card>
        ))}
      </CardLists>
      <AnimatePresence>
        {match && selectedId ? (
          <>
            <Overlay onClick={onOverlayClick} />
            <Modal layoutId={selectedId}>
              <ModalImgWrapper>
                <ModalImg
                  src={`https://image.tmdb.org/t/p/original${selectedMovie?.backdrop_path}`}
                />
              </ModalImgWrapper>
              <TextWrapper>
                <ModalTitle>{selectedMovie?.title}</ModalTitle>
                <Overview>{selectedMovie?.overview}</Overview>
                <Text>Release Date: {selectedMovie?.release_date}</Text>
                <Text>Vote Average: {selectedMovie?.vote_average}</Text>
              </TextWrapper>
              <CloseBtn onClick={onOverlayClick}>
                <AiFillCloseCircle size={28} />
              </CloseBtn>
            </Modal>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Cards;
