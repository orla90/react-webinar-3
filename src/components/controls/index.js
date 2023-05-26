import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import i18Obj from '../../i18Obj';

function Controls({ onAdd, language }) {
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{i18Obj[language].add}</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default memo(Controls);
