import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Dashboard() {
    const navigate = useNavigate();

    // Get the logged-in user's information
    const loggedInUser = JSON.parse(
        localStorage.getItem('loggedInUser') || 'null'
    );

    // Get the logged-in user's weight records
    const storageKey = loggedInUser
        ? `weights_${loggedInUser.email}`
        : null;

    const weights = storageKey
        ? JSON.parse(localStorage.getItem(storageKey) || '[]')
        : [];

    // Sort records from newest to oldest
    const sortedWeights = [...weights].sort((a, b) => {
        if (a.date !== b.date) {
            return b.date.localeCompare(a.date);
        }

        return b.id - a.id;
    });

    // Get the most recent weight
    const currentWeight =
        sortedWeights.length > 0
            ? sortedWeights[0].weight
            : null;

    // Get the previous recorded weight
    const previousWeight =
        sortedWeights.length > 1
            ? sortedWeights[1].weight
            : null;

    // Calculate weight change
    const weightChange =
        currentWeight !== null && previousWeight !== null
            ? Number((previousWeight - currentWeight).toFixed(2))
            : null;

    // Logout
    function handleLogout() {
        localStorage.removeItem('loggedInUser');
        navigate('/');
    }

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <h2>Weight Tracker</h2>

                <div className="nav-links">
                    <Link to="/dashboard">Dashboard</Link>

                    <Link to="/weights">Weight History</Link>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="dashboard-content">
                <h1>
                    Welcome, {loggedInUser?.name || 'User'}!
                </h1>

                <p>
                    Track your daily weight and monitor your progress.
                </p>

                <div className="weight-cards">
                    <div className="weight-card">
                        <h3>Current Weight</h3>

                        <p>
                            {currentWeight !== null
                                ? `${currentWeight} kg`
                                : '-- kg'}
                        </p>
                    </div>

                    <div className="weight-card">
                        <h3>Previous Weight</h3>

                        <p>
                            {previousWeight !== null
                                ? `${previousWeight} kg`
                                : '-- kg'}
                        </p>
                    </div>

                    <div className="weight-card">
                        <h3>Change Since Previous Entry</h3>

                        <p>
                            {weightChange === null
                                ? '-- kg'
                                : weightChange > 0
                                    ? `${weightChange} kg lost`
                                    : weightChange < 0
                                        ? `${Math.abs(weightChange)} kg gained`
                                        : 'No change'}
                        </p>
                    </div>
                </div>

                {weights.length === 0 && (
                    <p>
                        You haven't recorded your weight yet.
                        Add your first weight to get started!
                    </p>
                )}

                <div className="dashboard-actions">
                    <Link
                        to="/add-weight"
                        className="dashboard-button"
                    >
                        Add Today's Weight
                    </Link>

                    <Link
                        to="/weights"
                        className="dashboard-button secondary-button"
                    >
                        View Weight History
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;