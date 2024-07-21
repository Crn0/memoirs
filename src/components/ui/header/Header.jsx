import { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../../context/themeContext';
import Button from '../button/Button';
import Link from '../link/Link';

export default function Header({ children }) {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <header
            className={`${theme}`}
            style={{ display: 'flex', justifyContent: 'space-around' }}
        >
            <div style={{ display: 'flex' }}>
                <Link url="/" theme={theme}>
                    Memoirs
                </Link>

                <Button
                    type="button"
                    className={theme}
                    size={'small'}
                    onClick={() => {
                        setTheme((mode) =>
                            mode === 'light' ? 'dark' : 'light'
                        );
                    }}
                    uncontrolled={false}
                >
                    {(() => {
                        if (theme == 'light') {
                            return 'light';
                        }

                        return 'dark';
                    })()}
                </Button>
            </div>
            {children}
        </header>
    );
}

Header.propTypes = {
    children: PropTypes.element.isRequired,
};
