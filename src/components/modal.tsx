import React, { JSX } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ content } : { content: JSX.Element }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-0 top-0 right-0 left-0 w-screen h-screen
      flex justify-center align-middle bg-black bg-opacity-40"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.6, transition: { duration: 1.6 } }}
      >
        { content }
      </motion.div>
    </AnimatePresence>
  );
}
