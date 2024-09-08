import { useState } from 'react';
import IconButton from './IconButton';
import IconTextButton from './IconTextButton';
import Dropdown from './Dropdown';
import menuIcon from '../assets/menu.svg';
import refreshIcon from '../assets/refresh.svg';
import branchIcon from '../assets/branch.svg';
import centreIcon from '../assets/centre.svg';
import reframeIcon from '../assets/reframe.svg';

const Navbar = ({ onToggleSidebar, onCentreView, onReframe, locations, onSelectLocation, selectedLocation }) => {

  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Toggle dropdown
  const onToggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <IconButton
              color={'light'}
              altText={'Toggle Sidebar'}
              imageSrc={menuIcon}
              onClick={onToggleSidebar}
            />
            <IconButton
              color={'light'}
              altText={'Centre View'}
              imageSrc={centreIcon}
              onClick={onCentreView}
            />
            <IconButton
              color={'light'}
              altText={'Reframe'}
              imageSrc={reframeIcon}
              onClick={() => onReframe(selectedLocation.lat, selectedLocation.lon, 13)}
            />
            <IconButton
              color={'light'}
              altText={'Refresh'}
              imageSrc={refreshIcon}
              onClick={() => console.log('Refresh')}
            />
            <h1 className='navbar-brand custom-navbar-brand'>GBFS Viewer</h1>
          </div>
          <div className="d-flex align-items-center">
          <Dropdown
              altText={'Choose location'}
              color={'light'}
              onToggleDropdown={onToggleDropdown}
              dropdownVisible={dropdownVisible}
              locations={locations}
              onSelectLocation={onSelectLocation}
              onReframe={onReframe(selectedLocation.lat, selectedLocation.lon, 13)}
              selectedLocation={selectedLocation}
            />
            <IconTextButton
              color={'light'}
              text={'Github'}
              altText={'Github'}
              imageSrc={branchIcon}
              onClick={() => window.open('https://github.com/hrdance/gbfs-app', '_blank')}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;