import Image from 'next/image';
import Markdown from 'react-markdown';
import React, { JSX } from 'react';
import fs from 'fs';

import ExternalLinkStyled from '@/components/externalLinkStyled';
import { FULL_NAME, USERNAME, EMAIL } from './config';

function Profile() : JSX.Element {
  return (
    <div className="flex flex-col pt-0 lg:w-75 h-inherit items-stretch dark:text-gray-25">
      <div className="pt-1 lg:pt-4 self-center">
        <Image src="/photo.jpg" alt="me" width="200" height="200" className="rounded-full" />
      </div>
      <span className="self-center items-center">
        <p className="mr-2.5">{FULL_NAME}</p>
      </span>
      <div className="self-center">
        <ExternalLinkStyled url={`https://github.com/${USERNAME}`} text="Github" />
        <ExternalLinkStyled url={`https://linkedin.com/in/${USERNAME}`} text="LinkedIn" />
        <ExternalLinkStyled url={`mailto:${EMAIL}`} text="Email" />
      </div>
    </div>
  );
}

function AboutText() {
  const about: string = fs.readFileSync(`${process.cwd()}/src/app/about.md`).toString();
  return (
    <Markdown>
      {about}
    </Markdown>
  );
}

function About() : JSX.Element {
  return (
    <div className="flex-1 flex-col w-full lg:w-about
    items-stretch align-top h-exclude-navigation"
    >
      <div className="mb-6 pt-1 lg:pt-4 p-4 overflow-y-scroll dark:text-gray-25">
        <AboutText />
      </div>
    </div>
  );
}

export default function AboutPage() : JSX.Element {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-125">
      <Profile />
      <About />
    </div>
  );
}
