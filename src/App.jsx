import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import ThemeContext from './context/themeContext';
import UserContextContext from './context/userContext';
import Header from './components/ui/header';
import Footer from './components/ui/footer/Footer';
import localStorage from './helpers/storage/localStorage';
import style from './index.module.css';

function App() {
    const userData = useLoaderData();
    const [user, setUser] = useState(userData?.user || null);
    const [theme, setTheme] = useState(localStorage.get('theme') || 'dark');
    const themeMemo = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);
    const userMemo = useMemo(() => ({ user, setUser }), [user, setUser]);

    useEffect(() => {
        document.body.style.backgroundColor =
            theme === 'light' ? '#F5F5F5' : 'black';
    }, [theme]);

    return (
        <div
            className={`${style.app} ${theme === 'dark' ? style.dark : style.light}`}
        >
            <ThemeContext.Provider value={themeMemo}>
                <UserContextContext.Provider value={userMemo}>
                    <Header setTheme={setTheme} />

                    <main className={`${style.main}`}>
                        <Outlet />
                    </main>

                    <Footer />
                </UserContextContext.Provider>
            </ThemeContext.Provider>
        </div>
    );
}

export default App;
