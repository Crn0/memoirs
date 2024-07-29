import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '../link/Link';
import ThemeContext from '../../../context/themeContext';
import UserContext from '../../../context/userContext';
import Button from '../button/Button';

export default function NavBar() {
    const { theme } = useContext(ThemeContext);
    const { user, setUser } = useContext(UserContext);
    
    const navigate = useNavigate();

    const userId = user?._id;
    const username = user?.username;

    const handleLogout = async () => {
        const localStorage = await import(
            '../../../helpers/storage/localStorage'
        );

        localStorage.default.remove('token');
        setUser(null);

        navigate('/', { replace: true });
    };

    return (
        <div className={`${theme}`}>
            {(() => {
                if (user) {
                    return (
                        <>
                            <Link url={`users/${userId}/${username}`} className={theme}>
                                {' '}
                                Profile{' '}
                            </Link>

                            <Button
                                type="button"
                                size="small"
                                uncontrolled={false}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </>
                    );
                }

                return (
                    <>
                        <Link url="sign-up" className={theme}>
                            {' '}
                            Sign-up{' '}
                        </Link>
                        <Link url="login" className={theme}>
                            {' '}
                            Login{' '}
                        </Link>
                    </>
                );
            })()}
        </div>
    );
}
