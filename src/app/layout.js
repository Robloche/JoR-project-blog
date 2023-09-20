import React from 'react';
import {Work_Sans, Spline_Sans_Mono} from 'next/font/google';
import clsx from 'clsx';
import { cookies } from 'next/headers';

import {LIGHT_TOKENS, DARK_TOKENS, THEME, THEME_COOKIE_NAME} from '@/constants';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UserMotionPreferences from '@/components/UserMotionPreferences';

import './styles.css';

const mainFont = Work_Sans({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family',
});
const monoFont = Spline_Sans_Mono({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family-mono',
});

function RootLayout({children}) {
  const initialTheme = cookies().get(THEME_COOKIE_NAME)?.value === 'dark' ? THEME.Dark : THEME.Light;

  return (
    <UserMotionPreferences>
      <html
        lang='en'
        className={clsx(mainFont.variable, monoFont.variable)}
        data-color-theme={initialTheme}
        style={initialTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS}
      >
      <body>
      <Header initialTheme={initialTheme}/>
      <main>{children}</main>
      <Footer/>
      </body>
      </html>
    </UserMotionPreferences>
  );
}

export default RootLayout;
