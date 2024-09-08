import centre from '../assets/centre.svg';

const LocationPopup = () => {
  return (
    <div className='d-flex justify-content-center align-items-center p-2'>
      <span className='px-2'>
        <img src={centre} height={20} width={20} alt="You are here" />
      </span>
      <span className='pe-2'>
      <b>You are here</b>
      </span>
    </div>
  );
};

export default LocationPopup;