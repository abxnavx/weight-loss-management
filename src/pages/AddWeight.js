import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function AddWeight() {
    const [weight, setWeight] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        setMessage('');
        setIsError(false);

        // Get the logged-in user
        const loggedInUser = JSON.parse(
            localStorage.getItem('loggedInUser') || 'null'
        );

        if (!loggedInUser) {
            setMessage('Please log in before adding your weight.');
            setIsError(true);
            return;
        }

        // Validate the entered weight
        const enteredWeight = Number(weight);

        if (
            weight.trim() === '' ||
            !Number.isFinite(enteredWeight) ||
            enteredWeight <= 0
        ) {
            setMessage('Please enter a valid weight.');
            setIsError(true);
            return;
        }

        // Get the current date and time
        const now = new Date();

        const today =
            now.getFullYear() +
            '-' +
            String(now.getMonth() + 1).padStart(2, '0') +
            '-' +
            String(now.getDate()).padStart(2, '0');

        // Create storage specific to this user
        const storageKey = `weights_${loggedInUser.email}`;

        // Get this user's existing weight records
        const savedWeights = JSON.parse(
            localStorage.getItem(storageKey) || '[]'
        );

        // Prevent duplicate weight entries for today
        const alreadyAdded = savedWeights.some(
            (item) => item.date === today
        );

        if (alreadyAdded) {
            setMessage("You have already added today's weight.");
            setIsError(true);
            return;
        }

        // Create a new weight record
        const weightRecord = {
            id: Date.now(),
            weight: enteredWeight,
            date: today,
            addedTime: now.toLocaleTimeString()
        };

        // Add the new record to the existing records
        const updatedWeights = [
            ...savedWeights,
            weightRecord
        ];

        // Save the records for this user
        localStorage.setItem(
            storageKey,
            JSON.stringify(updatedWeights)
        );

        // Clear the input and display success
        setWeight('');
        setMessage('Weight added successfully!');
    }

    return (
        <div className="add-weight-container">
            <form
                className="signup-form"
                onSubmit={handleSubmit}
            >
                <h2>Add Today's Weight</h2>

                <label>Weight (kg)</label>

                <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    placeholder="Enter your weight"
                    value={weight}
                    onChange={(event) => setWeight(event.target.value)}
                    required
                />

                <p>
                    Date: {new Date().toLocaleDateString()}
                </p>

                <p>
                    Time: {new Date().toLocaleTimeString()}
                </p>

                <button type="submit">
                    Save Weight
                </button>

                {message && (
                    <p
                        className={isError ? 'error-message' : ''}
                        style={{ color: isError ? '#dc3545' : '#198754' }}
                    >
                        {message}
                    </p>
                )}

                <p>
                    <Link to="/weights">View Weight History</Link>
                </p>

                <p>
                    <Link to="/dashboard">Back to Dashboard</Link>
                </p>
            </form>
        </div>
    );
}

export default AddWeight;