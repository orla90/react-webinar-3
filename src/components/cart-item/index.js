import React from 'react';
import PropTypes from 'prop-types';
import { getLocaleCurrency } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CartItem(props) {
  const cn = bem('Item');

  const callbacks = {
    onDeleteItemFromCart: () => {
      props.onDeleteItemFromCart(props.item.code);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{getLocaleCurrency(props.item.price)}</div>
      <div className={cn('count')}>{props.count} шт</div>
      <div className={cn('actions')}>
        <button
          onClick={callbacks.onDeleteItemFromCart}
          className={cn('button')}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onDeleteItemFromCart: PropTypes.func,
};

CartItem.defaultProps = {
  onDeleteItemFromCart: () => {},
};

export default React.memo(CartItem);
