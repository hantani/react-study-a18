import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { IMovie } from "./Cards";
import { PathMatch } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";

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

function ModalComponent({
  movies,
  match,
}: {
  movies: IMovie[];
  match: PathMatch<"movieId"> | null;
}) {
  const navigate = useNavigate();
  const onOverlayClick = () => {
    navigate(-1);
  };
  const movie = movies.find(
    (movie: { id: number }) => movie.id + "" === match?.params.movieId
  );

  return (
    <>
      {match ? (
        <>
          <Overlay
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onOverlayClick}
          />
          <Modal exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ModalImgWrapper>
              <ModalImg
                src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
              />
            </ModalImgWrapper>
            <TextWrapper>
              <ModalTitle>{movie?.title}</ModalTitle>
              <Overview>{movie?.overview}</Overview>
              <Text>Release Date: {movie?.release_date}</Text>
              <Text>Vote Average: {movie?.vote_average}</Text>
            </TextWrapper>
            <CloseBtn onClick={onOverlayClick}>
              <AiFillCloseCircle size={28} />
            </CloseBtn>
          </Modal>
        </>
      ) : null}
    </>
  );
}

export default ModalComponent;
