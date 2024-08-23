/* eslint-disable no-unused-vars */
import { useContext, useReducer, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import UserContext from '../../context/userContext';
import ThemeContext from '../../context/themeContext';
import EditForm from './EditForm';
import Button from '../../components/ui/button/Button';
import reducer from './reducer';
import currentTheme from '../../helpers/theme/currentTheme';
import style from './css/index.module.css';

export default function Profile() {
    const { user } = useContext(UserContext);
    const { theme } = useContext(ThemeContext);
    const { userId } = useParams();
    const [edit, setEdit] = useState(false);

    const [formData, dispatch] = useReducer(reducer, {
        firstName: user?.firstName,
        lastName: user?.lastName,
        username: user?.username,
        email: user?.email,
    });
    const fullName = `${user?.firstName} ${user?.lastName}`;
    const userName = `${user?.username}`;
    const email = `${user?.email}`;
    const date = DateTime.fromISO(user?.createdAt).toFormat('LLL dd yyyy');

    const onClick = () => setEdit((isEdit) => !isEdit);
    const currTheme = currentTheme(theme);

    return (
        <>
            {(() => {
                if (user?._id === userId) {
                    return (
                        <section className={`${style['f-center']}`}>
                            {/* <div className='note'>
                                    <p>note: some features are not yet implemented</p>
                                </div> */}

                            <div
                                className={`${style.profile} ${style['profile--mx-w']} ${currTheme(style['profile--light'], style['profile--dark'])}`}
                            >
                                <div className="profile__actions">
                                    <Button
                                        customStyle={`${style.button}`}
                                        type="button"
                                        size="medium"
                                        onClick={onClick}
                                        disabled={false}
                                    >
                                        {(() => {
                                            if (!edit) return 'Edit profile';

                                            return 'Cancel';
                                        })()}
                                    </Button>
                                </div>

                                <div className="profile__details">
                                    {(() => {
                                        if (edit) {
                                            return (
                                                <div>
                                                    <EditForm
                                                        formData={formData}
                                                        dispatch={dispatch}
                                                        setEdit={setEdit}
                                                    />
                                                </div>
                                            );
                                        }

                                        return (
                                            <>
                                                <div className="profile__top">
                                                    <h1>{`${fullName} (${userName})`}</h1>
                                                </div>
                                                <div className="profile__middle">
                                                    <p> {email} </p>
                                                </div>
                                                <div className="profile__bottom">
                                                    <p>
                                                        {' '}
                                                        {`Joined on ${date}`}
                                                    </p>
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        </section>
                    );
                }

                return <Navigate to="/" replace />;
            })()}
        </>
    );
}
