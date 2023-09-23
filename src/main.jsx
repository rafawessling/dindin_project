import React from 'react';
import ReactDOM from 'react-dom/client';
import MainRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.css';


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <MainRoutes />
        </BrowserRouter>
    </React.StrictMode>
);
