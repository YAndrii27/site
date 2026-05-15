import React, { JSX } from 'react';
import Menu from '@/components/menu';
import AboutPage from './about';

export default function Home() : JSX.Element {
  return (
    <>
      <Menu />
      <AboutPage />
    </>
  );
}
