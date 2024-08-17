import PropTypes from 'prop-types';
import { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';

export default function Label({ name, children }) {
    const { theme } = useContext(ThemeContext);

    return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className={`${theme}`}>
            <span>{name}</span>
            {children}
        </label>
    );
}

Label.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]).isRequired,
};
