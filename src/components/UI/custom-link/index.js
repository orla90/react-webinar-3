import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

export const CustomLink = ({ children, to, className, ...rest }) => {
  const cn = bem('CustomLink');

  return (
    <Link className={className ? className : cn()} to={to} {...rest}>
      {children}
    </Link>
  );
};

CustomLink.propTypes = {
  children: PropTypes.node,
};

export default memo(CustomLink);
