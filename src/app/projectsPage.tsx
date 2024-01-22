'use client';

import React, { useState, JSX, MouseEventHandler } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Markdown from 'react-markdown';
import LinesEllipsis from 'react-lines-ellipsis';

import useRequests from '@/lib/useRequests';
import clearTopics from '@/lib/removeNonUniqueTopic';

import ExternalLinkStyled from '@/components/externalLinkStyled';
import Modal from '@/components/modal';

import { USERNAME } from './config';

const queryClient = new QueryClient();

function ProjectTag({ topic }: {topic: string}) : JSX.Element {
  return (
    <span
      key={topic}
      className="self-center inline-flex mr-1.5 mt-1.5 p-1.5 pr-2
      bg-gray-100 rounded-2xl content-center align-middle hover:bg-gray-75
      hover:cursor-default dark:bg-gray-175 dark:text-gray-25 dark:hover:bg-gray-150"
    >
      {topic}
    </span>
  );
}

function ProjectDetails({
  name,
  branch,
  description,
  url,
  closeCB,
}: {
  name: string,
  branch: string,
  description: string,
  url: string,
  closeCB: MouseEventHandler,
}) {
  const readme = useRequests(
    name,
    `https://raw.githubusercontent.com/${USERNAME}/${name}/${branch}/README.md`,
    false,
    false,
  );
  return (
    <div className="flex flex-col self-center h-96 max-h-96 w-[500px] overflow-y-auto overflow-x-auto
    dark:text-gray-25 z-50 bg-gray-50 dark:bg-gray-125 bg-opacity-90 dark:bg-opacity-80
    rounded-2xl border-2 border-solid border-black hide-scrollbar"
    >
      <div className="flex h-fit w-full justify-end">
        <button
          type="button"
          onClick={closeCB}
          className="flex bg-gray-100 dark:bg-gray-175 h-7 w-7
          rounded-full justify-center align-middle border-2 border-t-0 border-r-0 border-solid border-black"
        >
          X
        </button>
      </div>
      <div className="flex mt-2 prose dark:prose-invert w-full justify-center border-b-2 border-dashed border-black">
        <h1 className="mb-2">{name}</h1>
      </div>
      <div className="m-3">
        <div className="pt-4">
          {!readme && (
          <div className="flex flex-1 flex-row dark:text-gray-25">
            {description}
          </div>
          )}
          <div>
            <Markdown className="prose dark:prose-invert">
              {readme}
            </Markdown>
          </div>
          <div className="mt-2 mb-14">
            <ExternalLinkStyled url={url} text="Source code" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Project({
  title,
  description,
  topics,
  url,
} : {
  title: string,
  description: string,
  topics: string[],
  url: string,
}) {
  const [showDetails, setShowDetails] = useState(false);

  function handleClick() {
    setShowDetails(!showDetails);
  }

  const clearedTopics = clearTopics(topics);
  return (
    <>
      <div className="flex flex-col p-2 mb-2 border-2 border-solid border-black rounded-3xl">
        <h1 className="flex self-center text-xl font-bold">{title}</h1>
        <span className="flex font-mono">
          <LinesEllipsis
            text={description}
            maxLine="3"
            ellipsis="..."
            trimRight
            basedOn="words"
          />
        </span>
        <button type="button" onClick={handleClick}>
          Show more
        </button>
        <div className="border-t-2 border-dashed border-black overflow-x-auto">
          {
            clearedTopics.map(
              (topic: any) => (
                <ProjectTag topic={topic} />
              ),
            )
          }
        </div>
      </div>
      {showDetails && (
        <Modal content={<ProjectDetails name={title} branch="master" description={description} url={url} closeCB={handleClick} />} />
      )}
    </>
  );
}

function ProjectLoading() {
  return (
    <div className="flex flex-col p-2 mb-2 border-2 border-solid border-black rounded-3xl">
      <h1 className="flex self-center text-xl font-bold"> </h1>
      <span className="flex font-mono"> </span>
      <div className="border-t-2 border-dashed border-black"> </div>
    </div>
  );
}

function ProjectsList() {
  /*
  * Representation of the projects list
  */
  const data = useRequests(
    'projectsList',
    `https://api.github.com/users/${USERNAME}/repos`,
    true,
    true,
  );
  let content;
  if (data) {
    content = data
      .filter((repo: any) => !repo.fork && repo.name !== USERNAME)
      .map((repo: any) => (
        <Project
          title={repo.name}
          description={repo.description}
          topics={repo.topics}
          url={repo.html_url}
        />
      ));
  } else {
    content = (
      <ProjectLoading />
    );
  }
  return (
    <div
      id="projects"
      className="pt-2 flex flex-col w-full lg:w-about
        h-fit lg:h-exclude-navigation dark:text-gray-25"
    >
      <div className="m-4">
        {content}
      </div>
    </div>
  );
}

export default function Projects() {
  /*
  * Main component which represents page
  */
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div>
        <div className="flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-125">
          <ProjectsList />
        </div>
      </div>
    </QueryClientProvider>
  );
}
