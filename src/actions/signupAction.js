import { json } from 'react-router-dom';
import { URL } from '../constants/env';
import FormError from '../helpers/errors/formError';

const action = async ({ request }) => {
    try {
        const myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");

        const formData = await request.formData();
        const submission = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            username: formData.get('username'),
            password: formData.get('password'),
            confirm_password: formData.get('confirm_password')
        };

        const req = await fetch(`${URL}/users`, { method: 'POST', headers: myHeaders, body: JSON.stringify(submission) });
        const data = await req.json();

        if(data.code >= 400) {
            throw new FormError(data.message, data.error.message, data.code)
        }

        const { user, token } = data;


        return {user, token};
    } catch (error) {

        return {
            error: {
                messages: error.errors,
            },
        };
    }
};

export default action;