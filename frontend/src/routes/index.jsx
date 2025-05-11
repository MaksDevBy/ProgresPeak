import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {LoginPage} from '../pages/auth/LoginPage';
import {UserPage} from '../pages/user/UserPage';
import {LogoutPage} from '../pages/auth/LogoutPage.jsx'

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/user" element={<UserPage/>}/>
                <Route path="/logout" element={<LogoutPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}