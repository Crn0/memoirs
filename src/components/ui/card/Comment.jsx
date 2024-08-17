import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import ThemeContext from '../../../context/themeContext';
import UserContext from '../../../context/userContext';
import Form from '../form/Form';
import Fieldset from '../form/Fieldset';
import Input from '../form/Input';
import Button from '../button/Button';

export default function CommentCard({ comment }) {
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(UserContext);
    const [status, setStatus] = useState('idle');

    const date = DateTime.fromISO(comment?.created_at).toFormat('LLL dd');
    const isAuth = !!user;
    const author = comment?.author;
    
    return (
        <>
            {(() => {
                if (comment.isDeleted) return null;

                return  <div className={`${theme} comment__detail`}>
                <div className="comment__header">
                    <p>
                        {`${author.firstName} ${author.lastName}`}
                    </p>

                    <p>{date}</p>
                </div>

                <div className="comment__body">{comment.body}</div>

                {isAuth &&
                    (() => {
                        if (
                            author._id === user._id &&
                            !comment.isDeleted
                        ) {
                            return (
                                <div className="comment__delete">
                                    <Form
                                        action=""
                                        method="POST"
                                        onSubmit={() => {
                                            setStatus('submitting');
                                        }}
                                    >
                                        <Fieldset fieldName="delete__field">
                                            <Input
                                                type="hidden"
                                                name="form-id"
                                                value="DELETE_COMMENT"
                                            />

                                            <Input
                                                type="hidden"
                                                name="comment-id"
                                                value={`${comment._id}`}
                                            />

                                            <Button
                                                type="submit"
                                                size="medium"
                                                disabled={
                                                    status ===
                                                    'submitting'
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </Fieldset>
                                    </Form>
                                </div>
                            );
                        }

                        return null
                    })()}
            </div>
            })()}
        </>
    );
}

CommentCard.propTypes = {
    comment: PropTypes.shape({
        author: PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,

        }).isRequired,
        body: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        isDeleted: PropTypes.bool.isRequired,
        isReply: PropTypes.bool.isRequired,
        likes: PropTypes.shape({
            // eslint-disable-next-line react/forbid-prop-types
            user: PropTypes.arrayOf(PropTypes.object),
            likes: PropTypes.number
        }).isRequired,
        post: PropTypes.string.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        replies: PropTypes.array.isRequired,
        updatedAt: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
    }).isRequired,
};
