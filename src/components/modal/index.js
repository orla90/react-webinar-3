import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Modal({ children }) {
  return (
    <div className='Modal'>
      <div className='Modal-window'>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
};

export default React.memo(Modal);
