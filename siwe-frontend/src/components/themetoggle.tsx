import React from 'react';
import { useTheme } from '../components/theme';
import styles from './themetoggle.module.css';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};

export default ThemeToggle;
