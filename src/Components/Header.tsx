import styled from "styled-components";
import { Link, useMatch } from "react-router-dom";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  padding-top: 50px;
  margin: 0 auto;
  width: 800px;
  display: flex;
  justify-content: space-between;

  a {
    text-decoration: none;
    position: relative;
  }
`;

const Circle = styled(motion.div)`
  background-color: #b9090b;
  width: 8px;
  height: 8px;
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translate(-50%);
  border-radius: 50%;
`;

function Header() {
  const popularMatch = useMatch("/");
  const comingMatch = useMatch("/coming-soon");
  const playingMatch = useMatch("/now-playing");

  return (
    <Wrapper>
      <Link to="/">POPULAR {popularMatch && <Circle layoutId="circle" />}</Link>
      <Link to="/coming-soon">
        COMING SOON {comingMatch && <Circle layoutId="circle" />}
      </Link>
      <Link to="/now-playing">
        NOW PLAYING {playingMatch && <Circle layoutId="circle" />}
      </Link>
    </Wrapper>
  );
}

export default Header;
