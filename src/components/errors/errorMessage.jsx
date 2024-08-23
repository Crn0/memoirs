import PropTypes from 'prop-types';

export default function ErrorMessage({ message, customStyle = '' }) {
    return <p className={`${customStyle}`}>{message}</p>;
}

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
    customStyle: PropTypes.string,
};
