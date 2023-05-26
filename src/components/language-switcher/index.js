import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function LanguageSwitcher({ language, setLanguage }) {
  const cn = bem('LanguageSwitcher');

  return (
    <section className={cn({ lang: language })}>
      <button
        onClick={() => setLanguage('en')}
        className={cn('item', { en: true })}
      >
        EN
      </button>
      {' / '}
      <button
        onClick={() => setLanguage('ru')}
        className={cn('item', { ru: true })}
      >
        RU
      </button>
    </section>
  );
}

LanguageSwitcher.propTypes = {
  language: PropTypes.string,
};

LanguageSwitcher.defaultProps = {
  language: 'ru',
};

export default memo(LanguageSwitcher);
