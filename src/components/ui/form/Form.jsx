import PropTypes from 'prop-types';
import { Form as ReactForm } from 'react-router-dom';
import { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';
import './css/form.module.css';

export default function Form({ action, method, onSubmit, children }) {
    const { theme } = useContext(ThemeContext);

    return (
        <ReactForm
            aria-label="form"
            onSubmit={onSubmit}
            action={action}
            method={method}
            className={`${theme} form`}
        >
            {children}
        </ReactForm>
    );
}

Form.propTypes = {
    action: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]).isRequired,
};
