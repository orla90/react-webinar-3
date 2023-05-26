import { memo } from 'react';
import PropTypes from 'prop-types';
import LanguageSwitcher from '../language-switcher';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Head({ title, language, setLanguage }) {
  const cn = bem('Head');
  return (
    <div className={cn()}>
      <h1>{title}</h1>
      <LanguageSwitcher language={language} setLanguage={setLanguage} />
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  language: PropTypes.string,
};

Head.defaultProps = {
  language: 'ru',
};

export default memo(Head);
