import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes/router';
import './global-styles/index.css';
import './global-styles/reset.css';
import './global-styles/theme.css';
import './global-styles/buttonTheme.css';
import './global-styles/errorColor.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>
);
