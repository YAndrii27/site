import React, { JSX } from 'react';
import SocialLink from './externalLinkStyled';

export default function Footer() : JSX.Element {
  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div className="flex flex-row self-stretch items-baseline w-screen h-10 bg-gray-100
      overflow-hidden dark:bg-gray-175"
      >
        <p className="dark:text-gray-25 mr-1">
          Icons by
        </p>
        <SocialLink url="https://heroicons.com/" text="Heroicons" />
      </div>
    </div>
  );
}
