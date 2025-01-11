import React from 'react';
import Keyboard from 'react-simple-keyboard';
//import 'react-simple-keyboard/build/css/index.css';

const TouchKeyboard = ({ onChange }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <Keyboard
        onChange={onChange}
        layoutName="default"
        display={{
          '{bksp}': '⌫',
          '{enter}': '⏎',
          '{shift}': '⇧',
          '{space}': '␣',
          '{tab}': '⇥'
        }}
      />
    </div>
  );
};

export default TouchKeyboard;
