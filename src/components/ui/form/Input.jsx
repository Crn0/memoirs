import PropTypes from 'prop-types';
import { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';
import './css/input.module.css';

export default function Input({ type, name, value, onChange }) {
    const { theme } = useContext(ThemeContext);
    
    return (
        <input
            className={`${theme}`}
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
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
};
