import PropTypes from 'prop-types';
import { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';

function Button({ type, size, onClick, children, testId, disabled = false }) {
    const { theme } = useContext(ThemeContext);

    return (
        <button
            type={type}
            className={`${theme} ${size}`}
            onClick={onClick}
            disabled={disabled}
            data-testid={testId}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    type: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    testId: PropTypes.string,
};

export default Button;
