import { useContext } from 'react';
import { useAsyncValue } from 'react-router-dom';
import ThemeContext from '../../context/themeContext';
import PostCard from '../../components/ui/card/Post';

export default function PostList() {
    const { posts } = useAsyncValue();
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`${theme} posts__container`}>
            {(() => {
                if (!posts?.length <= 0) {
                    return (
                        <>
                            {posts.map((post) => (
                                <PostCard post={post} key={post._id} />
                            ))}
                        </>
                    );
                }

                return <p>There are no posts.</p>;
            })()}
        </div>
    );
}
