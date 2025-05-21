import { createPortal } from "react-dom";
import { motion } from "motion/react";

const zoomIn = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
    },
  },
};

export default function Modal({ children, open, onClose }) {
  return open
    ? createPortal(
        <motion.div
          className="fixed top-0 left-0 z-100 flex h-full w-full flex-row items-center justify-center bg-[rgba(0,0,0,0.5)]"
          onClick={onClose}
        >
          <motion.div
            variants={zoomIn}
            initial="hidden"
            animate="animate"
            className="w-[90%] md:max-w-96"
            onClick={(event) => event.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>,
        document.body,
      )
    : null;
}
