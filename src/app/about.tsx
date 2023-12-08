import Image from "next/image";

import { FULL_NAME, USERNAME, EMAIL } from "./config";
import SocialLink from "@/components/socialLink";

export default function AboutPage() : JSX.Element {
  return (
    <div className="flex flex-col lg:flex-row">
      <Profile />
      <About />
    </div>
  );
}

function Profile() : JSX.Element {
  return (
    <div className="flex flex-col pt-0 lg:w-75 h-inherit bg-gray-50 items-stretch dark:bg-gray-100 dark:text-gray-25">
      <div className="pt-1 lg:pt-4 self-center">
        <Image src="/photo.jpg" alt="me" width="200" height="200" className=" rounded-full" />
      </div>
      <span className="self-center items-center">
        <p className="mr-2.5">{FULL_NAME}</p>
      </span>
      <div className="self-center">
        <SocialLink url={`https://github.com/${USERNAME}`} text="Github" />
        <SocialLink url={`https://linkedin.com/in/${USERNAME}`} text="LinkedIn" />
        <SocialLink url={`mailto:${EMAIL}`} text="Email" />
      </div>
    </div>
  );
}

function About() : JSX.Element {
  const about: JSX.Element = (
  <>
      <p>Driven full-stack developer with over 1 year of professional experience
      building web applications from back-end to front-end. Core competencies include:</p>
      <ul>
        <li>Front-End Development: Created intuitive, responsive UIs for web apps using React.js. Leveraged Hooks and Context API for efficient state management. Implemented CSS animations and transitions.</li>
        <li>Back-End Development: Developed and maintained scalable REST API servers in Node.js and Python Django/Flask/FastAPI. Modeled relational data and built PostgreSQL and MySQL/MariaDB databases optimized for performance. Containerized apps using Docker for easier deployment.</li>
        <li>Programming Languages: Over 1 year total experience with Python, JavaScript, and TypeScript. Recently learned Rust and building personal projects focused on its speed and memory safety.</li>
        <li>AI Integration: Passionate about ML and modern AI. Continuously experimenting by adding Natural Language Processing, voice interfaces, and predictive analytics to apps. Eager to take on roles centered on AI and human-computer interaction.</li>
      </ul>
      <p>Overall, I&apos;m an ambitious problem-solver seeking a full-stack or back-end focused role that allows me to continue expanding my technical skillset. Especially eager about opportunities involving AI/ML technologies as that aligns with my long-term passion within the industry. Please feel free to view my portfolio and GitHub for examples of my work.</p>
    </>
  );
  return (
    <div className="flex-1 flex-col w-full lg:w-[calc(100%-400px)]
    items-stretch align-top bg-gray-50 dark:bg-gray-100">
      <div className="mb-6 pt-1 lg:pt-4 p-4 overflow-y-scroll dark:text-gray-25 h-[calc(100vh-40px]">
        {about}
      </div>
    </div>
  );
}