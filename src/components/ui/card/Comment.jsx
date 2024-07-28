import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import ThemeContext from '../../../context/themeContext';
import UserContext from '../../../context/userContext';
import Form from '../form/Form';
import Fieldset from '../form/Fieldset';
import Input from '../form/Input';
import Button from '../button/Button';

export default function Comment({ comment }) {
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(UserContext);
    const [status, setStatus] = useState('idle');

    const date = DateTime.fromISO(comment?.created_at).toFormat('LLL dd');
    const isAuth = user ? true : false;
    const author = comment?.author;

   

    return (
        <>
            {
                (() => {
                    if(comment.isDeleted === false) {
                        return (
                            <div className={`${theme} comment__detail`}>
                                <div className="comment__header">
                                    <p>
                                    {`${author.firstName} ${author.lastName}`}
                                    </p>

                                    <p>
                                    { date }
                                    </p>
                                </div>

                                <div className="comment__body">
                                    { comment.body }
                                 </div>

                                <div className="comment__delete">
                                    {
                                        isAuth && (() => {
                                            if(author._id === user._id && !comment.isDeleted) {
                                                return (
                                                        <Form
                                                            action=''
                                                            method='POST'
                                                            onSubmit={() => {
                                                                console.log(42)
                                                            setStatus('submitting')
                                                            }}

                                                        >
                                                            <Fieldset fieldName='delete__comment'>
                                                                <Input
                                                                    type='hidden'
                                                                    name='form-id'
                                                                    value={'DELETE_COMMENT'}
                                                                />

                                                                <Input
                                                                    type='hidden'
                                                                    name='comment-id'
                                                                    value={`${comment._id}`}
                                                                />

                                                                <Button
                                                                    type='submit'
                                                                    size='medium'
                                                                    // onClick={deleteComment}
                                                                    disabled={ status === 'submitting'}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </Fieldset>
                                                        </Form>
                                                    );
                                                }
                                            })()
                                        }
                                </div>
                            </div>
                            );
                        }
                    })()
                }
        </>
    );
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
};