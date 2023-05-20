import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import { getLocaleCurrency } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Controls(props) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      {props.type === 'add-item' && (
        <button onClick={() => props.onAdd()}>Добавить</button>
      )}
      {props.type === 'open-cart' && (
        <>
          <div className={cn('description')}>
            В корзине:
            {props.cart.cartList.length ? (
              <span className={cn('description__amount')}>
                {props.cart.cartList.length}{' '}
                {plural(props.cart.cartList.length, {
                  one: 'товар',
                  few: 'товара',
                  many: 'товаров',
                })}
                {' / '}
                {getLocaleCurrency(props.cart.totalSum)}
              </span>
            ) : (
              <span className={cn('description__empty')}>пусто</span>
            )}
          </div>
          <button onClick={() => props.onOpenCart()} className={cn('button')}>
            Перейти
          </button>
        </>
      )}
      {props.type === 'close-cart' && (
        <button onClick={() => props.onCloseCart()}>Закрыть</button>
      )}
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  onOpenCart: PropTypes.func,
  onCloseCart: PropTypes.func,
  type: PropTypes.string.isRequired,
  cart: PropTypes.object.isRequired,
};

Controls.defaultProps = {
  onAdd: () => {},
  onOpenCart: () => {},
  onCloseCart: () => {},
};

export default React.memo(Controls);
