'use client';
import React from 'react';
import {Work_Sans, Spline_Sans_Mono} from 'next/font/google';
import clsx from 'clsx';

import {LIGHT_TOKENS, DARK_TOKENS, THEME} from '@/constants';

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

const storedTheme = localStorage.getItem('JoR-theme');

function RootLayout({children}) {
  const [theme, setTheme] = React.useState(storedTheme === 'dark' ? THEME.Dark : THEME.Light);

  React.useEffect(() => {
    localStorage.setItem('JoR-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === THEME.Light ? THEME.Dark : THEME.Light);
  };

  return (
    <UserMotionPreferences>
      <html
        lang='en'
        className={clsx(mainFont.variable, monoFont.variable)}
        data-color-theme={theme}
        style={theme === 'light' ? LIGHT_TOKENS : DARK_TOKENS}
      >
      <body>
      <Header theme={theme} toggleTheme={toggleTheme}/>
      <main>{children}</main>
      <Footer/>
      </body>
      </html>
    </UserMotionPreferences>
  );
}

export default RootLayout;
