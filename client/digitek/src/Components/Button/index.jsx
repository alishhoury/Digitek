import "./style.css";

const Button = ({
  text,
  onClickListener,
  className = "",
  insiders = null,
  loading = false,
  loadingText = "Loading...",
}) => {
  return (
    <button onClick={onClickListener} className={className} disabled={loading}>
      {insiders}
      {loading ? loadingText : text}
    </button>
  );
};

export default Button;
