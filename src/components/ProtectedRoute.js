import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    let loggedInUser = null;

    try {
        loggedInUser = JSON.parse(
            localStorage.getItem('loggedInUser') || 'null'
        );
    } catch (error) {
        localStorage.removeItem('loggedInUser');
    }

    if (!loggedInUser || !loggedInUser.email) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;