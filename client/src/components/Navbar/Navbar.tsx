import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
   return (
      <div>
         <div className="container-fluid">
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
         </div>
      </div>
   )
}

export default Navbar;