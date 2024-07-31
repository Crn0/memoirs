import PropTypes from 'prop-types';
import { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';
import './css/textarea.module.css';

export default function Textarea({ name, value, cols, rows, onChange }) {
    const { theme } = useContext(ThemeContext);

    return (
        <textarea
            className={`${theme}`}
            name={name}
            cols={cols}
            rows={rows}
            value={value}
            onChange={onChange}
            required
        />
    );
}

Textarea.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    cols: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
};
