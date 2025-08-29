import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/authSlice/authSlice';

const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const user = useAppSelector((state) => state.auth.user);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleLogout = () => {
      dispatch(logout());
      navigate('/login');
      setIsOpen(false);
   };

   return (
      <div className='navbar'>
         {/* <div className="container-fluid">
            <div className="row" style={{ backgroundColor: '#f8f9fa' , justifyContent: 'space-between', alignItems: 'center', padding: '10px 0'}}>
               <div className="col-2">
                  <Link className="navbar-brand" to="/">
                     <img src="/memoryLogo.png" alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>
                     Memories
                  </Link>
               </div>
               <div className="col-8">
                  <ul className="nav justify-content-center">
                     <li className="nav-item">
                        <Link className="nav-link icon-link icon-link-hover" to="/landingpage" style={{ '--bs-icon-link-transform': 'translate3d(0, -.125rem, 0)' } as React.CSSProperties}><i className="bi bi-house-door"></i>Home</Link>
                     </li>
                     <li className="nav-item">
                        <Link className="nav-link icon-link icon-link-hover" to="/albums" style={{ '--bs-icon-link-transform': 'translate3d(0, -.125rem, 0)' } as React.CSSProperties}><i className="bi bi-folder"></i>Albums</Link>
                     </li>
                     <li className="nav-item">
                        <Link className="nav-link icon-link icon-link-hover" to="/timeline" style={{ '--bs-icon-link-transform': 'translate3d(0, -.125rem, 0)' } as React.CSSProperties}><i className="bi bi-clock"></i>Timeline</Link>
                     </li>
                     <li className="nav-item">
                        <Link className="nav-link icon-link icon-link-hover" aria-current="page" to="/active" style={{ '--bs-icon-link-transform': 'translate3d(0, -.125rem, 0)' } as React.CSSProperties}><i className="bi bi-search"></i>Active</Link>
                     </li>
                     <li className="nav-item">
                        <Link className="nav-link icon-link icon-link-hover" to="/profile" style={{ '--bs-icon-link-transform': 'translate3d(0, -.125rem, 0)' } as React.CSSProperties}><i className="bi bi-person"></i>Profile</Link>
                     </li>
                  </ul>
               </div>
               <div className="col-2" style={{justifyContent: 'flex-end', display: 'flex'}}>
                  <button className="btn btn-primary" style={{borderRadius: '10px', padding: '5px 20px'}}><i className="bi bi-camera" style={{paddingRight: '5px'}}></i> Upload</button>
               </div>
            </div>
         </div> */}
         <div className="navbar-container">
            <div className="row" style={{ backgroundColor: '#f8f9fa' , justifyContent: 'space-between', alignItems: 'center', padding: '10px 0'}}>
               <div className="col-2">
                  <Link className="navbar-brand logo" to="/">
                     <img src="/memoryLogo.png" alt="Logo-image" width="30" height="24" className="d-inline-block align-text-top"/>
                     Memories
                  </Link>
               </div>
               <div className="col-2" style={{justifyContent: 'flex-end', display: 'flex'}}>
                  <button className="btn btn-primary menu-toggle" style={{borderRadius: '10px', padding: '5px 20px'}}><i className="bi bi-camera" style={{paddingRight: '5px'}} onClick={() => setIsOpen(!isOpen)} aria-label='Toggle-menu'></i> Upload
                  <span className='bar' />
                  <span className='bar' />
                  <span className='bar' />
                  </button>
                  <div className={`menu ${isOpen ? 'open' : ''}`}>
                     {user && (
                        <>
                           <Link to="/create" className="menu-item" onClick={() => setIsOpen(false)}>Create a Blog</Link>
                           <Link to="/dashboard" className="menu-item" onClick={() => setIsOpen(false)}>My Blogs</Link>
                        </>
                     )}
                     {user ? (
                        <button className="menu-item logout-button" onClick={handleLogout}>Logout</button>
                     ) : (
                        <>
                           <Link to="/" className="menu-item" onClick={() => setIsOpen(false)}>Home</Link>
                           <Link to="/about" className="menu-item" onClick={() => setIsOpen(false)}>About</Link>
                           <Link to="/contact" className="menu-item" onClick={() => setIsOpen(false)}>Contact Us</Link>
                           <Link to="/login" className="menu-item" onClick={() => setIsOpen(false)}>Login</Link>
                           <Link to="/register" className="menu-item" onClick={() => setIsOpen(false)}>Register</Link>
                        </>
                     ) : (
                        <>
                           <span className='menu-item'>Hi, {user?.name}</span>
                           <span className='menu-item' onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>
                        </>
                     )};
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Navbar;