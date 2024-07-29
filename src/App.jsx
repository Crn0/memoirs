import { useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import ThemeContext from './context/themeContext';
import UserContextContext from './context/userContext';
import Header from './components/ui/header';
import Footer from './components/ui/footer/footer';

function App() {
    const userData = useLoaderData();
    const [user, setUser] = useState(userData?.user || null);
    const [theme, setTheme] = useState('dark');

    return (
        <>
            <ThemeContext.Provider value={{ theme, setTheme }}>
                <UserContextContext.Provider value={{ user, setUser }}>
                    <Header />

                    <main className={`${theme}`}>
                        <Outlet />
                    </main>

                    <Footer />
                </UserContextContext.Provider>
            </ThemeContext.Provider>
        </>
    );
}

export default App;
