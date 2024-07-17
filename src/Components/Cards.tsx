import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

interface IMovie {
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
const Img = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
`;
const Heading = styled.p`
  text-align: center;
  line-height: 1.5;
  margin-top: 15px;
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
  transform: translate(-50%, -50%);
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
  const [selectedMovie, setSelectedMovie] = useState<IMovie>();
  const [modal, setModal] = useState(false);
  const onCardClick = (movieId: number) => {
    setModal(true);
    movies.forEach((movie) => {
      if (movieId === movie.id) {
        setSelectedMovie(movie);
      }
    });
  };
  const onOverlayClick = () => {
    setModal(false);
  };
  console.log(movies[0]);

  return (
    <>
      <CardLists variants={container} initial="hidden" animate="visible">
        {movies.map((movie: IMovie) => (
          <Card
            key={movie.id}
            variants={item}
            onClick={() => onCardClick(movie.id)}
          >
            <Img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            ></Img>
            <Heading>{movie.title}</Heading>
          </Card>
        ))}
      </CardLists>
      <AnimatePresence>
        {modal && (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <Modal exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ModalImgWrapper>
                <ModalImg
                  src={`https://image.tmdb.org/t/p/original${selectedMovie?.backdrop_path}`}
                />
              </ModalImgWrapper>
              <TextWrapper>
                <ModalTitle>{selectedMovie?.title}</ModalTitle>
              </TextWrapper>
            </Modal>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Cards;
