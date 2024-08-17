import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import localStorage from '../helpers/storage/localStorage';

export default function useAuthData(error, user, token, setUser) {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.has('token')) {
            const { from } = { from: { pathname: '/' } };

            return navigate(from, { replace: true });
        }

        if (!error && user && token) {
            localStorage.add('token', token);
            setUser(user);

            return navigate('/', { replace: true });
        }

        return () => {};
    }, [error, user, token, setUser, navigate]);
}
