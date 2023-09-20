'use client';
import styles from './Header.module.css';
import React from 'react';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import {Rss, Sun, Moon} from 'react-feather';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';

import {DARK_TOKENS, LIGHT_TOKENS, THEME, THEME_COOKIE_NAME} from '@/constants';

function Header({initialTheme, className, ...delegated}) {
  const [theme, setTheme] = React.useState(initialTheme);

  const toggleTheme = () => {
    const newTheme = theme === THEME.Light ? THEME.Dark : THEME.Light;
    setTheme(newTheme);
    Cookies.set(THEME_COOKIE_NAME, newTheme, {expires: 365});

    const newTokens = newTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;
    const root = document.documentElement;

    root.setAttribute('data-color-theme', newTheme);
    Object.entries(newTokens).forEach(
      ([key, value]) => {
        root.style.setProperty(key, value);
      }
    );
  };

  const openRssFeed = () => {
    window.open('rss.xml');
  };

  return (
    <header
      className={clsx(styles.wrapper, className)}
      {...delegated}
    >
      <Logo/>

      <div className={styles.actions}>
        <button className={styles.action} onClick={openRssFeed}>
          <Rss
            size='1.5rem'
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>
            View RSS feed
          </VisuallyHidden>
        </button>
        <button className={styles.action} onClick={toggleTheme}>
          {theme === THEME.Light ? <Sun size='1.5rem'/> : <Moon size='1.5rem'/>}
          <VisuallyHidden>
            Toggle dark / light mode
          </VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
