import bike from '../assets/bike.svg';
import electric from '../assets/electric.svg';
import phone from '../assets/phone.svg';
import '../App.css';

const StationPopup = ({ station }) => {
  return (
    <div>
      <ul className="list-group" style={{ borderRadius: '12px' }}>
        <li className="list-group-item d-flex justify-content-center align-items-center border-bottom" style={{ border: 'none' }}>
          <b>{station.name}</b>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center border-bottom" style={{ border: 'none' }}>
          <span className="d-flex text-start pe-2">Capacity</span>
          <span className="d-flex align-items-center border-start px-3 pe-0">
            <b>{station.capacity}</b>
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center border-bottom" style={{ border: 'none' }}>
          <span className="text-start pe-2">Docks available</span>
          <span className="d-flex align-items-center border-start px-3 pe-0">
            <b>{station.num_docks_available}</b>
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-center align-items-center border-bottom" style={{ border: 'none' }}>
          <b>Bikes available</b>
        </li>
        <li className="list-group-item d-flex border-bottom" style={{ border: 'none' }}>
          <span className="d-flex flex-grow-1 justify-content-center align-items-center border-end ps-0 px-2">
            <b>{station.beryl_bike}</b>
          </span>
          <span className="d-flex flex-grow-1 justify-content-center align-items-center border-end px-2">
            <img src={bike} height={20} width={20} alt="Beryl bike" />
          </span>
          <span className="d-flex flex-grow-1 justify-content-center align-items-center border-end px-2">
            <img src={electric} height={20} width={20} alt="Electric bike" />
          </span>
          <span className="d-flex flex-grow-1 justify-content-center align-items-center pe-0 px-2">
            <b>{station.bbe}</b>
          </span>
        </li>
        <li className="list-group-item custom-list-group-item align-items-center" style={{ border: 'none' }}>
          <a
            href={station.rental_uris.android}
            className="d-flex justify-content-center align-items-center text-decoration-none"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <img src={phone} height={20} width={20} alt="Hire" />
              <b className="px-2" style={{ color: 'black' }}>Hire</b>
              </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default StationPopup;
