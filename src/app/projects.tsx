'use client';

import React, { useState, JSX, MouseEventHandler } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LinesEllipsis from 'react-lines-ellipsis';

import useRequests from '@/lib/useRequests';
import clearTopics from '@/lib/removeNonUniqueTopic';

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
}) : JSX.Element {
  const readme = useRequests(
    name,
    `https://raw.githubusercontent.com/${USERNAME}/${name}/${branch}/README.md`,
    false,
    false,
  );
  return (
    <Modal name={name} description={readme || description} url={url} closeCB={closeCB} />
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
}) : JSX.Element {
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
        <ProjectDetails
          name={title}
          description={description}
          branch="master"
          url={url}
          closeCB={handleClick}
        />
      )}
    </>
  );
}

function ProjectLoading() : JSX.Element {
  // TODO: Make something better here
  return (
    <div className="flex flex-col w-full p-2 mb-2 border-2 border-solid border-black rounded-3xl animate-pulse">
      <h1 className="flex self-center opacity-0"> Placeholder </h1>
      <span className="flex w-full opacity-0"> Placeholder </span>
      <div className="border-t-2 border-dashed border-black w-full text-opacity-0"> </div>
    </div>
  );
}

function ProjectsList() : JSX.Element {
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

export default function Projects() : JSX.Element {
  /*
  * Main component which represents page
  */
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div>
        <div className="flex flex-col lg:flex-row">
          <ProjectsList />
        </div>
      </div>
    </QueryClientProvider>
  );
}
