import PropTypes from 'prop-types';
import { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';

export default function Label({ name, children }) {
    const { theme } = useContext(ThemeContext);

    return (
        <label className={`${theme}`}>
            <span>{name}</span>
            {children}
        </label>
    );
}

Label.propTypes = {
    name: PropTypes.string.isRequired,
    children:PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]).isRequired,
};
