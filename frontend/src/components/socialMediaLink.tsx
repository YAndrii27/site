'use client';

import React from 'react';
import Image from 'next/image';

export default function SocialMediaLink(
  {
    name,
    image,
    link,
  }: {
    name: string,
    image: string | undefined,
    link: string,
  },
) {
  function handleClick() {
    window.open(link, '_blank');
  }

  let img;
  if (image) {
    img = <Image src={`/${image}`} alt={`${name} logo`} width={20} height={20} className="self-center lg:mr-2" />;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex m-2 w-7 h-7 lg:w-40 lg:h-fit self-center items-center justify-center
      rounded-3xl bg-gray-75 dark:bg-gray-175 hover:bg-gray-100 dark:hover:bg-gray-150 lg:p-2"
    >
      {img}
      <p className="hidden lg:flex">{name}</p>
    </button>
  );
}
