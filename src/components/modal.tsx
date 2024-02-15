import React, { JSX, MouseEventHandler } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({
  content,
  closeCB,
} : {
  content: JSX.Element,
  closeCB: MouseEventHandler,
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.6, transition: { duration: 1.6 } }}
      >
        <div className="fixed bottom-0 top-0 right-0 left-0 w-screen h-screen
          flex justify-center align-middle bg-black bg-opacity-60"
        >
          { content }
        </div>
        <div className="flex h-fit w-fit">
          <button
            type="button"
            onClick={closeCB}
            className="flex bg-gray-100 dark:bg-gray-175 h-7 w-7 z-50
              rounded-full justify-center align-middle border-2 border-t-0 border-r-0 border-solid border-black"
          >
            X
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
