import { useActionData } from 'react-router-dom';
import { useContext, useEffect, useReducer, useState } from 'react';
import useAuthData from '../../hooks/useAuthData';
import ThemeContext from '../../context/themeContext';
import UserContext from '../../context/userContext';
import reducer, { formState } from './reducer';
import Form from '../../components/ui/form/Form';
import Fieldset from '../../components/ui/form/Fieldset';
import Label from '../../components/ui/form/Label';
import Input from '../../components/ui/form/Input';
import Button from '../../components/ui/button/Button';
import FieldErrorMessage from '../../components/ui/form/FieldErrorMessage';
import isEmail from '../../helpers/validator/isEmail';

export default function SignUp() {
    const { theme } = useContext(ThemeContext);
    const { setUser } = useContext(UserContext);
    const [status, setStatus] = useState('typing');
    const [inputs, dispatch] = useReducer(reducer, formState);
    const signUpData = useActionData();
    const error = signUpData?.error;
    const user = signUpData?.user;
    const token = signUpData?.token;

    const disableButton = (() => {
        const fieldNames = [
            'firstName',
            'lastName',
            'email',
            'username',
            'password',
            'confirm_password',
        ];
        const areFieldsEmpty = fieldNames.map((n) => inputs[n].trim() === '');

        if (areFieldsEmpty.includes(true) || status === 'submitting')
            return true;

        return false;
    })();

    const handleSubmit = () => {
        if (isEmail(inputs.email)) {
            setStatus('submitting');

            return;
        }

        setStatus('error');
    };

    const inputValue = (fieldName) => inputs[fieldName];

    const onChange = (e) => {
        const { value, name } = e.target;

        dispatch({
            value,
            type: name,
        });
    };

    useEffect(() => {
        if (error) setStatus('error');
    }, [error]);

    useAuthData(error, user, token, setUser);

    return (
        <section>
            <div className={`${theme} form__container`}>
                <h1>Sign Up</h1>
                <div className="error__container">
                    {[
                        'firstName',
                        'lastName',
                        'email',
                        'username',
                        'password',
                        'confirm_password',
                    ].map((fName) => {
                        if (error) {
                            return (
                                <FieldErrorMessage
                                    key={fName}
                                    fieldName={fName}
                                    error={error}
                                />
                            );
                        }

                        return null;
                    })}
                </div>
                <Form action="/sign-up" method="POST" onSubmit={handleSubmit}>
                    <Fieldset fieldName="fullname__field">
                        <Label name="First name:">
                            <Input
                                type="text"
                                name="firstName"
                                value={inputValue('firstName')}
                                onChange={onChange}
                            />
                        </Label>

                        <Label name="Last name:">
                            <Input
                                type="text"
                                name="lastName"
                                value={inputValue('lastName')}
                                onChange={onChange}
                            />
                        </Label>
                    </Fieldset>

                    <Fieldset fieldName="email_username__field">
                        <Label name="Email:">
                            <Input
                                type="email"
                                name="email"
                                value={inputValue('email')}
                                onChange={onChange}
                            />
                        </Label>

                        <Label name="Username:">
                            <Input
                                type="text"
                                name="username"
                                value={inputValue('username')}
                                onChange={onChange}
                            />
                        </Label>
                    </Fieldset>

                    <Fieldset fieldName="password__field">
                        <Label name="Password:">
                            <Input
                                type="password"
                                name="password"
                                value={inputValue('password')}
                                onChange={onChange}
                            />
                        </Label>

                        <Label name="Confirm password:">
                            <Input
                                type="password"
                                name="confirm_password"
                                value={inputValue('confirm_password')}
                                onChange={onChange}
                            />
                        </Label>
                    </Fieldset>

                    <Fieldset fieldName="button__field">
                        <Button
                            type="submit"
                            size="medium"
                            disabled={disableButton}
                        >
                            Sign Up
                        </Button>
                    </Fieldset>
                </Form>
            </div>
        </section>
    );
}
