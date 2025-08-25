import React from 'react'

const LandingPage = () => {
   return (
      <div>
         <p style={{ textAlign: 'center', marginTop: '50px', border: '1px solid #ccc', padding: '10px', borderRadius: '50px', width: '15%', margin: '25px auto', color: '#6495ED', backgroundColor: 'white' }}><i className="bi bi-camera"></i> Your Digital Memory Album</p>
         <h1 style={{ textAlign: 'center', marginTop: '-10px', fontSize: '3.5rem', fontWeight: 'bold' }}>Preserve Your</h1>
         <h1 style={{ textAlign: 'center', marginTop: '-5px', fontSize: '4rem', fontWeight: 'bold', background: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Beautiful Memories</h1>
         <p style={{ textAlign: 'center', marginTop: '20px', width: '30%', margin: '0 auto' }}>Store, organize, and relive your most precious memories with our beautiful, intuitive platform designed for storytelling.</p>
         <div className='button-container' style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', alignItems: 'center', width: '27%', margin: '0 auto', justifyContent: 'center', gap: '10px' }}>
            <button style={{ margin: '0 auto', marginTop: '10px', padding: '10px 20px', fontSize: '1.2rem', borderRadius: '15px', border: 'none', backgroundColor: '#6495ED', color: 'white', cursor: 'pointer' }}><i className="bi bi-plus"></i> Add Your First Memory</button>
            <button className='btn btn-outline-secondary' style={{ margin: '0 auto', marginTop: '10px', padding: '10px 20px', fontSize: '1.2rem', borderRadius: '15px', backgroundColor: 'white', color: '#295F98', cursor: 'pointer' }}><i className="bi bi-info-circle"></i> View Timeline</button>
         </div>
         <div className='container'>
            <div className="row">
               <div className="col">
                  <h5>Recent Memories</h5>
                  <p>Your latest captured moments</p>
               </div>
               <div className="col" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '15px' }}>
                  <i className="bi bi-grid-3x3-gap"></i> <span style={{ marginLeft: '10px' }}>Grid View</span>
                  <i className="bi bi-grid-1x2"></i> <span style={{ marginLeft: '10px' }}>List View</span>
               </div>
            </div>
           <div>
            <div className="row">
               <div className="col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px', marginTop: '20px' }}>
               <img src="coffee.png" alt="Memory 1" style={{ width: '100%', borderRadius: '10px', height: '250px' }} />
               <img src="sunset.png" alt="Memory 2" style={{ width: '100%', borderRadius: '10px', height: '250px' }} />
               <img src="loveletters.png" alt="Memory 3" style={{ width: '100%', borderRadius: '10px', height: '250px' }} />
               <img src="Quiettime.png" alt="Memory 4" style={{ width: '100%', borderRadius: '10px', height: '250px' }} />
               </div>
            </div>
           </div>
         </div>
         <div className='image-container' style={{ textAlign: 'center', marginTop: '30px' }}>
                  <p style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '10px', width: '20%', textAlign: 'center', cursor: 'pointer' }}><i className="bi bi-plus-lg"></i> Add New Memory</p>
         </div>
      </div>

   )
}

export default LandingPage;