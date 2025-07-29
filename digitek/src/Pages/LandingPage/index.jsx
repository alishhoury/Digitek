import "./style.css";
import Button from "../../Components/Button";
import landingImg from "../../assets/TechImg.jpeg";
import Footer from "../../Components/Footer";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <body className="landing-body">
            <main className="landing-main">
                <section className="landing-section">
                    <div className="landing-text">
                        <h1 className="landing-title">
                            Power Your Everyday With Smart Accessories
                        </h1>
                        <h3 className="landing-subtitle">
                            Discover what truly matters with personalized choices and a seamless, fulfilling shopping experience.
                        </h3>
                    </div>
                    <div className="landing-buttons">
                        <Button
                            text={"Shop Now"}
                            className="landing-btn-primary"
                            onClickListener={() => {
                                navigate("/home");
                            }}
                        />
                        <Button
                            text={"Login"}
                            className="landing-btn-secondary"
                            onClickListener={() => {
                                navigate("/auth");
                            }}
                        />
                    </div>
                </section>

                <aside className="landing-aside">
                    <img src={landingImg} alt="Landing Image" className="landing-image"/>
                </aside>
            </main>
            <Footer />
        </body>
    );
};

export default LandingPage;