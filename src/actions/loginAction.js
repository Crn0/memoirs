import { json } from 'react-router-dom';
import { URL } from '../constants/env';
import localStorage from '../helpers/storage/localStorage';
import FormError from '../helpers/errors/formError';

const action = async ({ request }) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const formData = await request.formData();
        const submission = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        const res = await fetch(`${URL}/users/tokens`, { method: 'POST', headers: myHeaders, body: JSON.stringify(submission) });
        const data = await res.json()
        
        if (res.status >= 400) {
            
            throw new FormError(data.message, data.error.message, data.code)
        }

        return json(res);
    } catch (error) {
        return {
            error: {
                messages: error.errors,
            },
        };
    }
};

export default action;
