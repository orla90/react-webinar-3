import React from 'react';
import PropTypes from 'prop-types';
import { getLocaleCurrency } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function AppItem(props) {
  const cn = bem('Item');

  const callbacks = {
    onAddItemToCart: () => {
      props.onAddItemToCart(props.item.code);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{getLocaleCurrency(props.item.price)}</div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onAddItemToCart} className={cn('button')}>
          Добавить
        </button>
      </div>
    </div>
  );
}

AppItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAddItemToCart: PropTypes.func,
};

AppItem.defaultProps = {
  onAddItemToCart: () => {},
};

export default React.memo(AppItem);
