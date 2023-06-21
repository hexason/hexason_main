import { HTMLMotionProps, motion } from "framer-motion";
import { ReactNode } from "react";

export default function DefaultAnimate({
  children,
  ...props
}: { children: ReactNode } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
