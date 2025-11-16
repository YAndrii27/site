import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Andrii Yashchishen :: portfolio',
  description: 'Portfolio website created with Next.JS (React.JS) and Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="h-screen bg-gray-50 dark:bg-gray-125 scroll-smooth">{children}</body>
    </html>
  );
}
