import { useActionData } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import useAuthData from '../../hooks/useAuthData';
import ThemeContext from '../../context/themeContext';
import UserContext from '../../context/userContext';
import Form from '../../components/ui/form/Form';
import Fieldset from '../../components/ui/form/Fieldset';
import Label from '../../components/ui/form/Label';
import Input from '../../components/ui/form/Input';
import Button from '../../components/ui/button/Button';
import formConstants from '../../constants/form';
import ErrorMessage from '../../components/errors/errorMessage';
import fieldNameIncludes from '../../helpers/form/fieldnameIncludes';
import FieldErrorMessage from '../../components/ui/form/FieldErrorMessage';
import style from './css/index.module.css';

const formState = {
    email: '',
    password: '',
};

export default function Login() {
    const { theme } = useContext(ThemeContext);
    const { setUser } = useContext(UserContext);
    const [status, setStatus] = useState('typing');
    const [formInputs, setFormInputs] = useState(formState);
    const loginData = useActionData();

    const error = loginData?.error;
    const user = loginData?.user;
    const token = loginData?.token;
    const isButtonDisabled =
        formInputs.email.trim() === '' ||
        formInputs.password.trim() === '' ||
        status === 'submitting';

    const handleSubmit = () => {
        setStatus('submitting');
    };

    useEffect(() => {
        if (error) setStatus('error');
    }, [error]);

    useAuthData(error, user, token, setUser);

    return (
        <section>
            <div>
                <Form action="/login" method="POST" onSubmit={handleSubmit}>
                    <div>
                        <h1>Login</h1>
                    </div>

                    <Fieldset fieldName={formConstants.EMAIL}>
                        <Label theme={theme} name="Email:">
                            <Input
                                customStyle={`${style.block}`}
                                theme={theme}
                                type={formConstants.EMAIL}
                                name={formConstants.EMAIL}
                                value={formInputs.email}
                                onChange={(e) => {
                                    const { name } = e.target;
                                    setFormInputs((prev) => ({
                                        ...prev,
                                        [name]: e.target.value,
                                    }));
                                }}
                            />
                        </Label>
                    </Fieldset>

                    <Fieldset fieldName="password__field">
                        <Label theme={theme} name="Password:">
                            <Input
                                customStyle={`${style.block}`}
                                theme={theme}
                                type={formConstants.PWD}
                                name={formConstants.PWD}
                                value={formInputs.password}
                                onChange={(e) => {
                                    const { name } = e.target;
                                    setFormInputs((prev) => ({
                                        ...prev,
                                        [name]: e.target.value,
                                    }));
                                }}
                            />
                        </Label>
                    </Fieldset>

                    {error &&
                        (() => {
                            const { messages } = error;
                            const fields = ['email', 'password'];
                            const fieldErrors = fields.map((field) =>
                                fieldNameIncludes(field, messages)
                            );
                            const noFieldErrors =
                                !fieldErrors.includes(true) && error;

                            if (noFieldErrors) {
                                return (
                                    <div className="error__container">
                                        <ErrorMessage
                                            customStyle={`${style.error}`}
                                            message={messages}
                                        />
                                    </div>
                                );
                            }

                            return fields.map((fName) => (
                                <FieldErrorMessage
                                    customStyle={`${style.error}`}
                                    key={fName}
                                    fieldName={fName}
                                    error={error}
                                />
                            ));
                        })()}

                    <Fieldset fieldName="button__field">
                        <Button
                            type="submit"
                            size="lg"
                            disabled={isButtonDisabled}
                            isLoading={status === 'submitting'}
                            customStyle={style.button}
                        >
                            Login
                        </Button>
                    </Fieldset>
                </Form>
            </div>
        </section>
    );
}
