import React, { useState } from "react";
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
  const tags = project.topics.map(topic => <span className="tag">{topic}</span>);
  return (
    <div id="about-project">
      <div id="project-name"><h3>{project.name}</h3></div>
      <div id="tags">
        {tags}
      </div>
      <div id="description">
        {project.description}
        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis mattis aliquam faucibus purus in. Commodo nulla facilisi nullam vehicula ipsum a arcu. Felis eget nunc lobortis mattis aliquam faucibus purus in. Tempor commodo ullamcorper a lacus vestibulum sed arcu non. Massa tempor nec feugiat nisl pretium fusce id. Etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. Nunc aliquet bibendum enim facilisis gravida neque convallis. Molestie a iaculis at erat. Aliquet risus feugiat in ante metus dictum at tempor commodo. Justo donec enim diam vulputate ut pharetra sit amet. Sit amet purus gravida quis blandit turpis cursus. Quam pellentesque nec nam aliquam sem et tortor consequat. Amet est placerat in egestas erat. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Enim nec dui nunc mattis. Pellentesque massa placerat duis ultricies lacus sed. Turpis massa sed elementum tempus egestas sed sed risus.

Nec ullamcorper sit amet risus. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Amet nisl purus in mollis nunc sed id. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Egestas sed tempus urna et. Sodales ut etiam sit amet nisl. Faucibus et molestie ac feugiat sed lectus vestibulum. Posuere morbi leo urna molestie at elementum eu facilisis. Aliquam id diam maecenas ultricies mi eget mauris. Tristique risus nec feugiat in fermentum posuere urna nec tincidunt. Ac feugiat sed lectus vestibulum mattis ullamcorper. Purus sit amet volutpat consequat. Est ultricies integer quis auctor elit sed vulputate. Tellus mauris a diam maecenas sed enim ut sem viverra. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis. Turpis egestas pretium aenean pharetra magna ac placerat. Pulvinar pellentesque habitant morbi tristique senectus. Pellentesque diam volutpat commodo sed egestas egestas fringilla. Congue quisque egestas diam in arcu cursus euismod quis. Duis ut diam quam nulla porttitor.</p> */}
      </div>
    </div>
  );
}