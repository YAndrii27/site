import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Markdown from 'react-markdown';

import useRequests from '@/lib/useRequests';
import ExternalLinkStyled from '@/components/externalLinkStyled';
import { USERNAME } from '../config';

const queryClient = new QueryClient();

function ProjectTag({ topic }: {topic: string}) {
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

function ProjectDetails({ project }: {project: any}) {
  const readme = useRequests(
    project.name,
    `https://raw.githubusercontent.com/${USERNAME}/${project.name}/${project.default_branch}/README.md`,
    false,
    false,
  );
  const tags = project.topics.map(
    (topic: any) => (
      <ProjectTag topic={topic} />
    ),
  );
  return (
    <div className="flex flex-col pl-4 flex-1 h-exclude-navigation max-h-exclude-navigation
    overflow-y-auto dark:text-gray-25"
    >
      <div className="prose dark:prose-invert">
        <h1>{project.name}</h1>
      </div>
      <div>
        {tags}
      </div>
      <div className="pt-4">
        {!readme && (
        <div className="flex flex-1 flex-row dark:text-gray-25">
          {project.description}
        </div>
        )}
        <div>
          <Markdown className="prose dark:prose-invert">
            {readme}
          </Markdown>
        </div>
        <div className="mt-2 mb-14">
          <ExternalLinkStyled url={project.html_url} text="Source code" />
        </div>
      </div>
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
  const [projectDetails, setProjectDetails] = useState(undefined);
  let content;
  if (data) {
    // eslint-disable-next-line array-callback-return
    content = data.map((repo: any) => {
      if (!repo.fork && repo.name !== USERNAME) {
        return (
          <li key={repo.id} className="pb-1.5">
            <a
              href="#about-project"
              onClick={() => {
                setProjectDetails(repo);
              }}
            >
              {repo.name}
            </a>
          </li>
        );
      }
    });
  } else {
    content = <p>List is loading or something went wrong...</p>;
  }
  return (
    <>
      <div className="pt-2 flex flex-col w-40 lg:w-50
        h-fit lg:h-exclude-navigation dark:text-gray-25"
      >
        <details className="hover:cursor-default">
          <summary>List of projects</summary>
          <ul className="pl-2.5">
            {content}
          </ul>
        </details>
      </div>
      {projectDetails !== undefined && (<ProjectDetails project={projectDetails} />)}
    </>
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
