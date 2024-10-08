import { URL } from '../constants/env';
import FormError from '../helpers/errors/formError';

const action = async ({ request }) => {
    try {
        const myHeaders = new Headers();

        myHeaders.append('Content-Type', 'application/json');

        const formData = await request.formData();
        const submission = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        const res = await fetch(`${URL}/users/tokens`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(submission),
        });
        const data = await res.json();

        if (res.status >= 400) {
            throw new FormError(data.message, data.error.message, data.code);
        }

        return { user: data.user, token: data.token };
    } catch (error) {
        return {
            error: {
                messages: error.errors,
            },
        };
    }
};

export default action;
