import { useAnimation, motion } from "framer-motion";
import React, { useContext, useRef, useEffect } from "react";
import { GameContext } from "../context/GameContext";

const TIMEOUT = 1000;

const Countdown = () => {
  const { countdown, setCountdown, isGameOn } = useContext(GameContext);
  const intervalRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    if (isGameOn) {
      intervalRef.current = setInterval(() => {
        setCountdown((prevState) => {
          if (prevState > 1) {
            controls.start({
              scale: [1, 1.2, 1]
            });
            return prevState - 1;
          } else {
            return "X";
          }
        });
      }, TIMEOUT);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [setCountdown, intervalRef, isGameOn]);

  return (
    <motion.div
      initial={false}
      animate={controls}
      transition={{
        duration: 1,
        type: "tween",
        stiffness: 20
      }}
      className="w-14 h-14 text-primaryLight bg-primaryDark font-bold text-4xl flex justify-center items-center rounded-lg border-white border-2 shadow-amber-900/40 shadow-xl z-30"
    >
      {countdown}
    </motion.div>
  );
};

export default Countdown;
