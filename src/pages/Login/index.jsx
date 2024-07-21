import { useActionData, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import ThemeContext from '../../context/themeContext';
import UserContext from '../../context/userContext';
import Form from '../../components/ui/form/Form';
import Fieldset from '../../components/ui/form/Fieldset';
import Label from '..//../components/ui/form/Label';
import Input from '../../components/ui/form/Input';
import Button from '../../components/ui/button/Button';
import ErrorMessage from '../../components/errors/errorMessage';

export default function Login() {
    const loginData = useActionData();
    const { theme } = useContext(ThemeContext);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loginData?.error && loginData?.user) {
            // setUser(loginData.user);
            // navigate('/');
            console.log('foobar', loginData instanceof Error);
        }
    }, [loginData, setUser, navigate]);
    
    const fieldError = (name) => {
        const error = loginData?.error?.messages?.filter?.(error => error.field === name)
        return error[0].message
    }
    const includes = (fieldName, array) => {
        if(!Array.isArray(array)) return false;

        const queue = [...array];
        while(queue.length) {
            const data = queue[0]

            if(data.field === fieldName) return true;

            queue.shift();
        }

        return false;
    }

    return (
        <div className="page__container">
                {
                    (() => {
                        
                        if((!includes('email', loginData?.error?.messages) && !includes('password', loginData?.error?.messages)) && loginData?.error) {
                            const { messages } = loginData.error

                            return (
                                <div className='error__container'>
                                    <ErrorMessage message={ messages }/>
                                </div>
                            )
                        }
                    })()
                }
           
            <Form action="/login" method="POST">
                <Fieldset>
                    <Label theme={theme} name="Email">
        
                        <Input
                            theme={theme}
                            type={'email'}
                            name={'email'}
                            uncontrolled={true}
                        />

                        {
                            includes('email', loginData?.error?.messages) && <ErrorMessage message={  fieldError('email')  }/>
                        }

                    </Label>

                    <Label theme={theme} name="Password">

                        <Input
                            theme={theme}
                            type={'password'}
                            name={'password'}
                            uncontrolled={true}
                        />

                        {
                            includes('password', loginData?.error?.messages) && <ErrorMessage message={  fieldError('password')  }/>
                        }

                    </Label>
                </Fieldset>

                <Fieldset>
                    <Button type={'submit'} size={'medium'} uncontrolled={true}>
                        Login
                    </Button>
                </Fieldset>
            </Form>
        </div>
    );
}
