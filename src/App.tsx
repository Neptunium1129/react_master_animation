import styled from "styled-components";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useEffect, useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
  width: 300px;
  height: 300px;
  display: flex;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Svg = styled.svg`
  width: 100px;
  height: 100px;
  path {
    stroke: white;
    stroke-width: 8;
  }
`;

const Circle  = styled(motion.div)`
  background-color: #00A5FF;
  height:100px ;
  width: 100px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const [clicked, setClicekd] = useState(false);
  const toggleClicked = () => setClicekd((prev) => !prev);

  return (
    <Wrapper onClick={toggleClicked}>
      <Box >
        {!clicked ? <Circle layoutId="a1" /> : null}
      </Box>
      <Box >
        {clicked ? <Circle layoutId="a1" /> : null}
      </Box>
    </Wrapper>
  )
}

export default App;
