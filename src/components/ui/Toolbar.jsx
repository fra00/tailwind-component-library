import React from 'react';
import PropTypes from 'prop-types';
import ThemeSwitcher from './ThemeSwitcher';
import './Toolbar.css';

/**
 * Una toolbar fissa per l'applicazione, che può contenere un titolo
 * e opzionalmente il selettore del tema.
 */
const Toolbar = ({ title, showThemeSwitcher = true }) => {
  return (
    <header className="app-toolbar">
      <div className="app-toolbar-title">{title}</div>
      <div className="app-toolbar-actions">
        {showThemeSwitcher && <ThemeSwitcher />}
      </div>
    </header>
  );
};

Toolbar.propTypes = {
  /**
   * Il titolo da visualizzare nella toolbar.
   */
  title: PropTypes.string,
  /**
   * Se `true`, mostra il componente ThemeSwitcher.
   */
  showThemeSwitcher: PropTypes.bool,
};

export default Toolbar;