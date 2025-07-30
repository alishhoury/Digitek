import Input from "../../../Input";
import Button from "../../../Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignUpForm = ({ toggle }) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleRegister = async () => {
        try {
        const response = await axios.post("http://127.0.0.1:8000/api/v0.1/auth/register", {
            username,
            email,
            password,
        });
        const user = response.data.payload.user;

        if (!user) {
            setErrorMessage("You are Not able to register.");
            return;
        }
        setErrorMessage("");

        localStorage.setItem("user", user);
        navigate("/UserPage");

        } catch (error) {
            const message = error.response?.data?.message || "Registration failed. Please check your inputs.";
            setErrorMessage(message);
        }
    };

    return (
        <div className="register-body">
        <div className="register-container">
            <h1 className="register-h1">
            <Button
                text={"←"}
                onClickListener={() => {
                    navigate("/");
                }}
                className="left-button"
            />
            &nbsp;&nbsp;&nbsp;
            <span>First Time Here!</span>
            </h1>

            <form className="register-form" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label htmlFor="name" className="register-label">Name</label>
                    <Input
                        type={"text"}
                        name={"name"}
                        hint={"Example"}
                        required={true}
                        className="register-form-input"
                        onChangeListener={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="email" className="register-label">Email</label>
                    <Input
                        type={"text"}
                        name={"email"}
                        hint={"email@example.com"}
                        required={true}
                        className="register-form-input"
                        onChangeListener={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password" className="register-label">Password</label>
                    <Input
                        type={"password"}
                        name={"password"}
                        hint={"************"}
                        required={true}
                        className="register-form-input"
                        onChangeListener={(e) => setPassword(e.target.value)}
                    />
                </div>

                <Button
                    text={"Signup"}
                    className="register-button"
                    onClickListener={handleRegister}
                />

                {errorMessage && ( <p className="register-error">{errorMessage}</p> )}
            </form>

            <p className="login-link">
                Already have an account?
                <span className="login-link-span" onClick={toggle}>
                    {" "}Login Here
                </span>
            </p>
        </div>
    </div>
  );
};

export default SignUpForm;