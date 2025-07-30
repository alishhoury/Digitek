import "./style.css";
import { useState } from "react";
import LoginForm from "../../Components/Content/Auth/Login";
import SignUpForm from "../../Components/Content/Auth/Register";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    
    const switchForm = () => {
        setIsLogin(!isLogin);
    };
    
    return (
        <div className="auth-page">
            <div className="auth-box">
                {isLogin ? (
                    <LoginForm toggle={switchForm}/>
                ) : (
                    <SignUpForm toggle={switchForm}/>
                )}
            </div>
        </div>
    );
};

export default Auth;