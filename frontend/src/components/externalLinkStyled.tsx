import React, { JSX } from 'react';
import Image from 'next/image';

export default function ExternalLinkStyled(
  {
    url,
    text,
  }: {
    url: string,
    text: string
  },
) : JSX.Element {
  return (
    <span className="flex flex-row h-inherit text-black dark:text-gray-25">
      <a href={url} target="_blank" className="flex align-bottom pr-1" rel="noreferrer">{text}</a>
      <Image src="/link.svg" alt="open the link" width="18" height="18" className="flex" />
    </span>
  );
}
