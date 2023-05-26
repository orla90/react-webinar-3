import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import i18Obj from '../../i18Obj';
import { convertDotToComma } from '../../utils';
import './style.css';

function ArticleMain({ article, onAdd, language }) {
  const cn = bem('ArticleMain');

  const callbacks = {
    onAdd: () => onAdd(article._id),
  };

  return (
    <article className={cn()}>
      <p className={cn('text', { thin: true })}>{article.description}</p>
      <p>
        <span className={cn('text', { thin: true })}>
          {i18Obj[language].country}
          {': '}
        </span>
        <span className={cn('text', { bold: true })}>
          {article.country}
          {' ('}
          {article.code}
          {')'}
        </span>
      </p>
      <p>
        <span className={cn('text', { thin: true })}>
          {i18Obj[language].category}
          {': '}
        </span>
        <span className={cn('text', { bold: true })}>{article.category}</span>
      </p>
      <p>
        <span className={cn('text', { thin: true })}>
          {i18Obj[language].edition}
          {': '}
        </span>
        <span className={cn('text', { bold: true })}>
          {article.edition?.toString()}
        </span>
      </p>
      <p>
        <span className={cn('text', { bold: true, big: true })}>
          {i18Obj[language].price}
          {': '}
        </span>
        <span className={cn('text', { bold: true, big: true })}>
          {convertDotToComma(article.price)} ₽
        </span>
      </p>
      <button className={cn('btn')} onClick={callbacks.onAdd}>
        {i18Obj[language].add}
      </button>
    </article>
  );
}

ArticleMain.propTypes = {
  article: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
};

ArticleMain.defaultProps = {
  onAdd: () => {},
};

export default memo(ArticleMain);
