import Image from 'next/image';
import Markdown from 'react-markdown';
import React, { JSX } from 'react';
import fs from 'fs';

import SocialMediaLink from '@/components/socialMediaLink';
import Projects from './projectsPage';

import { FULL_NAME, USERNAME, EMAIL } from './config';

function Profile() : JSX.Element {
  return (
    <div className="flex flex-col pt-0 lg:w-75 h-inherit items-stretch dark:text-gray-25">
      <div className="pt-1 lg:pt-4 self-center justify-center items-center">
        <Image src="/photo.jpg" alt="me" width="200" height="200" className="rounded-full" />
      </div>
      <span className="self-center items-center justify-center">
        <h1 className="text-xl">{FULL_NAME}</h1>
      </span>
      <div className="flex self-center flex-row lg:flex-col items-center justify-center">
        <SocialMediaLink
          image="email.svg"
          link={`mailto:${EMAIL}`}
          name="Email"
        />
        <SocialMediaLink
          image="code-icon.svg"
          link={`https://github.com/${USERNAME}`}
          name="Github"
        />
        <SocialMediaLink
          image="social-media.svg"
          link={`https://linkedin.com/${USERNAME}`}
          name="LinkedIn"
        />
      </div>
    </div>
  );
}

function AboutText() : JSX.Element {
  const about: string = fs.readFileSync(`${process.cwd()}/src/app/about.md`).toString();
  return (
    <Markdown>
      {about}
    </Markdown>
  );
}

function About() : JSX.Element {
  return (
    <div
      id="about"
      className="flex-1 flex-col w-full lg:w-about
      items-stretch align-top h-exclude-navigation"
    >
      <div className="mb-6 pt-1 lg:pt-4 p-4 overflow-y-scroll dark:text-gray-25">
        <AboutText />
      </div>
    </div>
  );
}

function AboutAndProjects() : JSX.Element {
  return (
    <div className="overflow-auto h-exclude-navigation w-full lg:w-about">
      <About />
      <Projects />
    </div>
  );
}

export default function AboutPage() : JSX.Element {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-125">
      <Profile />
      <AboutAndProjects />
    </div>
  );
}
