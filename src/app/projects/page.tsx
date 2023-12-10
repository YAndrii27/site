'use client';

import React from 'react';

import Menu from '@/components/menu';
import Footer from '@/components/footer';
import Projects from './projectsPage';

export default function ProjectsPage() {
  return (
    <>
      <Menu />
      <Projects />
      <Footer />
    </>
  );
}
