import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../store/session"
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const currUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({})

    if (currUser) return <Navigate to='/' replace={true}></Navigate>

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userInfo = {
            credential,
            password
        };
        return dispatch(login(userInfo))
            .catch(async (res) => {
                const data = await res.json();
                console.log("Response data from await res.json():", data);

                if (data?.errors) {
                    setErrors(data.errors);  // Handle field-specific errors
                } else if (data?.message) {
                    setErrors({ credential: data.message });  // Handle general message
                } else {
                    setErrors({ credential: 'An unexpected error occurred. Please try again.' });
                }
            });
    };

    console.log("Current errors state: ", errors);
    return (
        <>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <label>Provide your email or username: </label>
                <input
                    type="text"
                    value={credential}
                    onChange={e => setCredential(e.target.value)}
                    required
                />
                <label>Password: </label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                {errors.credential && <p>{errors.credential}</p>}
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginFormPage
