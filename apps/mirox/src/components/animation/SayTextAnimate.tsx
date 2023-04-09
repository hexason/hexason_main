import { Wrap } from "@chakra-ui/react"
import { motion } from "framer-motion"

export default function SayTextAnimate({ text }: { text: string }) {
  return (
    <Wrap
      as={motion.div}
      variants={{
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
          opacity: 1,
          transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
        }),
      }}
      initial="hidden"
      animate="visible"
    >
      {text.split(" ").map((character, index) => <motion.span
        key={character + index}
        variants={{
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              damping: 12,
              stiffness: 100,
            },
          },
          hidden: {
            opacity: 0,
            x: 20,
            transition: {
              type: "spring",
              damping: 12,
              stiffness: 100,
            },
          },
        }}
      >
        {character}
      </motion.span>)
      }
    </Wrap>
  )
}