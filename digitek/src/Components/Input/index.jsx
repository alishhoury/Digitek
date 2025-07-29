const Input = ({ type, name, value, hint, required, className, onChangeListener }) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            placeholder={hint}
            required={required}
            className={className}
            onChange={onChangeListener}
        />
    );
};

export default Input;