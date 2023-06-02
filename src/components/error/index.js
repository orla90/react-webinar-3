import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Error({ children }) {
  const cn = bem('Error');

  return <p className={cn()}>{children}</p>;
}

Error.propTypes = {
  children: PropTypes.node,
};

export default memo(Error);
