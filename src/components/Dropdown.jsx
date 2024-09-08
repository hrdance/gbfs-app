import mapIcon from '../assets/map.svg';

const Dropdown = ({
  altText,
  color,
  selectedLocation,
  locations,
  onSelectLocation,
}) => {
  return (
    <div className="dropdown">
      <button
        className={"dropdown-toggle justify-content-center align-items-center btn btn-" + color}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src={mapIcon}
          alt={altText}
          style={{ width: '24px', height: '24px', marginRight: '8px' }}
        />
        {selectedLocation.name}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {locations.map((location) => (
          <li key={location.id}>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectLocation(location);
              }}
            >
              {location.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
