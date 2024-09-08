import mapIcon from '../assets/map.svg';

const Dropdown = ({ altText, color, dropdownVisible, onToggleDropdown, selectedLocation, locations, onSelectLocation, onReframe }) => {
  return (
    <div className="dropdown">
      <button
        className={"dropdown-toggle justify-content-center align-items-center btn btn-" + color}
        data-bs-toggle="dropdown"
        onClick={onToggleDropdown}
        aria-expanded={dropdownVisible}
      >
        <img src={mapIcon} alt={altText} style={{ width: '24px', height: '24px', marginRight: '8px' }} />
        {selectedLocation.name}
      </button>
      <div className={`dropdown-menu ${dropdownVisible ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
        {locations.map((location) => (
          <a
            key={location.id}
            className="dropdown-item"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelectLocation(location);
              onReframe(location.lat, location.lon, 13)
            }}
          >
            {location.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;

