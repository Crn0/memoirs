import { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../../context/themeContext';
import Link from '../link/Link';

export default function Card({ post }) {
    const { theme } = useContext(ThemeContext);
    const hasCover = post.cover.url;
    const { firstName } = post.author;
    const { lastName } = post.author;

    return (
        <div className={`post__card`}>
            {hasCover && (
                <div className={`post__cover`}>
                    <img
                        src={post.cover.url}
                        alt={`Cover photo of ${post.title}`}
                    />
                </div>
            )}

            <div className={`post__body`}>
                <div className={`post__top`}>
                    <div className={`post__author`}>
                        <p>{`${firstName} ${lastName}`}</p>
                        <time>{post.createdAt}</time>
                    </div>
                </div>

                <div className={`post__bottom`}>
                    <Link url={`/posts/${post._id}`} theme={theme}>
                        <p>{post.title}</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    post: PropTypes.object.isRequired,
};
