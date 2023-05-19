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
            {props.cart.length ? (
              <span className={cn('description__amount')}>
                {props.cart.length}{' '}
                {plural(props.cart.length, {
                  one: 'товар',
                  few: 'товара',
                  many: 'товаров',
                })}
                {' / '}
                {getLocaleCurrency(props.сartSum)}
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
  сartSum: PropTypes.number,
};

Controls.defaultProps = {
  onAdd: () => {},
  onOpenCart: () => {},
  onCloseCart: () => {},
};

export default React.memo(Controls);
