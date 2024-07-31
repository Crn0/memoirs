import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import PostLists from './List';
import PostError from './Error';
import Spinner from '../../components/ui/spinner';

export default function Posts() {
    const { data } = useLoaderData();

    /**
     * TODO: add bookmark feature
     */

    return (
        <Suspense fallback={<Spinner message="Fetching blog posts...." />}>
            <Await resolve={data} errorElement={<PostError />}>
                <PostLists />
            </Await>
        </Suspense>
    );
}
