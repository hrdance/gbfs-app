import React from 'react';

const IconTextButton = ({ onClick, color = 'primary', imageSrc, altText = '', text = '' }) => {
  return (
    <button className={"justify-content-center align-items-center btn btn-" + color} onClick={onClick} style={{ display: 'flex', alignItems: 'center' }}>
      <img src={imageSrc} alt={altText} style={{ width: '24px', height: '24px', marginRight: '8px' }} />
      {text}
    </button>
  );
};

export default IconTextButton;