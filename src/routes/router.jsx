import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import MainError from '../components/errors/main';
import Posts from '../pages/Posts';
import PostDetail from '../pages/Post';
import Profile from '../pages/Profile/index';
import SignUp from '../pages/Sign-up';
import Login from '../pages/Login';
import loaders from '../loaders/index';
import actions from '../actions';

function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            loader: loaders.rootLoader,
            errorElement: <MainError />,
            children: [
                {
                    index: true,
                    loader: loaders.postsLoader,
                    element: <Posts />,
                },
                {
                    path: 'posts',
                    loader: loaders.postsLoader,
                    element: <Posts />,
                },
                {
                    path: 'posts/:postId',
                    shouldRevalidate: false,
                    loader: loaders.postDetailLoader,
                    action: actions.commentAction,
                    element: <PostDetail />,
                },
                {
                    path: 'users/:userId/:username?',
                    element: <Profile />,
                },
                {
                    path: 'sign-up',
                    action: actions.signUpAction,
                    element: <SignUp />,
                },
                {
                    path: 'login',
                    action: actions.loginAction,
                    element: <Login />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default Router;
