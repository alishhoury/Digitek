import './style.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h3>Digitek</h3>
                    <p>Your gateway to cutting-edge gadgets and everyday tech essentials.</p>
                    <p>Empowering your digital lifestyle, one device at a time.</p>
                </div>
                <div className="footer-tagline">
                    <h4>"Innovation starts with the right tools."</h4>
                    <p>Powered by Digitek — where tech meets simplicity.</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Digitek. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;