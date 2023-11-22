import { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";

import { USERNAME } from "../config";

const queryClient = new QueryClient();


function useRequest(key: string, url: string, returnJSON: boolean = false) : any {
  const { isPending, error, data } = useQuery({
    queryKey: [key],
    queryFn: () =>
      fetch(url).then(
        (res) => {
          if (returnJSON) {
            return res.json();
          } else {
            return res.text();
          }
        }
      ),
  });
  if (!isPending && !error) {
    return data;
  }
}

export default function Projects() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <div className="flex">
          <ProjectsList />
        </div>
      </div>
    </QueryClientProvider>
  );
}

function ProjectsList() {
  const [projectDetails, setProjectDetails] = useState(undefined);
  const data = useRequest(
    'projectsList',
    `https://api.github.com/users/${USERNAME}/repos`,
    true
  );
  const repos = data?.map((repo: any) =>
    !repo.fork && (
    <li key={repo.id} className="list-none pb-1.5">
        <a href="#about-project" onClick={() => {
          setProjectDetails(repo);
        }}>{repo.name}</a>
    </li>
  ));
  return (
    <>
      <div className="pt-2 inline-flex bg-[#E0DDCF] items-stretch flex-col w-[160px] lg:w-[200px] h-[calc(100vh-30px-30px)]">
        <ul className="pl-2.5">{repos}</ul>
      </div>
      { projectDetails !== undefined && ( <ProjectDetails project={projectDetails} /> )}
    </>
  );
}

function ProjectDetails({ project }: {project: any} ) {
  const readme = useRequest(
    project.name,
    `https://raw.githubusercontent.com/${USERNAME}/${project.name}/${project.default_branch}/README.md`
  );
  const tags = project.topics.map((topic: any) => (<span key={topic} className="self-center inline-flex mr-1.5 mt-1.5 p-1.5 pr-2 bg-[#a79da5] rounded-2xl content-center align-middle hover:bg-[#c0b4be] hover:cursor-default">{topic}</span>));
  return (
    <div className="inline-flex flex-col pl-4 bg-[#E0DDCF] flex-1 h-[calc(100vh-30px-50px)] max-h-[calc(100vh-30px-50px)] overflow-y-auto">
      <div className="prose"><h1>{project.name}</h1></div>
      <div>
        {tags}
      </div>
      <div className="pt-4">
        {!readme && (<div className="flex flex-1 flex-row">{project.description}</div>)}
        <div>
          <Markdown className="prose overflow-x-visible">
            {(readme)}
          </Markdown>
        </div>
        <div className="mt-2">
          <a href={project.html_url} target="_blank">Source code</a>
        </div>
      </div>
    </div>
  );
}