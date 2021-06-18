import "./Input.css";

const Input = (props) => {
  return (
    <div className="Input">
      <label htmlFor={props.name}>{props.label}</label>
      <input 
        type={props.type}
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        maxLength={props.maxLength}
        minLength={props.minLength}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        required={props.required}
      />
    </div>
  );
};

export default Input;