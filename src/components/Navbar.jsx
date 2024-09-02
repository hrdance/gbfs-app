import IconButton from './IconButton';
import menuIcon from '../assets/menu.svg';

const Navbar = ({ onToggleSidebar }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <IconButton
            color={'light'}
            altText={'Toggle Sidebar'}
            imageSrc={menuIcon}
            onClick={onToggleSidebar}
          />
          <h1 className='navbar-brand'>GBFS Viewer</h1>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;