import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function List(props) {
  const cn = bem('List');

  const getItemCount = (code) => {
    return props.cart ? props.cart.find((item) => item.code === code).count : 0;
  };

  return (
    <div className={cn()}>
      {props.list.map((item) => (
        <div key={item.code} className={cn('item')}>
          <Item
            item={item}
            count={getItemCount(item.code)}
            type={props.type}
            onDeleteItemFromCart={props.onDeleteItemFromCart}
            onAddItemToCart={props.onAddItemToCart}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  type: PropTypes.string,
  onDeleteItem: PropTypes.func,
  onAddItemToCart: PropTypes.func,
};

List.defaultProps = {
  onDeleteItem: () => {},
  onAddItemToCart: () => {},
};

export default React.memo(List);
