import React from 'react';
import './KeyboardShortcut.css';

const KeyboardShortcut = ({ keys }) => {
  return (
    <span className="keyboard-shortcut">
      {keys}
    </span>
  );
};

export default KeyboardShortcut;
