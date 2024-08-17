import { useContext } from 'react';
import { useAsyncValue } from 'react-router-dom';
import { DateTime } from 'luxon';
import ThemeContext from '../../context/themeContext';
import UserContext from '../../context/userContext';
import purifyHTML from '../../helpers/sanitize/purifyHTML';
import Input from '../../components/ui/form/Input';
import CommentForm from '../../components/ui/form/CommentForm';
import Comment from '../../components/ui/card/Comment';
import Link from '../../components/ui/link/Link';

export default function PostDetail() {
    const { post, comments } = useAsyncValue();

    const { theme } = useContext(ThemeContext);
    const { user } = useContext(UserContext);

    const isAuth = !!user;
    const cover = post?.cover;
    const hasCover = post?.cover?.url !== '';
    const imageUrl = cover?.url;
    const author = post?.author;
    const title = post?.title;
    const commentCount = comments.filter(
        (comment) => comment.isDeleted === false
    ).length;

    const date = DateTime.fromISO(post?.createdAt).toFormat('LLL dd');
    const cleanHTML = purifyHTML(post?.body);

    return (
        <div className={`${theme} wrapper`}>
            <div className="post__container">
                <div className="post__header">
                    {(() => {
                        if (hasCover) {
                            return (
                                <div className="cover__container">
                                    <img
                                        className="post__cover"
                                        src={`${imageUrl}`}
                                        alt={`Cover of ${title}`}
                                    />
                                </div>
                            );
                        }

                        return null;
                    })()}
                    <div className="meta__container">
                        <div className="post__meta">
                            <p>{`${author?.firstName} ${author?.lastName}`}</p>

                            <p>{`Posted on ${date}`}</p>
                        </div>

                        <div className="post__title">
                            <p> {title}</p>
                        </div>
                    </div>
                </div>

                <div
                    className="post__body"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={cleanHTML}
                />
            </div>

            <div className="comments_container">
                <div className="comments__header">
                    <div className="comments__count">
                        <p> {`${commentCount} comments`} </p>
                    </div>

                    <div className="comments__form">
                        {(() => {
                            if (isAuth) {
                                return (
                                    <CommentForm
                                        cols={0}
                                        rows={2}
                                        btnSize="medium"
                                    >
                                        <Input
                                            type="hidden"
                                            name="form-id"
                                            value="ADD_COMMENT"
                                        />
                                    </CommentForm>
                                );
                            }

                            return (
                                <p>
                                        <Link url="/login" theme={theme}>
                                            Login
                                        </Link>{' '}
                                        or{' '}
                                        <Link url="/sign-up" theme={theme}>
                                            Sign-up
                                        </Link>{' '}
                                        to post an comment
                                    </p>
                            );
                        })()}
                    </div>
                </div>

                <div className="comments__list">
                    {(() => {
                        if (comments?.length) {
                            return comments?.map((comment) => (
                                <Comment key={comment._id} comment={comment} />
                            ));
                        }

                        return <p>There are no comments</p>
                    })()}
                </div>
            </div>
        </div>
    );
}
