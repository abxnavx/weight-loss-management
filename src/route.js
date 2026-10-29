import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddWeight from './pages/AddWeight';
import WeightHistory from './pages/WeightHistory';

import ProtectedRoute from './components/ProtectedRoute';

// Redirect logged-in users away from Login and Signup
function PublicOnlyRoute({ children }) {
    let loggedInUser = null;

    try {
        loggedInUser = JSON.parse(
            localStorage.getItem('loggedInUser') || 'null'
        );
    } catch (error) {
        localStorage.removeItem('loggedInUser');
    }

    if (loggedInUser && loggedInUser.email) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public home page */}
                <Route path="/" element={<Home />} />

                {/* Signup page */}
                <Route
                    path="/signup"
                    element={
                        <PublicOnlyRoute>
                            <Signup />
                        </PublicOnlyRoute>
                    }
                />

                {/* Login page */}
                <Route
                    path="/login"
                    element={
                        <PublicOnlyRoute>
                            <Login />
                        </PublicOnlyRoute>
                    }
                />

                {/* Protected dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Protected Add Weight page */}
                <Route
                    path="/add-weight"
                    element={
                        <ProtectedRoute>
                            <AddWeight />
                        </ProtectedRoute>
                    }
                />

                {/* Protected Weight History page */}
                <Route
                    path="/weights"
                    element={
                        <ProtectedRoute>
                            <WeightHistory />
                        </ProtectedRoute>
                    }
                />

                {/* Unknown URLs return to Home */}
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;