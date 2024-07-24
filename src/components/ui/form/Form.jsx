import PropTypes from 'prop-types';
import { Form as ReactForm } from 'react-router-dom';
import { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';

export default function Form({ action, method, children }) {
    const { theme } = useContext(ThemeContext);

    return (
        <ReactForm
            action={action}
            method={method}
            className={`${theme} form`}
            style={{ display: 'grid', placeContent: 'center' }}
        >
            {children}
        </ReactForm>
    );
}

Form.propTypes = {
    action: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]).isRequired,
};
