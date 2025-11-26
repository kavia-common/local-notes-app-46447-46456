import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Header component showing the app title and a theme toggle button.
 */
function Header({ theme = 'light', onToggleTheme }) {
  return (
    <header className="app-header">
      <h1 className="app-title">Local Notes</h1>
      <button
        type="button"
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </header>
  );
}

export default Header;
