import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../store/session"

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userInfo = {
            credential,
            password
        };
        return dispatch(login(userInfo)).catch(
            async (res) => {
                const data = await res.json();
                console.log("Response data from await res.json():", data);
                if (data?.errors) {
                    setErrors(data.errors);
                } else if (data?.message) {
                    setErrors({ credential: data.message });
                }
            }
        );
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
                    type="text"
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
