import { useContext } from 'react';
import { useAsyncValue } from 'react-router-dom';
import ThemeContext from '../../context/themeContext';
import PostCard from '../../components/ui/card/Post';
import style from './css/list.module.css';
import currentTheme from '../../helpers/theme/currentTheme';

export default function PostList() {
    const { posts } = useAsyncValue();
    const { theme } = useContext(ThemeContext);

    const currTheme = currentTheme(theme);

    return (
        <div className={`${theme} ${style.posts} ${style['w-100']}`}>
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

                return (
                    <div className={`${style.center}`}>
                        <p
                            className={`${currTheme(style['font--light'], style['font--dark'])}`}
                        >
                            There are no posts.
                        </p>
                    </div>
                );
            })()}
        </div>
    );
}
