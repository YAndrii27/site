import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Andrii Yashchishen :: projects',
  description: 'Portfolio website created with Next.JS (React.JS) and Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="h-screen bg-gray-50 dark:bg-gray-125">{children}</body>
    </html>
  );
}
