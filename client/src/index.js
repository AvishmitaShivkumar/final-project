import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { UserProvider } from './components/UserContext';
import { TimerProvider } from './components/TimerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
        <TimerProvider>
            <App />
        </TimerProvider>
    </UserProvider>
);

