import React, { JSX } from 'react';
import Image from 'next/image';

export default function SocialLink({ url, text }: {url: string, text: string}) : JSX.Element {
  return (
    <span className="flex lg:pt-2 h-fit text-black dark:text-gray-25">
      <a href={url} target="_blank" className="align-bottom pr-1" rel="noreferrer">{text}</a>
      <Image src="/link.svg" alt="open the link" width="18" height="18" className="inline-flex" />
    </span>
  );
}
