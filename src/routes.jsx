import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import SingIn from './pages/SignIn/SingIn';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';

function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = true;

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<SingIn />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoutes redirectTo="/" />}>
                <Route path="/home" element={<Home />} />
            </Route>
        </Routes>
    );
}

export default MainRoutes;
