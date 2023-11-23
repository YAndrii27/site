'use client'
import Image from "next/image";
import { useEffect } from "react";

export function Menu() : JSX.Element {
  function handleClick() {
    if (localStorage.theme == "light") {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
  }

  function handleLoad() {
    if (localStorage.theme == "dark") {
      document.documentElement.classList.add("dark");
      return;
    }
    localStorage.theme = "light"
  }
  useEffect(handleLoad);
  return (
    <div className="flex items-center h-auto bg-[#a79da5] dark:bg-[#4d5356]">
      <a href='/' className="pl-1 pt-4 pr-2.5 pb-4 hover:bg-[#beb3bc] hover:transition all duration-500 dark:text-[#e8e6e3] dark:hover:bg-[#404548]">ABOUT ME</a>
      <a href='/projects' className="pl-1 pt-4 pr-2.5 pb-4 hover:bg-[#beb3bc] hover:transition all duration-500 dark:text-[#e8e6e3] dark:hover:bg-[#404548]">PROJECTS</a>
      <Image src="/theme.svg" width="30" height="30" alt="switch_theme" className="absolute right-2 hover:bg-[#beb3bc] hover:cursor-pointer hover:transition all duration-500 rounded-full dark:hover:bg-[#404548]" onClick={handleClick} />
    </div>
  );
}

export function Footer() : JSX.Element {
  return (
    <div className="absolute bottom-0 right-0 left-0 h-6 bg-[#a79da5] items-stretch overflow-hidden dark:bg-[#4d5356]">
      <p className="dark:text-[#e8e6e3]">
        Icons by <a href="https://heroicons.com/" className="text-gray-100 dark:text-[#e8e6e3]">Heroicons</a>
      </p>
    </div>
  );
}