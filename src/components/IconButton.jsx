const IconButton = ({ onClick, color = 'primary', imageSrc, altText = '' }) => {
  return (
    <button className={"btn btn-" + color} onClick={onClick}>
      <img src={imageSrc} alt={altText} style={{ width: '24px', height: '24px' }} />
    </button>
  );
};

export default IconButton;