import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Nav from './(components)/Nav';

import {config} from '@fortawesome/fontawesome-svg-core';
import "@fortawesome/fontawesome-svg-core/styles.css";
import AuthProvider from './(components)/AuthProvider';


config.autoAddCss = false;
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Ticket App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        <div className='flex flex-col h-screen max-h-screen'>
          <Nav />
          <div className='flex-grow overflow-y-auto bg-page text-default-text'>
            {children}
          </div>
        </div>
        </AuthProvider>
      </body>
    </html>
  )
}
