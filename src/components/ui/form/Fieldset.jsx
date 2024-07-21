import PropTypes from 'prop-types';

export default function Fieldset({ children }) {
    return <div>{children}</div>;
}

Fieldset.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]).isRequired,
};
