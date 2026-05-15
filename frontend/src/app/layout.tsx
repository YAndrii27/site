import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Andrii Yashchishen',
  description: 'Portfolio website created with Next.JS (React.JS) and Tailwind CSS',
  keywords: ['andrii yashchishen', 'yandrii27', 'andriiyashchishen', 'andrii', 'yashchishen', 'personal website', 'portfolio'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="h-screen bg-gray-25 dark:bg-gray-125 scroll-smooth">{children}</body>
    </html>
  );
}
