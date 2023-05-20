import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function List(props) {
  const cn = bem('List');

  const getItemCount = (code) => {
    return props.cart
      ? props.cart.cartList.find((item) => item.code === code).count
      : 0;
  };

  return (
    <div className={cn()}>
      {props.list.map((item) => {
        return (
          <div key={item.code} className={cn('item')}>
            {cloneElement(props.children, {
              item: item,
              count: getItemCount(item.code),
            })}
          </div>
        );
      })}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  cart: PropTypes.object,
  children: PropTypes.node,
};

export default React.memo(List);
