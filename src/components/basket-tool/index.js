import { memo } from 'react';
import i18Obj from '../../i18Obj';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';

function BasketTool({ sum, amount, onOpen, language }) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>
        {i18Obj[language].inTheBasket}
        {': '}
      </span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
              one: `${i18Obj[language].oneItem}`,
              few: `${i18Obj[language].fewItems}`,
              many: `${i18Obj[language].manyItems}`,
            })} / ${numberFormat(sum)} ₽`
          : `${i18Obj[language].empty}`}
      </span>
      <button onClick={onOpen} className={cn('btn')}>
        {i18Obj[language].goTo}
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
