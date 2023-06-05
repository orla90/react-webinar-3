import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function BottomBordered({ children, bottom }) {
  const cn = bem('BottomBordered');
  return (
    <div className={cn({ bottom })}>
      {React.Children.map(children, (child) => (
        <div key={child.key} className={cn('item')}>
          {child}
        </div>
      ))}
    </div>
  );
}

BottomBordered.propTypes = {
  children: PropTypes.node,
  bottom: PropTypes.oneOf(['grey']),
};

BottomBordered.defaultProps = {};

export default memo(BottomBordered);
