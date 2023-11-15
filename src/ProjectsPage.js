import React, { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import Markdown from 'react-markdown'

import { Menu, Footer } from "./Misc";
import "./ProjectsPage.css";

const queryClient = new QueryClient();


export default function ProjectsPage() {
  return (
    <div id="projects" className="Projects">
      <Menu />
      <div id="projects-page">
        <ProjectsListWrapper />
      </div>
      <Footer />
    </div>
  );
}

function ProjectsListWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProjectsList />
    </QueryClientProvider>
  );
}

function ProjectsList() {
  const [projectDetails, setProjectDetails] = useState(undefined);
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(`https://api.github.com/users/${process.env.REACT_APP_GITHUB_USERNAME}/repos`).then(
        (res) => res.json(),
      ),
  });
  if (!isPending && !error) {
    const repos = data.map(repo =>
      !repo.fork && (
        <li key={repo.id} className="project">
          <a href="#about-project" onClick={() => {
            setProjectDetails(repo);
          }}>{repo.name}</a>
        </li>
      )
    );
    return (
      <>
      <div id="projects-list">
        <ul>{repos}</ul>
      </div>
      { projectDetails !== undefined && ( <ProjectDetails project={projectDetails} /> )}
      </>
    );
  }
}

function ProjectDetails({project}) {
  const { isPending, error, data } = useQuery({
  queryKey: [`readme_${project.name}`],
  queryFn: () =>
    fetch(`https://raw.githubusercontent.com/${process.env.REACT_APP_GITHUB_USERNAME}/${project.name}/${project.default_branch}/README.md`).then(
      (res) => res.text(),
    ),
  });
  const tags = project.topics.map(topic => <span className="tag">{topic}</span>);
  return (
    <div id="about-project">
      <div id="project-name"><h3>{project.name}</h3></div>
      <div id="tags">
        {tags}
      </div>
      <div id="description">
        <span id="short-description">{project.description}</span>
        <span id="long-description">
          <QueryClientProvider client={queryClient}>
            <Markdown>
              {data}
            </Markdown>
          </QueryClientProvider>
        </span>
      </div>
    </div>
  );
}