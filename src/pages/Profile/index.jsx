/* eslint-disable no-unused-vars */
import { useContext, useReducer } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import UserContext from '../../context/userContext';
import Form from '../../components/ui/form/Form';
import FieldSet from '../../components/ui/form/Fieldset';
import Label from '../../components/ui/form/Label';
import Input from '../../components/ui/form/Input';
import Button from '../../components/ui/button/Button';
import reducer from './reducer';

export default function Profile() {
    const { user } = useContext(UserContext);
    const { userId } = useParams();
    const [state, dispatch] = useReducer(reducer, {
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        username: user?.username,
    });

    const fullName = `${state?.firstName} ${state?.lastName}`;
    const userName = `${state?.username}`;
    const email = `${state?.email}`;
    const date = DateTime.fromISO(user?.createdAt).toFormat('LLL dd yyyy');

    return (
        <>
            {(() => {
                if (user?._id === userId) {
                    return (
                        <>
                            <section>
                                <div className="note">
                                    <p>
                                        note: some features are not yet
                                        implemented
                                    </p>
                                </div>

                                <div className="profile">
                                    <div className="profile__actions">
                                        <Button
                                            type="button"
                                            size="medium"
                                            disabled={false}
                                        >
                                            Edit profile
                                        </Button>
                                    </div>

                                    <div className="profile__details">
                                        <div className="profile__top">
                                            <h1>
                                                {`${fullName} (${userName})`}
                                            </h1>
                                        </div>

                                        <div className="profile__middle">
                                            <p> {email} </p>
                                        </div>

                                        <div className="profile__bottom">
                                            <p> {`Joined on ${date}`}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2>Bookmarks</h2>
                                <p>You do not have bookmarked posts</p>
                            </section>
                        </>
                    );
                }

                return <Navigate to="/" replace/>;
            })()}
        </>
    );
}
