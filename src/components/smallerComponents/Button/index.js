import "./Button.css";

const Button = (props) => {
  return (
    <button className={"Button " + props.className} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button;