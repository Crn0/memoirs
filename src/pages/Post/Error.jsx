import { useAsyncError } from 'react-router-dom';
import style from './css/error.module.css';

export default function PostError() {
    const error = useAsyncError();
    
    return (
        <div className={`${style.error}`}>
            <h1 className="error__code">{error?.httpCode || error?.code}</h1>
            <p className="error__message">{error?.message}</p>
        </div>
    );
}
