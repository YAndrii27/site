'use client'
import Image from "next/image";
import { useEffect } from "react";

export default function Menu() : JSX.Element {
  function handleLoad() {
    if (localStorage.theme == "dark") {
      document.documentElement.classList.add("dark");
      return;
    }
    localStorage.theme = "light"
  }
  useEffect(handleLoad);
  return (
      <div className="flex self-stretch items-center h-10 bg-gray-100 dark:bg-gray-175">
        <MenuElement url="/" text="ABOUT ME" />
        <MenuElement url="/projects" text="PROJECTS" />
        <ThemeSwitcher />
      </div>
  );
}

function MenuElement({url, text}: {url: string, text: string}) {
  return (
    <>
      <span className="flex pl-1.5 pr-1.5 h-10 hover:bg-gray-75 hover:transition all duration-500
      dark:text-gray-25 dark:hover:bg-gray-150">
          <a href={url} className="self-center">
            {text}
          </a>
      </span>
    </>
  );
}

function ThemeSwitcher() {
  function handleClick() {
    if (localStorage.theme == "light") {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
  }

  return (
    <Image
    src="/theme.svg"
    width="30"
    height="30"
    alt="switch_theme"
    className="absolute right-2 hover:bg-gray-75 hover:cursor-pointer
    hover:transition all duration-500 rounded-full dark:hover:bg-gray-150"
    onClick={handleClick} />
  )
}