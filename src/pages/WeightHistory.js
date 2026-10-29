import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function WeightHistory() {
    const navigate = useNavigate();

    const loggedInUser = JSON.parse(
        localStorage.getItem('loggedInUser') || 'null'
    );

    const storageKey = loggedInUser
        ? `weights_${loggedInUser.email}`
        : null;

    const [weights, setWeights] = useState(() => {
        if (!storageKey) return [];

        return JSON.parse(
            localStorage.getItem(storageKey) || '[]'
        );
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editWeight, setEditWeight] = useState('');

    const recordsPerPage = 5;

    const sortedWeights = [...weights].sort((a, b) =>
        b.date.localeCompare(a.date)
    );

    const totalPages = Math.max(
        1,
        Math.ceil(sortedWeights.length / recordsPerPage)
    );

    const currentWeights = sortedWeights.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
    );

    // Logout function
    function handleLogout() {
        localStorage.removeItem('loggedInUser');
        navigate('/');
    }

    // Save weight records
    function saveRecords(updatedWeights) {
        setWeights(updatedWeights);

        if (storageKey) {
            localStorage.setItem(
                storageKey,
                JSON.stringify(updatedWeights)
            );
        }
    }

    // Delete a weight record
    function deleteWeight(id) {
        const updatedWeights = weights.filter(
            (item) => item.id !== id
        );

        saveRecords(updatedWeights);

        const updatedTotalPages = Math.max(
            1,
            Math.ceil(updatedWeights.length / recordsPerPage)
        );

        if (currentPage > updatedTotalPages) {
            setCurrentPage(updatedTotalPages);
        }

        if (editingId === id) {
            setEditingId(null);
            setEditWeight('');
        }
    }

    // Start editing a weight record
    function startEditing(item) {
        setEditingId(item.id);
        setEditWeight(String(item.weight));
    }

    // Save an edited weight
    function saveWeight(id) {
        const value = Number(editWeight);

        if (
            editWeight.trim() === '' ||
            !Number.isFinite(value) ||
            value <= 0
        ) {
            alert('Please enter a valid weight.');
            return;
        }

        const updatedWeights = weights.map((item) =>
            item.id === id
                ? { ...item, weight: value }
                : item
        );

        saveRecords(updatedWeights);
        setEditingId(null);
        setEditWeight('');
    }

    // Calculate weight loss or gain between two dates
    function calculateWeightLoss(event) {
        event.preventDefault();

        setError('');
        setResult(null);

        if (!startDate || !endDate) {
            setError('Please select both dates.');
            return;
        }

        if (endDate <= startDate) {
            setError(
                'End date must be after the start date.'
            );
            return;
        }

        const startRecord = weights.find(
            (item) => item.date === startDate
        );

        const endRecord = weights.find(
            (item) => item.date === endDate
        );

        if (!startRecord || !endRecord) {
            setError(
                'No weight record was found for one or both selected dates. Please select dates on which you recorded your weight.'
            );
            return;
        }

        const difference = Number(
            (startRecord.weight - endRecord.weight).toFixed(2)
        );

        setResult({
            startWeight: startRecord.weight,
            endWeight: endRecord.weight,
            difference
        });
    }

    return (
        <div className="history-container">
            {/* Navigation bar */}
            <nav className="navbar">
                <h2>WellTrack</h2>

                <div className="nav-links">
                    <Link to="/dashboard">Dashboard</Link>

                    <Link to="/add-weight">Add Weight</Link>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="history-content">
                <h1>Weight History</h1>

                <p>
                    View, edit, and manage your recorded weights.
                </p>

                {!loggedInUser ? (
                    <p>Please log in to view your weight records.</p>
                ) : weights.length === 0 ? (
                    <p>
                        No weight records found. Add your first weight!
                    </p>
                ) : (
                    <>
                        <table className="weight-table">
                            <thead>
                                <tr>
                                    <th>Weight (kg)</th>
                                    <th>Date</th>
                                    <th>Added Time</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentWeights.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            {editingId === item.id ? (
                                                <input
                                                    type="number"
                                                    min="0.1"
                                                    step="0.1"
                                                    value={editWeight}
                                                    onChange={(event) =>
                                                        setEditWeight(event.target.value)
                                                    }
                                                />
                                            ) : (
                                                item.weight
                                            )}
                                        </td>

                                        <td>{item.date}</td>
                                        <td>{item.addedTime}</td>

                                        <td>
                                            {editingId === item.id ? (
                                                <>
                                                    <button
                                                        className="save-button"
                                                        onClick={() => saveWeight(item.id)}
                                                    >
                                                        Save
                                                    </button>

                                                    <button
                                                        className="cancel-button"
                                                        onClick={() => {
                                                            setEditingId(null);
                                                            setEditWeight('');
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        className="edit-button"
                                                        onClick={() => startEditing(item)}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="delete-button"
                                                        onClick={() => deleteWeight(item.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="pagination">
                            <button
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage((page) => page - 1)
                                }
                            >
                                Previous
                            </button>

                            <span>
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                    setCurrentPage((page) => page + 1)
                                }
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}

                {/* Weight loss calculator */}
                <div className="weight-calculator">
                    <h2>Calculate Weight Loss</h2>

                    <form onSubmit={calculateWeightLoss}>
                        <div>
                            <label htmlFor="startDate">Start Date</label>

                            <input
                                id="startDate"
                                type="date"
                                value={startDate}
                                max={endDate || undefined}
                                onChange={(event) => {
                                    setStartDate(event.target.value);
                                    setError('');
                                    setResult(null);
                                }}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="endDate">End Date</label>

                            <input
                                id="endDate"
                                type="date"
                                value={endDate}
                                min={startDate || undefined}
                                onChange={(event) => {
                                    setEndDate(event.target.value);
                                    setError('');
                                    setResult(null);
                                }}
                                required
                            />
                        </div>

                        <button type="submit">Calculate</button>
                    </form>

                    {error && (
                        <p className="error-message">{error}</p>
                    )}

                    {result && (
                        <div className="calculation-result">
                            <p>
                                Start date weight: {result.startWeight} kg
                            </p>

                            <p>
                                End date weight: {result.endWeight} kg
                            </p>

                            {result.difference > 0 ? (
                                <h3>
                                    Weight lost: {result.difference} kg
                                </h3>
                            ) : result.difference < 0 ? (
                                <h3>
                                    Weight gained: {Math.abs(result.difference)} kg
                                </h3>
                            ) : (
                                <h3>No weight change.</h3>
                            )}
                        </div>
                    )}
                </div>

                <br />

                <Link
                    to="/dashboard"
                    className="dashboard-button"
                >
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}

export default WeightHistory;