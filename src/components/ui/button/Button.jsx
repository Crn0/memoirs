import PropTypes from 'prop-types';
import { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';

function Button({ type, size, onClick, children, uncontrolled }) {
    const { theme } = useContext(ThemeContext);

    if (uncontrolled) {
        return (
            <button type={type} className={`${theme} ${size}`}>
                {children}
            </button>
        );
    }
    return (
        <button type={type} className={`${theme} ${size}`} onClick={onClick}>
            {children}
        </button>
    );
}

Button.propTypes = {
    type: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    uncontrolled: PropTypes.bool.isRequired,
};

export default Button;
