import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Markdown from "react-markdown";

import { USERNAME } from "../config";
import useRequests from "@/lib/useRequests";
import SocialLink from "@/components/socialLink";

const queryClient = new QueryClient();


export default function Projects() {
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

function ProjectsList() {
  const [projectDetails, setProjectDetails] = useState(undefined);
  const data = useRequests(
    'projectsList',
    `https://api.github.com/users/${USERNAME}/repos`,
    true,
    true
  );
  const repos = data?.map((repo: any) =>
    !repo.fork && (
    <li key={repo.id} className="pb-1.5">
        <a href="#about-project" onClick={() => {
          setProjectDetails(repo);
        }}>{repo.name}</a>
    </li>
  ));
  return (
    <>
      <div className="pt-2 flex items-stretch flex-col w-40 lg:w-50
      h-fit lg:h-[calc(100vh-80px)] dark:text-gray-25">
        <details className="hover:cursor-default">
          <summary>List of projects</summary>
          <ul className="pl-2.5">
            {repos}
          </ul>
        </details>
      </div>
      { projectDetails !== undefined && ( <ProjectDetails project={projectDetails} /> )}
    </>
  );
}

function ProjectDetails({ project }: {project: any} ) {
  const readme = useRequests(
    project.name,
    `https://raw.githubusercontent.com/${USERNAME}/${project.name}/${project.default_branch}/README.md`,
    undefined,
    false
  );
  const tags = project.topics.map(
    (topic: any) => (
      <span key={topic} className="self-center inline-flex mr-1.5 mt-1.5 p-1.5 pr-2
       bg-[#a79da5] rounded-2xl content-center align-middle hover:bg-[#c0b4be]
       hover:cursor-default dark:bg-[#4d5356] dark:text-gray-25 dark:hover:bg-[#686868]">
        {topic}
      </span>
    )
  );
  return (
    <div className="flex flex-col pl-4 flex-1 h-[calc(100vh-40px)] max-h-[calc(100vh-20px)]
    overflow-y-scroll dark:text-gray-25">
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
          <SocialLink url={project.html_url} text="Source code" />
        </div>
      </div>
    </div>
  );
}