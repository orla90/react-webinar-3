import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Title({ title }) {
  const cn = bem('Title');
  return <h2 className={cn()}>{title}</h2>;
}

Title.propTypes = {
  title: PropTypes.node,
};

export default memo(Title);
