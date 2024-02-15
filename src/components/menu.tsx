'use client';

import React, { JSX, useEffect } from 'react';
import { useDarkMode } from 'usehooks-ts';
import Image from 'next/image';
import { motion, spring } from 'framer-motion';

function MenuElement({ url, text }: {url: string, text: string}) {
  return (
    <span className="flex pl-1.5 pr-1.5 h-10 hover:bg-gray-75 hover:transition all duration-500
      dark:text-gray-25 dark:hover:bg-gray-150"
    >
      <a href={url} className="self-center">
        {text}
      </a>
    </span>
  );
}

function ThemeSwitcher() {
  const {
    isDarkMode,
    toggle,
  } = useDarkMode({ defaultValue: false });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  function handleClick() {
    toggle();
  }

  return (
    <div className="fixed right-0 flex self-center h-fit w-fit z-50">
      <motion.div
        layout
        transition={spring}
        className={`fixed right-0 flex self-center h-fit w-16 border-2 border-solid border-black rounded-full ${isDarkMode ? 'justify-start' : 'justify-end'}`}
      >
        <Image
          src={`${isDarkMode ? '/dark-theme.svg' : '/light-theme.svg'}`}
          width="30"
          height="30"
          alt="switch_theme"
          className="flex right-2 hover:bg-gray-75 hover:cursor-pointer
        hover:transition all duration-500 rounded-full dark:hover:bg-gray-150"
          onClick={handleClick}
        />
      </motion.div>
    </div>
  );
}

export default function Menu() : JSX.Element {
  return (
    <nav className="flex self-stretch items-center align-middle h-10 bg-gray-100 dark:bg-gray-175">
      <MenuElement url="/#about" text="ABOUT ME" />
      <MenuElement url="/#projects" text="PROJECTS" />
      <ThemeSwitcher />
    </nav>
  );
}
