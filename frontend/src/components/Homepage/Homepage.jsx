import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';

function Homepage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const handleLogout = () => {
        dispatch(sessionActions.logout());
    };

    return (
        <div className="homepage">
            <h1>Welcome to Urban Hideaway!</h1>

            {sessionUser ? (
                <div className="logged-in">
                    <h2>Hello, {sessionUser.firstName}!</h2>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            ) : (
                <div className="logged-out">
                    <p>Please log in or sign up to continue.</p>
                    <div className="auth-buttons">
                        <Link to="/login">
                            <button className="login-button">Login</button>
                        </Link>
                        <Link to="/signup">
                            <button className="signup-button">Sign Up</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Homepage;
