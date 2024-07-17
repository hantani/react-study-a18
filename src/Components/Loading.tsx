import styled from "styled-components";

const Wrapper = styled.div`
  width: 720px;
  height: calc(100vh - 66px);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

function Loading() {
  return <Wrapper>Loading...</Wrapper>;
}

export default Loading;
