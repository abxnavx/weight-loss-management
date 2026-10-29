import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        if (email.trim() === '' || password === '') {
            setMessage('Please enter your email and password.');
            return;
        }

        // Get registered users
        const savedUsers = JSON.parse(
            localStorage.getItem('users') || '[]'
        );

        // Find the user matching the email and password
        const user = savedUsers.find(
            (item) =>
                item.email === email.trim().toLowerCase() &&
                item.password === password
        );

        // Check whether the credentials are correct
        if (!user) {
            setMessage('Invalid email or password.');
            return;
        }

        // Save the logged-in user's session
        const loggedInUser = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        localStorage.setItem(
            'loggedInUser',
            JSON.stringify(loggedInUser)
        );

        // Navigate to the Dashboard
        navigate('/dashboard');
    }

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Login to Your Account</h2>

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
                    required
                />

                <button type="submit">
                    Login
                </button>

                {message && (
                    <p className="error-message">{message}</p>
                )}

                <p>
                    Don't have an account?{' '}
                    <Link to="/signup">Sign up</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;