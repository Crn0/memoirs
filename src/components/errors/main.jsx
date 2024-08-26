import { useContext } from 'react';
import { useRouteError } from 'react-router-dom';
import Link from '../ui/link/Link';
import ThemeContext from '../../context/themeContext';
import rickRoll from '../../assets/rick-roll.gif';
import style from './css/mainError.module.css';

export default function MainError() {
    const error = useRouteError();
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`${style.error}`} style={{backgroundImage: `url(${rickRoll})`}}>
            <h2>Oops</h2>
            <p>Sorry, you just got rick rolled :P</p>
            <Link url="/">Home</Link>
        </div>
    );
}
