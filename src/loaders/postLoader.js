import { URL } from '../constants/env';
import localStorage from '../helpers/storage/localStorage';

const loader = async () => {
    try {
        const bearerToken = localStorage.has('token')
            ? `Bearer ${localStorage.get('token')}`
            : '';

        const res = await fetch(`${URL}/posts?limit=100`, {
            headers: { Authorization: `${bearerToken}` },
        });

        const data = await res.json();

        if (res.status >= 400) {
            throw new Error('Server Error');
        }

        return data;
    } catch (error) {
        console.log(error);
        return {
            error: error.message,
        };
    }
};

export default loader;
