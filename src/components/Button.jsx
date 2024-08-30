const Button = ({ text, onClick, color='primary' }) => {
  return (
    <button className={"btn btn-" + color} onClick={onClick}>{text}</button>
  )
}

export default Button;
