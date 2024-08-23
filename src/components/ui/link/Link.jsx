import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/link.module.css';

export default function Link({ url, children, customStyle = '' }) {
    return (
        <RouterLink to={url} className={`${customStyle}`}>
            {children}
        </RouterLink>
    );
}

Link.propTypes = {
    url: PropTypes.string.isRequired,
    customStyle: PropTypes.string,
    children: PropTypes.node.isRequired,
};
