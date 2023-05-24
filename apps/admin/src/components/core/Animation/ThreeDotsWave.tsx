import { Transition, motion } from "framer-motion";
import React from "react";

const LoadingDot = {
  display: "block",
  width: "2rem",
  height: "2rem",
  backgroundColor: "#C8C8C8",
  borderRadius: "50%"
};

const LoadingContainer = {
  width: "10rem",
  height: "5rem",
  display: "flex",
  justifyContent: "space-around"
};

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2
    }
  },
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const DotVariants = {
  initial: {
    y: "0%"
  },
  animate: {
    y: "100%"
  }
};

const DotTransition: Transition = {
  duration: 1,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut"
};

export const ThreeDotsWave = () => {
  return (
    <div
      style={{
        paddingTop: "5rem",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <motion.div
        style={LoadingContainer}
        variants={ContainerVariants}
        initial="initial"
        animate="animate"
        exit={{ opacity: 0 }}
      >
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
      </motion.div>
    </div>
  );
}
