import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import './App.css';

const queryClient = new QueryClient()


export default function App() {
  return (
    <div className="App" id='app'>
        <Menu />
        <div id='about-page'>
          <Profile />
          <About />
        </div>
        <Footer />
    </div>
  );
}

function Menu() {
  return (
    <div id="menu">
      <a href='/' id='about' className='menu-element'>ABOUT ME</a>
      <a href='/projects' id='projects' className='menu-element'>PROJECTS</a>
      <a href='/links' id='links' className='menu-element'>LINKS & CONTACTS</a>
    </div>
  )
}

function Profile() {
  return (
    <div id='profile'>
      <img src='photo.jpg' alt='me' width={200} height={200} />
      <span id='name'>
        <p>Andrii Yashchishen</p>
        {/*<img src='pronounce.svg' alt='pronounce button' width={20} />*/}
      </span>
    </div>
  );
}

function About() {
  return (
    <div id='about-section'>
      {/*<div id='about-selection'>
        <a href='#summary' id='summary-selection'>Summary</a>
        <a href='#experience' id='experience-selection'>Expirience</a>
      </div>*/}
      <div id='about-text'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis mattis aliquam faucibus purus in. Commodo nulla facilisi nullam vehicula ipsum a arcu. Felis eget nunc lobortis mattis aliquam faucibus purus in. Tempor commodo ullamcorper a lacus vestibulum sed arcu non. Massa tempor nec feugiat nisl pretium fusce id. Etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. Nunc aliquet bibendum enim facilisis gravida neque convallis. Molestie a iaculis at erat. Aliquet risus feugiat in ante metus dictum at tempor commodo. Justo donec enim diam vulputate ut pharetra sit amet. Sit amet purus gravida quis blandit turpis cursus. Quam pellentesque nec nam aliquam sem et tortor consequat. Amet est placerat in egestas erat. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Enim nec dui nunc mattis. Pellentesque massa placerat duis ultricies lacus sed. Turpis massa sed elementum tempus egestas sed sed risus.

Nec ullamcorper sit amet risus. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Amet nisl purus in mollis nunc sed id. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Egestas sed tempus urna et. Sodales ut etiam sit amet nisl. Faucibus et molestie ac feugiat sed lectus vestibulum. Posuere morbi leo urna molestie at elementum eu facilisis. Aliquam id diam maecenas ultricies mi eget mauris. Tristique risus nec feugiat in fermentum posuere urna nec tincidunt. Ac feugiat sed lectus vestibulum mattis ullamcorper. Purus sit amet volutpat consequat. Est ultricies integer quis auctor elit sed vulputate. Tellus mauris a diam maecenas sed enim ut sem viverra. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis. Turpis egestas pretium aenean pharetra magna ac placerat. Pulvinar pellentesque habitant morbi tristique senectus. Pellentesque diam volutpat commodo sed egestas egestas fringilla. Congue quisque egestas diam in arcu cursus euismod quis. Duis ut diam quam nulla porttitor.</p>
      </div>
    </div>
  );
}

export function WrapProjects() {
  return (
    <QueryClientProvider client={queryClient}>
      <Projects />
    </QueryClientProvider>
  )
}

function Projects() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch("https://api.github.com/users/YAndrii27/repos").then(
        (res) => res.json(),
      ),
  })
  if (!isPending && !error) {
    const repos = data.map(repo => 
      <li key={repo.id}>{repo.name}</li>
    )
    return <><ul>{repos}</ul></>
  }
}


function Footer() {
  return (
    <div id="footer">
      <p>
        Icons by <a href="https://heroicons.com/">Heroicons</a>
      </p>
    </div>
  );
}