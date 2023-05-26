import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function FlexContainer({ positon = 'space-between', children }) {
  const cn = bem('FlexContainer');

  return <div className={cn({ flex: positon })}>{children}</div>;
}

FlexContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default memo(FlexContainer);
