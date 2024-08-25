import { defer } from 'react-router-dom';
import { URL } from '../constants/env';
import localStorage from '../helpers/storage/localStorage';
import BaseError from '../helpers/errors/baseError';

const getPosts = async () => {
    try {
        const bearerToken = localStorage.has('token')
            ? `Bearer ${localStorage.get('token')}`
            : '';

        const res = await fetch(`${URL}/posts?limit=100`, {
            headers: { Authorization: `${bearerToken}` },
        });

        const data = await res.json();

        if (res.status >= 400) {
            throw new BaseError('Blog Posts Loader', data.code, data.message);
        }
        // await new Promise(r => {(setTimeout(r, 100000))})
        return data;
    } catch (error) {
        return Promise.reject(
            new BaseError(error.name, error.httpCode, error.message)
        );
    }
};

const loader = () => {
    const postsPromise = getPosts();

    return defer({ data: postsPromise });
};

export default loader;
