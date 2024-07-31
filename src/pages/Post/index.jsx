import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import Detail from './Detail';
import Spinner from '../../components/ui/spinner';
import PostError from './Error';

export default function PostDetail() {
    const { data } = useLoaderData();

    return (
        <Suspense fallback={<Spinner message="Fetching blog post...." />}>
            <Await resolve={data} errorElement={<PostError />}>
                <Detail />
            </Await>
        </Suspense>
    );
}
