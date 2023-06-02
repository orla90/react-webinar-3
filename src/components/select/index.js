import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Select(props) {
  const cn = bem('Select');

  const onSelect = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <select
      className={cn({ theme: props.theme })}
      value={props.value}
      onChange={onSelect}
    >
      {props.options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.title}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
    })
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

Select.defaultProps = {
  onChange: () => {},
};

export default memo(Select);
