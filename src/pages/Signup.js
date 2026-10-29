import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        // Check whether all fields are filled
        if (
            name.trim() === '' ||
            email.trim() === '' ||
            password === ''
        ) {
            setMessage('Please fill in all fields.');
            return;
        }

        // Check password length
        if (password.length < 6) {
            setMessage(
                'Password must contain at least 6 characters.'
            );
            return;
        }

        // Get existing users from localStorage
        const savedUsers = JSON.parse(
            localStorage.getItem('users') || '[]'
        );

        // Check whether the email is already registered
        const existingUser = savedUsers.find(
            (user) =>
                user.email.toLowerCase() === email.trim().toLowerCase()
        );

        if (existingUser) {
            setMessage('This email is already registered.');
            return;
        }

        // Create a new user
        const newUser = {
            id: Date.now(),
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: password
        };

        // Save the new user
        const updatedUsers = [...savedUsers, newUser];

        localStorage.setItem(
            'users',
            JSON.stringify(updatedUsers)
        );

        setMessage('Account created successfully! Redirecting to login...');

        // Navigate to login after successful signup
        setTimeout(() => {
            navigate('/login');
        }, 1500);
    }

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Create Your Account</h2>

                <label>Name</label>

                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />

                <label>Email</label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />

                <label>Password</label>

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    minLength="6"
                    required
                />

                <button type="submit">
                    Sign Up
                </button>

                {message && <p>{message}</p>}

                <p>
                    Already have an account?{' '}
                    <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;