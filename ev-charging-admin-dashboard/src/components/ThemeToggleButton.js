// src/ThemeToggleButton.js
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext'; // Import the theme context

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access the theme and toggle function

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

export default ThemeToggleButton;
