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
        <div className="post__card">
            {hasCover && (
                <div className="post__cover">
                    <img src={post.cover.url} alt={`Cover of ${post.title}`} />
                </div>
            )}

            <div className="post__body">
                <div className="post__top">
                    <div className="post__author">
                        <p>{`${firstName} ${lastName}`}</p>
                        <time>{date}</time>
                    </div>
                </div>

                <div className="post__bottom">
                    <Link url={`/posts/${post._id}`} theme={theme}>
                        <p>{post.title}</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

PostCard.propTypes = {
    post: PropTypes.shape({
        author: PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        cover: PropTypes.shape({
            url: PropTypes.string.isRequired,
            cloudinary_id: PropTypes.string.isRequired,
        }).isRequired,
        createdAt: PropTypes.string.isRequired,
        isPrivate: PropTypes.bool.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        updatedAt: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
    }).isRequired,
};
