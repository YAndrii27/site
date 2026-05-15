import React, { JSX } from 'react';

import Menu from '@/components/menu';
import Admin from './admin';

export default function Home() : JSX.Element {
  return (
    <>
      <Menu />
      <Admin />
    </>
  );
}
