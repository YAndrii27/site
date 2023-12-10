import Image from 'next/image';
import Markdown from 'react-markdown';
import React, { JSX } from 'react';
import fs from 'fs';

import SocialLink from '@/components/socialLink';
import { FULL_NAME, USERNAME, EMAIL } from './config';

function Profile() : JSX.Element {
  return (
    <div className="flex flex-col pt-0 lg:w-75 h-inherit bg-gray-50 items-stretch dark:bg-gray-125 dark:text-gray-25">
      <div className="pt-1 lg:pt-4 self-center">
        <Image src="/photo.jpg" alt="me" width="200" height="200" className="rounded-full" />
      </div>
      <span className="self-center items-center">
        <p className="mr-2.5">{FULL_NAME}</p>
      </span>
      <div className="self-center">
        <SocialLink url={`https://github.com/${USERNAME}`} text="Github" />
        <SocialLink url={`https://linkedin.com/in/${USERNAME}`} text="LinkedIn" />
        <SocialLink url={`mailto:${EMAIL}`} text="Email" />
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
    <div className="flex-1 flex-col w-full lg:w-[calc(100%-400px)]
    items-stretch align-top bg-gray-50 dark:bg-gray-125 h-[calc(100vh-40px)]"
    >
      <div className="mb-6 pt-1 lg:pt-4 p-4 overflow-y-scroll dark:text-gray-25">
        <AboutText />
      </div>
    </div>
  );
}

export default function AboutPage() : JSX.Element {
  return (
    <div className="flex flex-col lg:flex-row">
      <Profile />
      <About />
    </div>
  );
}
