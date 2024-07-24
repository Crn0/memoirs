import { useActionData } from 'react-router-dom';
import { useContext } from 'react';
import useAuthData from '../../hooks/useAuthData';
import ThemeContext from '../../context/themeContext';
import UserContext from '../../context/userContext';
import Form from '../../components/ui/form/Form';
import Fieldset from '../../components/ui/form/Fieldset';
import Label from '../../components/ui/form/Label';
import Input from '../../components/ui/form/Input';
import Button from '../../components/ui/button/Button';
import FieldErrorMessage from '../../components/ui/form/FieldErrorMessage';

export default function SignUp() {
    const { theme } = useContext(ThemeContext);
    const { setUser } = useContext(UserContext); 
    const signUpData = useActionData();

    const error = signUpData?.error;
    const user = signUpData?.user;
    const token = signUpData?.token;

    useAuthData(error, user, token, setUser)

    return (
        <div className={`${ theme } form__container`}>
            <div className="error__container">
                {
                    ['firstName', 'lastName', 'email', 'username', 'password', 'confirm_password'].map((fName) => {
                        
                        if(error) {
                            return <FieldErrorMessage key={fName} fieldName={fName} error={error}/>
                        }
                    })
                }
            </div>
            <Form action='/sign-up' method='POST'>
                <Fieldset fieldName='fullname__field' >
                    <Label name='first-name:'>
                        <Input type='text' name='firstName' uncontrolled={ true }/>
                    </Label>

                    <Label name='last-name:'>
                        <Input type='text' name='lastName' uncontrolled={ true }/>
                    </Label>
                </Fieldset>

                <Fieldset fieldName='email_username__field'>
                    <Label name='email:'>
                        <Input type='email' name='email' uncontrolled={ true }/>
                    </Label>

                    <Label name='username:'>
                        <Input type='text' name='username' uncontrolled={ true }/>
                    </Label>
                </Fieldset>

                <Fieldset fieldName='password__field'>
                    <Label name='password'>
                        <Input type='password' name='password' uncontrolled={ true }/>
                    </Label>

                    <Label name='confirm-password:'>
                        <Input type='password' name='confirm_password' uncontrolled={ true }/>
                    </Label>
                </Fieldset>

                <Fieldset fieldName='button__field'>
                    <Button 
                        type='submit'
                        size='medium'
                        uncontrolled={ true }
                    >
                        Sign Up
                    </Button>
                </Fieldset>
            
            </Form>
        </div>
    );
}
