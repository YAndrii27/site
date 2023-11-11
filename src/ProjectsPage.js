import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

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
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(`https://api.github.com/users/${process.env.REACT_APP_GITHUB_USERNAME}/repos`).then(
        (res) => res.json(),
      ),
  });
  if (!isPending && !error) {
    const repos = data.map(repo => 
      <li key={repo.id}>{repo.name}</li>
    );
    return <><ul>{repos}</ul></>;
  }
}