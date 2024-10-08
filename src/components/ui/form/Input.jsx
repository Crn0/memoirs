import PropTypes from 'prop-types';
import { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';
import './css/input.module.css';

export default function Input({
    type,
    name,
    value,
    onChange,
    size = '',
    customStyle = '',
}) {
    const { theme } = useContext(ThemeContext);

    return (
        <input
            className={`${theme} ${size} ${customStyle}`}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required
        />
    );
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
    ]).isRequired,
    onChange: PropTypes.func,
    size: PropTypes.string,
    customStyle: PropTypes.string,
};
