import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {pathname} = location;
 
  let showLogout = false;
  if (pathname.startsWith("/subjects/") ||pathname.startsWith("/std_sub/")||pathname.startsWith("/subjects/")||pathname.startsWith("/questions/")||pathname.startsWith("/getMarks/"))  {
    showLogout = true;
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar mb-5">
      <div className="navbar-header">
        <h1 className='text-xl'>Navbar</h1>
      </div>
      <div className="navbar-logout">
        {showLogout&&<button onClick={handleLogout}>Logout</button>}
      </div>
     
    </nav>
  );
};

export default Navbar;
