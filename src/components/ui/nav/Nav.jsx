import { useContext } from 'react';
import Link from '../link/Link';
import ThemeContext from '../../../context/themeContext';
import AuthenticateContext from '../../../context/userContext';

export default function NavBar() {
    const { theme } = useContext(ThemeContext);
    const { auth } = useContext(AuthenticateContext);

    return (
        <div className={`${theme}`}>
            {(() => {
                if (auth) {
                    return (
                        <>
                            <Link url="profile" className={theme}>
                                {' '}
                                Profile{' '}
                            </Link>
                            <Link url="logout" className={theme}>
                                {' '}
                                Logout{' '}
                            </Link>
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
