import { defer } from 'react-router-dom';
import { URL } from '../constants/env';
import localStorage from '../helpers/storage/localStorage';
import BaseError from '../helpers/errors/baseError';

const getPost = async (params) => {
    try {
        const { postId } = params;

        const bearerToken = localStorage.has('token')
            ? `Bearer ${localStorage.get('token')}`
            : '';

        const res = await fetch(`${URL}/posts/${postId}`, {
            headers: { Authorization: `${bearerToken}` },
        });

        const data = await res.json();

        if (res.status >= 400) {
            throw new BaseError('Blog Post Loader', data.code, data.message);
        }

        return data;
    } catch (error) {
        return Promise.reject(new BaseError(error.name, error.httpCode, error.message));
    }
};

const loader = async ({ params }) => {
    const postPromise = getPost(params);

    return defer({ data: postPromise });
};

export default loader;
