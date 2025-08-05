import "./style.css";
import Button from "../../../Components/Button";
import { useNavigate } from "react-router-dom";
const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="unauthorized-page">
      <div className="unauth-label">
        <Button
          text={"←"}
          onClickListener={() => navigate("/home")}
          className="left-button"
        />
        <h1>403 - Unauthorized</h1>
      </div>
    </div>
  );
};

export default Unauthorized;
