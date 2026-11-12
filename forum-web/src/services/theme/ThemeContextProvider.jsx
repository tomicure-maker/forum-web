import {useState, useEffect} from 'react';
import {ThemeContext} from './theme.context.jsx';
import {DARK_TH, LIGHT_TH} from './theme.constants.js';

const themeValue = localStorage.getItem('theme') || LIGHT_TH;

export const ThemeContextProvider = ({children}) => {
  const [theme, setTheme] = useState(themeValue);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme)
  }, [theme]);

  const toggleTheme = () => {
    if (theme === LIGHT_TH) {
      localStorage.setItem('theme', DARK_TH);
      setTheme(DARK_TH);
    } else {
      localStorage.setItem('theme', LIGHT_TH);
      setTheme(LIGHT_TH);
    }
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;