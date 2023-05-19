import React from 'react';
import PropTypes from 'prop-types';
import { getLocaleCurrency } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },

    onAddItemToCart: () => {
      props.onAddItemToCart(props.item.code);
    },

    onDeleteItemFromCart: () => {
      props.onDeleteItemFromCart(props.item.code);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{getLocaleCurrency(props.item.price)}</div>
      {props.type === 'cart-list' && (
        <div className={cn('count')}>{props.count} шт</div>
      )}
      <div className={cn('actions')}>
        {props.type === 'app-list' && (
          <button onClick={callbacks.onAddItemToCart} className={cn('button')}>
            Добавить
          </button>
        )}
        {props.type === 'cart-list' && (
          <button
            onClick={callbacks.onDeleteItemFromCart}
            className={cn('button')}
          >
            Удалить
          </button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string,
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
  onAddItemToCart: PropTypes.func,
  onDeleteItemFromCart: PropTypes.func,
};

Item.defaultProps = {
  onDelete: () => {},
  onAddItemToCart: () => {},
  onDeleteItemFromCart: () => {},
};

export default React.memo(Item);
