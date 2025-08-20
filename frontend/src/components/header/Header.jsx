import { Link } from 'react-router-dom';


const Header = () => {
  return (
   <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">NexusMeet</a>
  </div>
    
  <div className="dropdown dropdown-end">
    <Link to="/login" className="btn">Login</Link>
  </div>
  <div className="dropdown dropdown-end">
    <Link to="/register" className="btn">Register</Link>
  </div>

    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
    </div>

    <div className="dropdown dropdown-end">
    <Link to="/logout" className="btn">Logout</Link>
  </div>

</div>
  )
}

export default Header