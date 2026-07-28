import { useState } from "react";
import { loginUser } from "../api/auth";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser({
                username,
                password,
            });

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);

            alert("Login Successful!");
        } catch (error) {
            alert("Invalid Username or Password");
        }
    };

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;