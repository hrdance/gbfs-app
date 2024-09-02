import IconButton from './IconButton';
import IconTextButton from './IconTextButton';
import menuIcon from '../assets/menu.svg';
import refreshIcon from '../assets/refresh.svg';
import branchIcon from '../assets/branch.svg';

const Navbar = ({ onToggleSidebar }) => {
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
              altText={'Refresh'}
              imageSrc={refreshIcon}
              onClick={() => console.log('Refresh')}
            />
            <h1 className='navbar-brand custom-navbar-brand'>GBFS Viewer</h1>
          </div>
          <div className="d-flex align-items-center">
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