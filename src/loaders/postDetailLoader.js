import { URL } from '../constants/env';
import localStorage from '../helpers/storage/localStorage';

const loader = async ({ params }) => {
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
            throw new Error(data.message);
        }
        return {
            post: data.post,
            comments: data.comments,
        };
    } catch (error) {
         return {
                error: error.message,
                code: error.code
         }
    }
};

export default loader;