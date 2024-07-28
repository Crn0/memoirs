import { redirect } from 'react-router-dom';
import { URL } from '../constants/env';
import localStorage from '../helpers/storage/localStorage';
import authStorage from '../helpers/storage/authStorage';

export default async function loader() {
    try {
        if (authStorage.has('auth') === false) {
            if (localStorage.has('token')) {
                const bearerToken = `Bearer ${localStorage.get('token')}`;
                const res = await fetch(`${URL}/users/token/me`, {
                    headers: { Authorization: `${bearerToken}` },
                });
                const data = await res.json();

                if (res.status >= 400) {
                    throw new Error(data.message, { cause: data.errors });
                }
                
                return {
                    user: data.user
                };
            }

            return null;
        }

        return authStorage.get('auth');
    } catch (error) {
        console.log(error);

        localStorage.remove('token');

        return redirect('/login');
    }
}
