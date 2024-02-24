import React, { MouseEventHandler } from 'react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

import ExternalLinkStyled from './externalLinkStyled';

export default function Modal({
  name,
  description,
  url,
  closeCB,
} : {
  name: string,
  description: string,
  url: string,
  closeCB: MouseEventHandler,
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8, transition: { duration: 1.6 } }}
      >
        <div className="fixed bottom-0 top-0 right-0 left-0 w-screen h-screen
          flex justify-center align-middle bg-black bg-opacity-60"
        >
          <div className="flex flex-col self-center h-96 max-h-96 w-125 overflow-y-auto overflow-x-auto
    dark:text-gray-25 z-40 bg-opacity-70 dark:bg-opacity-70 rounded-2xl border-2 border-solid border-black
      hide-scrollbar bg-gray-50 dark:bg-gray-125"
          >
            <div className="flex flex-row mt-2 h-10 w-full justify-center border-b-2 border-dashed border-black">
              <div className="flex flex-1" />
              <div className="flex pb-2">
                <h1 className="mb-2 text-2xl font-bold">{name}</h1>
              </div>
              <div className="flex flex-1 h-full mt-[-8px] justify-end items-start align-top">
                <div className="flex h-fit w-fit justify-end">
                  <button
                    type="button"
                    onClick={closeCB}
                    className="flex bg-gray-100 dark:bg-gray-175 h-7 w-7 z-50
                    rounded-full justify-center align-middle border-2 border-t-0 border-r-0 border-solid border-black"
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
            <div className="m-3">
              <div className="pt-4">
                <div>
                  <Markdown className="font-mono prose prose-pre:bg-gray-100 dark:prose-invert dark:prose-pre:bg-gray-175">
                    {description}
                  </Markdown>
                </div>
                <div className="mt-2 mb-14">
                  <ExternalLinkStyled url={url} text="Source code" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
