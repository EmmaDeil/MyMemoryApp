import React from 'react'

const Navbar = () => {
   return (
      <div>
         <div className="container-fluid" >
            <div className="row" style={{ backgroundColor: '#f8f9fa' , justifyContent: 'space-between', alignItems: 'center', padding: '10px 0'}}>
               <div className="col">
                  <a className="navbar-brand" href="#">
                     <img src="/memoryLogo.png" alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>
                     Memories
                  </a>
               </div>
               <div className="col">
                  <ul className="nav justify-content-center" style={{gap: '15px'}}>
                     <li className="nav-item">
                        <a className="nav-link" href="#"><i className="bi bi-house-door"></i>Home</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link" href="#"><i className="bi bi-folder"></i>Albums</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link" href="#"><i className="bi bi-clock"></i>Timeline</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#"><i className="bi bi-search"></i>Active</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link" href="#"><i className="bi bi-person"></i>Profile</a>
                     </li>
                  </ul>
               </div>
               <div className="col" style={{justifyContent: 'flex-end', display: 'flex'}}>
                  <button className="btn btn-primary"><i className="bi bi-camera"></i>Upload</button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Navbar;