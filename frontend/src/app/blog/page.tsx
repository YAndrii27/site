import React, { JSX } from 'react';
import Menu from '@/components/menu';
import Blog from './blog';

export default function Home() : JSX.Element {
  return (
    <>
      <Menu />
      <Blog />
    </>
  );
}
