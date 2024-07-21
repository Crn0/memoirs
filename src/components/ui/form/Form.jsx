import PropTypes from 'prop-types';
import { Form as ReactForm } from 'react-router-dom';
import { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';

export default function Form({ action, method, children }) {
    const { theme } = useContext(ThemeContext);

    return (
        <div className="form__container">
            <ReactForm
                action={action}
                method={method}
                className={`${theme} form`}
            >
                {children}
            </ReactForm>
        </div>
    );
}

Form.propTypes = {
    action: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
