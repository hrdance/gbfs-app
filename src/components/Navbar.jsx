import Button from '../components/Button';

const Navbar = ({ onToggleSidebar }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
        <Button
            text='Sidebar'
            onClick={onToggleSidebar}
          />
          <a className="navbar-brand" href="#">GBFS Viewer</a>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;