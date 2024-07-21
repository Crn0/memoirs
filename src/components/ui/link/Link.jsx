import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Link({ url, theme, children }) {
    return (
        <RouterLink to={url} className={`${theme}`}>
            {children}
        </RouterLink>
    );
}

Link.propTypes = {
    url: PropTypes.string.isRequired,
    theme: PropTypes.string,
    children: PropTypes.node.isRequired,
};
