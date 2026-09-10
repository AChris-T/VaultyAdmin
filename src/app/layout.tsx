import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Providers from './providers';
import '@/styles/globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const gellix = localFont({
  variable: '--font-gellix',
  display: 'swap',
  src: [
    {
      path: '../../public/fonts/Gellix-TRIAL-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gellix-TRIAL-ThinItalic.otf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Gellix-TRIAL-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gellix-TRIAL-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Gellix-TRIAL-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gellix-TRIAL-RegularItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Gellix-TRIAL-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gellix-TRIAL-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Gellix-TRIAL-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gellix-TRIAL-SemiBoldItalic.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Gellix-TRIAL-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gellix-TRIAL-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Gellix-TRIAL-ExtraBold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gellix-TRIAL-ExtraBoldItalic.otf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Gellix-TRIAL-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Gellix-TRIAL-BlackItalic.otf',
      weight: '900',
      style: 'italic',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Vaultly Admin',
  description: 'Vaultly admin console',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${gellix.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
