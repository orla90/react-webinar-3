import React from 'react';
import Controls from '../controls';
import PropTypes from 'prop-types';
import List from '../list';
import { getLocaleCurrency } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Cart(props) {
  const cn = bem('Cart');

  const initialCodes = props.cart.map((item) => item.code);
  const initialCartList = props.list.filter((item) =>
    initialCodes.includes(item.code)
  );

  return (
    <div className={cn()}>
      <header className={cn('header')}>
        <h2 className={cn('title')}>Корзина</h2>
        <Controls
          type='close-cart'
          cart={props.cart}
          сartSum={props.cartSum}
          onCloseCart={props.onCloseCart}
        />
      </header>
      <div className={cn('content')}>
        <List
          list={initialCartList}
          type='cart-list'
          cart={props.cart}
          onDeleteItemFromCart={props.onDeleteItemFromCart}
        />
        {initialCartList.length > 0 ? (
          <div className={cn('total')}>
            <span className={cn('total__title')}>Итого</span>
            <span className={cn('total__currency')}>
              {getLocaleCurrency(props.сartSum)}
            </span>
          </div>
        ) : (
          <h2 className={cn('empty')}>В корзине пока нет товаров</h2>
        )}
      </div>
    </div>
  );
}

Cart.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onCloseCart: PropTypes.func,
  onDeleteItemFromCart: PropTypes.func,
};

Cart.defaultProps = {
  onCloseCart: () => {},
  onDeleteItemFromCart: () => {},
};

export default React.memo(Cart);
