import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function Form({ children, onSubmit }) {
  const cn = bem('Form');
  return (
    <form className={cn()} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

Form.defaultProps = {
  onSubmit: () => {},
};

export default memo(Form);
