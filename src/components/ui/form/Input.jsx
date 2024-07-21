import PropTypes from 'prop-types';
import { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';
import './css/input.module.css';

export default function Input({ type, name, value, onChange, uncontrolled }) {
    const { theme } = useContext(ThemeContext);

    if (uncontrolled) {
        return (
            <input className={`${theme}`} type={type} name={name} required />
        );
    }
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
    value: PropTypes.any,
    onChange: PropTypes.func,
    uncontrolled: PropTypes.bool.isRequired,
};
