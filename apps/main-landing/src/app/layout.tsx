import { MAIN_LANDING_LINK } from '@idriss-xyz/constants';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

import { Footer, TopBar } from '@/components';

const aeonikPro = localFont({
  src: [
    {
      path: './fonts/AeonikPro-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    { path: './fonts/AeonikPro-Regular.woff2', weight: '400', style: 'normal' },
    {
      path: './fonts/AeonikPro-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/AeonikPro-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-aeonikpro',
});

// ts-unused-exports:disable-next-line
export const metadata: Metadata = {
  title: 'Superpowers for your internet',
  description:
    'Our apps bring the power of crypto and AI to your browsing experience, empower creators through digital ownership, and help find what’s true on the internet.',
  icons: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      sizes: '32x32',
      type: 'image/png',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      sizes: '16x16',
      type: 'image/png',
      url: '/favicon-16x16.png',
    },
  ],
  metadataBase: new URL(MAIN_LANDING_LINK),
  openGraph: {
    type: 'website',
    url: MAIN_LANDING_LINK,
    title: 'Superpowers for your internet',
    description:
      'Our apps bring the power of crypto and AI to your browsing experience, empower creators through digital ownership, and help find what’s true on the internet.',
    images: [
      {
        url: '/og.png',
      },
    ],
  },
};

// ts-unused-exports:disable-next-line
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${aeonikPro.variable} font-sans antialiased`}>
        <TopBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
