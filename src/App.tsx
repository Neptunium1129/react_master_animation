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
top:100px;
  width: 200px;
  height: 200px;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  font-size: 30px;
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

function App() {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-800, 800], [-360, 360]);
  const bgGradient = useTransform(
    x,
    [-800, 0, 800],
    [
      "linear-gradient(135deg, rgb(0,210,238), rgb(0,83,238))",
      "linear-gradient(135deg, rgb(238,0,153), rgb(221,0,238))",
      "linear-gradient(135deg, rgb(0,237,75), rgb(239,210,0))",
    ]
  );

  const { scrollX, scrollXProgress, scrollY, scrollYProgress } =
    useViewportScroll();
  console.log(scrollX);
  console.log(scrollXProgress);
  useEffect(() => {
    scrollY.onChange(() => {
      console.log(scrollY.get(), scrollYProgress.get());
    });
  }, [scrollYProgress]);

  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const svsVari = {
    start: { pathLength: 0, fill: "rgba(255,255,255,0)" },
    end: { fill: "rgba(255,255,255,1)", pathLength: 0.5 },
  };
  const [showing, setShowing] = useState(false);
  const toggleBtn = () => setShowing((prev) => !prev);

  const boxVari = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateZ: 360,
    },
    leaving: {
      opacity: 0,
      scale: 0,
      y: 50,
    },
  };

  const boxSide = {
    invisible :{
      x:500,
      opacity:0,
      scale:0
    },
    visible : {
      x:0,
      opacity:1,
      scale:1
    },
    exit : {
      x:-500,
      opacity:0,
      scale:0
    }
  }

  const [visi, setVisi] = useState(1);
  const nextPlz = () => setVisi(prev => (prev === 10 ? 10 : prev + 1) )
  return (
    <Wrapper
      style={{
        background: bgGradient,
      }}
    >
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <motion.path
          variants={svsVari}
          initial="start"
          animate="end"
          transition={{
            default: { duration: 5 },
            fill: { duration: 2, delay: 3 },
          }}
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
        />
      </Svg>
      <AnimatePresence>
        {showing ? (
          <Box
            variants={boxVari}
            initial="initial"
            animate="visible"
            exit="leaving"
            drag="x"
            dragSnapToOrigin
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          i===visi ? <Box variants={boxSide} initial="invisible" animate="visible" exit="exit" key={i}>{i}</Box> : null
        ))}
      </AnimatePresence>
      <button onClick={nextPlz}>NEXT </button>

      <button onClick={toggleBtn}>CLICK </button>
    </Wrapper>
  );
}

export default App;
