import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import MainError from '../components/errors/main';
import Posts from '../pages/Posts';
import SignUp from '../pages/Sign-up';
import Login from '../pages/Login';
import loaders from '../loaders/index';
import actions from '../actions';

const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            loader: loaders.rootLoader,
            errorElement: <MainError />,
            children: [
                {
                    index: true,
                    element: <Posts />,
                    loader: loaders.postsLoader,
                },
                {
                    path: 'posts',
                    element: <Posts />,
                    loader: loaders.postsLoader,
                },
                {
                    path: 'sign-up',
                    element: <SignUp />,
                },
                {
                    path: 'login',
                    errorElement: <MainError />,
                    action: actions.loginAction,
                    element: <Login />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router;
