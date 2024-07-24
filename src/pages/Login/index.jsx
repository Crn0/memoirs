import { useActionData, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import useAuthData from '../../hooks/useAuthData';
import ThemeContext from '../../context/themeContext';
import UserContext from '../../context/userContext';
import Form from '../../components/ui/form/Form';
import Fieldset from '../../components/ui/form/Fieldset';
import Label from '..//../components/ui/form/Label';
import Input from '../../components/ui/form/Input';
import Button from '../../components/ui/button/Button';
import ErrorMessage from '../../components/errors/errorMessage';
import fieldNameIncludes from '../../helpers/form/fieldnameIncludes';
import FieldErrorMessage from '../../components/ui/form/FieldErrorMessage';
import localStorage from '../../helpers/storage/localStorage';

export default function Login() {
    const { theme } = useContext(ThemeContext);
    const { setUser } = useContext(UserContext);
    const loginData = useActionData();
    const location = useLocation();
    const navigate = useNavigate();
    
    const error = loginData?.error;
    const user = loginData?.user;
    const token = loginData?.token;
    
    useAuthData(error, user, token, setUser)

    return (
        <div className="form__container">
                {
                    error && (() => {
                        const { messages } = error;
                        const noFieldErrors = (!fieldNameIncludes('email', messages) && !fieldNameIncludes('password', messages)) && error;
                        if(noFieldErrors) {
                            return (
                                <div className='error__container'>
                                    <ErrorMessage message={ messages }/>
                                </div>
                            )
                        } else {
                            return ['email', 'password'].map((fName) => {
                                return <FieldErrorMessage key={fName} fieldName={fName} error={error}/>
                            })
                        }
                    })()
                }
           
            <Form action="/login" method="POST">
                <Fieldset fieldName='email'>
                    <Label theme={theme} name="Email">
                        <Input
                            theme={theme}
                            type={'email'}
                            name={'email'}
                            uncontrolled={true}
                        />
                    </Label>
                </Fieldset>

                <Fieldset fieldName='password__field'>
                    <Label theme={theme} name="Password">
                        <Input
                            theme={theme}
                            type={'password'}
                            name={'password'}
                            uncontrolled={true}
                        />
                    </Label>
                </Fieldset>

                <Fieldset fieldName='button__field'>
                    <Button type={'submit'} size={'medium'} uncontrolled={true}>
                        Login
                    </Button>
                </Fieldset>
                
            </Form>
        </div>
    );
}
