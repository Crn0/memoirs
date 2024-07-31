import PropTypes from 'prop-types';
import { useContext } from 'react';
import { DateTime } from 'luxon';
import ThemeContext from '../../../context/themeContext';
import Link from '../link/Link';

export default function PostCard({ post }) {
    const { theme } = useContext(ThemeContext);
    const hasCover = post.cover.url;
    const { firstName } = post.author;
    const { lastName } = post.author;
    const date = DateTime.fromISO(post?.createdAt).toFormat('LLL dd');

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
                        <time>{date}</time>
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

PostCard.propTypes = {
    post: PropTypes.object.isRequired,
};
