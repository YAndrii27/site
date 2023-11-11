import React from "react";

import "./Misc.css";


export function Menu() {
    return (
      <div id="menu">
        <a href='/' id='about' className='menu-element'>ABOUT ME</a>
        <a href='/projects' id='projects' className='menu-element'>PROJECTS</a>
        <a href='/links' id='links' className='menu-element'>LINKS & CONTACTS</a>
      </div>
    );
  }

export function Footer() {
    return (
      <div id="footer">
        <p>
          Icons by <a href="https://heroicons.com/">Heroicons</a>
        </p>
      </div>
  );
}