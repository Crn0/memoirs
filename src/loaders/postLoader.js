import { URL } from '../constants/env';
import localStorage from '../helpers/storage/localStorage';

const loader = async () => {
    try {
        const bearerToken = localStorage.has('token')
            ? `Bearer ${localStorage.has('token')}`
            : '';

        const res = await fetch(`${URL}/posts`, {
            headers: { Authorization: `${bearerToken}` },
        });

        if (res.status >= 400) {
            throw new Error('Server Error');
        }

        return res.json();
    } catch (error) {
        console.log(error);
        return {
            error: error.message,
        };
    }
};

export default loader;
