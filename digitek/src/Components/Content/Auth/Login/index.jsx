import Input from "../../../Input";
import Button from "../../../Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../services/axios";

const LoginForm = ({ toggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const user = response.data.payload;
      console.log(user);
      if (!user) {
        setErrorMessage("You are not able to login.");
        return;
      }

      setErrorMessage("");
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/home");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setErrorMessage(message);
    }
  };
  return (
    <div className="login-body">
      <div className="login-container">
        <h1 className="login-h1">
          <Button
            text={"←"}
            onClickListener={() => navigate("/")}
            className="left-button"
          />
          &nbsp;&nbsp;&nbsp;
          <span>Welcome Back!</span>
        </h1>

        <form className="login-form" onSubmit={e => e.preventDefault()}>
          <div>
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <Input
              type="text"
              name="email"
              hint="email@example.com"
              required={true}
              className="login-form-input"
              onChangeListener={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <Input
              type="password"
              name="password"
              hint="************"
              required={true}
              className="login-form-input"
              onChangeListener={e => setPassword(e.target.value)}
            />
          </div>

          <Button
            text="Login"
            onClickListener={handleLogin}
            className="login-button"
          />

          {errorMessage && <p className="login-error">{errorMessage}</p>}
        </form>

        <p className="register-link">
          Don't have an account?
          <span className="register-link-span" onClick={toggle}>
            {" "}
            Register Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
