export function Menu() : JSX.Element {
  return (
    <div id="menu" className="flex items-center h-auto bg-[#a79da5]">
      <a href='/' id='about' className="pl-1 pt-4 pr-2.5 pb-4 hover:bg-[#beb3bc] hover:pt-3 hover:transition-all .4s">ABOUT ME</a>
      <a href='/projects' id='projects' className="pl-1 pt-4 pr-2.5 pb-4 hover:bg-[#beb3bc] hover:pt-3 hover:transition-all .4s">PROJECTS</a>
    </div>
  );
}

export function Footer() : JSX.Element {
  return (
    <div id="footer" className="absolute bottom-0 right-0 left-0 bg-[#a79da5] items-stretch overflow-hidden">
      <p>
        Icons by <a href="https://heroicons.com/" className=" text-gray-100">Heroicons</a>
      </p>
    </div>
  );
}