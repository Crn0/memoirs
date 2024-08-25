import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './css/link.module.css';

export default function Link({ url, children, customStyle = '' }) {
    return (
        <RouterLink to={url} className={`${style.a} ${customStyle}`}>
            {children}
        </RouterLink>
    );
}

Link.propTypes = {
    url: PropTypes.string.isRequired,
    customStyle: PropTypes.string,
    children: PropTypes.node.isRequired,
};
