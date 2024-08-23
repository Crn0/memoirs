import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import PostLists from './List';
import PostError from './Error';
import Spinner from '../../components/ui/spinner';
import style from './css/index.module.css';

export default function Posts() {
    const { data } = useLoaderData();

    /**
     * TODO: add bookmark feature
     */

    return (
        <Suspense fallback={<Spinner customStyle={`${style.spinner}`} />}>
            <Await resolve={data} errorElement={<PostError />}>
                <section className={`${style.center}`}>
                    <PostLists />
                </section>
            </Await>
        </Suspense>
    );
}
