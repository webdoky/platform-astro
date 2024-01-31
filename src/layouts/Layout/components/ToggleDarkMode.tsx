import React, { useCallback, useEffect, useState } from 'react';

import moonIcon from '../assets/moonIcon.svg';
import sunIcon from '../assets/sunIcon.svg';

import classes from './ToggleDarkMode.module.scss';

const LIGHTS_OUT = 'lights-out';

export default function ToggleDarkMode() {
  const [isDarkMode, setDarkMode] = useState(false);
  const enableDarkMode = useCallback(() => {
    setDarkMode(true);
    document.body.classList.add('dark-mode');
  }, []);
  const disableDarkMode = useCallback(() => {
    setDarkMode(false);
    document.body.classList.remove('dark-mode');
  }, []);
  const toggleDarkMode = useCallback(
    (prefersDark: boolean) => {
      if (prefersDark) {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    },
    [enableDarkMode, disableDarkMode],
  );
  useEffect(() => {
    // Listen to prefers-color-scheme media query
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)',
    );
    if (!window.sessionStorage.getItem(LIGHTS_OUT)) {
      if (darkModeMediaQuery.matches) {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    }
    darkModeMediaQuery.addEventListener('change', (event) =>
      toggleDarkMode(event.matches),
    );
  }, []);

  const handleClick = useCallback(() => {
    if (isDarkMode) {
      disableDarkMode();
      window.sessionStorage.setItem(LIGHTS_OUT, 'false');
    } else {
      enableDarkMode();
      window.sessionStorage.setItem(LIGHTS_OUT, 'true');
    }
  }, [disableDarkMode, enableDarkMode, isDarkMode]);

  return (
    <button
      aria-label={
        isDarkMode ? 'Перейти в світлий режим' : 'Перейти в темний режим'
      }
      className="ml-2 sm:ml-8"
      title={isDarkMode ? 'Перейти в світлий режим' : 'Перейти в темний режим'}
      onClick={handleClick}>
      {' '}
      {isDarkMode ? (
        <img
          alt="Сонце"
          className={classes.icon}
          height="27"
          src={sunIcon.src}
          width="27"
        />
      ) : (
        <img
          alt="Місяць"
          className={classes.icon}
          height="27"
          src={moonIcon.src}
          width="27"
        />
      )}
    </button>
  );
}
