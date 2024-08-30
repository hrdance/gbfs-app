/*const Alert = ({ children }) => {
  return (
    <div className="alert alert-primary">{children}</div>
  )
}*/

const Alert = ({ text, onClose }) => {
  return (
    <div className="alert alert-primary alert-dismissible fade show" role="alert">
      {text}
      <button type="button" className="btn-close" onClick={onClose} data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  )
}

export default Alert;