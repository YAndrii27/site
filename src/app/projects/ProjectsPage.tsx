import React, { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Markdown from 'react-markdown'

const queryClient = new QueryClient();


function makeRequest(key: string, url: string) : any {
  const { isPending, error, data } = useQuery({
    queryKey: [key],
    queryFn: () =>
      fetch(url).then(
        (res) => res.json(),
      ),
  });
  if (!isPending && !error) {
    return data;
  }
}

export default function Projects() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div id="projects" className="Projects">
        <div id="projects-page" className="flex">
          <ProjectsList />
        </div>
      </div>
    </QueryClientProvider>
  );
}

function ProjectsList() {
  const [projectDetails, setProjectDetails] = useState(undefined);
  const data = makeRequest(
    'projectsList',
    `https://api.github.com/users/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}/repos`
  );
  const repos = data?.map(repo =>
    !repo.fork && (
    <li key={repo.id} className="list-none pb-1.5">
        <a href="#about-project" onClick={() => {
          setProjectDetails(repo);
        }}>{repo.name}</a>
    </li>
  ));
  return (
    <>
    <div id="projects-list" className="inline-flex bg-[#E0DDCF] items-stretch flex-col w-50 h-[calc(100vh-30px-30px)]">
      <ul className="pl-2.5">{repos}</ul>
    </div>
    { projectDetails !== undefined && ( <ProjectDetails project={projectDetails} /> )}
    </>
  );
}

function ProjectDetails({ project }) {
  const readme = makeRequest(
    project.name,
    `https://raw.githubusercontent.com/${process.env.REACT_APP_GITHUB_USERNAME}/${project.name}/${project.default_branch}/README.md`
  );
  const tags = project.topics.map(topic => <span className="self-center inline-flex mr-1.5 mt-1.5 p-1.5 pr-2 bg-[#a79da5] rounded-2xl content-center align-middle hover:bg-[#c0b4be] hover:cursor-default">{topic}</span>);
  return (
    <div id="about-project" className="inline-flex flex-col pl-4 bg-[#E0DDCF] flex-1 max-h-[calc(100vh-30px-30px)] overflow-y-auto">
      <div id="project-name"><h3>{project.name}</h3></div>
      <div id="tags">
        {tags}
      </div>
      <div id="description" className="pt-4">
        <span id="short-description" className="flex flex-1 flex-row">{project.description}</span>
        <span id="long-description">
            <Markdown>
              {readme}
            </Markdown>
        </span>
      </div>
    </div>
  );
}