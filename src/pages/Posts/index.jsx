import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import ThemeContext from '../../context/themeContext';
import Card from '../../components/ui/card/card';

export default function Posts() {
    const { posts } = useLoaderData();
    const { theme } = useContext(ThemeContext);

    /**
     * TODO: add bookmark feature
     */


    return (
        <div className={`${theme} posts__container`}>
            {(() => {
                if (!posts?.length <= 0) {
                    return (
                        <>
                            {posts.map((post) => (
                                <Card post={post} key={post._id} />
                            ))}
                        </>
                    );
                }

                return <p>There are no posts.</p>;
            })()}
        </div>
    );
}
