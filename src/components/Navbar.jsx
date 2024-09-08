import IconButton from './IconButton';
import IconTextButton from './IconTextButton';
import Dropdown from './Dropdown';
import menuIcon from '../assets/menu.svg';
import refreshIcon from '../assets/refresh.svg';
import branchIcon from '../assets/branch.svg';
import centreIcon from '../assets/centre.svg';
import reframeIcon from '../assets/reframe.svg';

const Navbar = ({ onToggleSidebar, onCentreView, onReframe, onRefresh, locations, onSelectLocation, selectedLocation }) => {

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
              onClick={() => onReframe(selectedLocation.lat, selectedLocation.lon, selectedLocation.zoom)}
            />
            <IconButton
              color={'light'}
              altText={'Refresh'}
              imageSrc={refreshIcon}
              onClick={onRefresh}
            />
            <h1 className='navbar-brand custom-navbar-brand'>Beryl Bikes Viewer</h1>
          </div>
          <div className="d-flex align-items-center">
          <Dropdown
              altText={'Choose location'}
              color={'light'}
              locations={locations}
              onSelectLocation={onSelectLocation}
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