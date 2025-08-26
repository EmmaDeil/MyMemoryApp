import React from 'react'

const LandingPage = () => {
   return (
      <div>
         <p style={{ textAlign: 'center', marginTop: '50px', border: '1px solid #ccc', padding: '5px 10px', borderRadius: '50px', width: '20%', margin: '25px auto', color: '#1E90FF', backgroundColor: '#B0C4DE' }}><i className="bi bi-camera"></i> Your Digital Memory Album</p>
         <h1 style={{ textAlign: 'center', marginTop: '-10px', fontSize: '3.5rem', fontWeight: 'bold' }}>Preserve Your</h1>
         <h1 style={{ textAlign: 'center', marginTop: '-5px', fontSize: '4rem', fontWeight: 'bold', background: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Beautiful Memories</h1>
         <p style={{ textAlign: 'center', marginTop: '20px', width: '30%', margin: '0 auto' }}>Store, organize, and relive your most precious memories with our beautiful, intuitive platform designed for storytelling.</p>
         <div className='button-container' style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', alignItems: 'center', width: '38%', margin: '0 auto', justifyContent: 'center' }}>
            <button style={{ margin: '0 auto', marginTop: '10px', padding: '10px 20px', fontSize: '1.2rem', borderRadius: '15px', border: 'none', backgroundColor: '#6495ED', color: 'white', cursor: 'pointer' }}><i className="bi bi-plus"></i> Add Your First Memory</button>
            <button className='btn btn-outline-secondary' style={{ margin: '0 auto', marginTop: '10px', padding: '10px 20px', fontSize: '1.2rem', borderRadius: '15px', backgroundColor: 'white', color: '#295F98', cursor: 'pointer' }}><i className="bi bi-info-circle"></i> View Timeline</button>
         </div>
         <div className='container'>
            <div className="row" style={{marginTop: '50px'}}>
               <div className="col">
                  <h5 style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Recent Memories</h5>
                  <p style={{ marginTop: '-10px', fontWeight: 'lighter', color: '#666' }}>Your latest captured moments</p>
               </div>
               <div className="col" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '15px' }}>
                  <i className="bi bi-grid-3x3-gap"></i> <span style={{ marginLeft: '-4px' }}></span>
                  <i className="bi bi-grid-1x2"></i> <span style={{ marginLeft: '-5px' }}></span>
               </div>
            </div>
            <div>
               <div className="row">
                  <div className="col-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '10px', marginTop: '5px' }}>
                     
                     
                     
                     
                  </div>
               </div>

               <div className="container-fluid">
                  <div className="row">
                     <div className="col-6 col-md-3">
                        <div className='card' style={{borderRadius: '10px'}}>
                        <img src="coffee.png" alt="Memory 1" style={{ width: '100%', height: '250px', borderRadius: '10px 10px 0 0' }} className='card-img-top' />
                        <div className='card-body'>
                           <h6 className='card-title' style={{margin: '5px 0', fontSize: '1.2rem'}}>Morning Coffee Moments</h6>
                           <div style={{justifyContent: 'space-between', display: 'flex', marginTop: '20px'}}>
                              <p style={{}}><i className="bi bi-calendar"></i> Nov 15, 2024</p>
                              <p style={{marginLeft: '-30px', fontSize: '0.8rem'}}><i className="bi bi-geo-alt"></i> Home</p>
                              <p><i className="bi bi-heart"></i> </p>
                           </div>
                        </div>
                     </div>
                     </div>
                     <div className="col-6 col-md-3">
                        <div className='card' style={{width: '310px', borderRadius: '10px'}}>
                           <img src="sunset.png" alt="Memory 2" style={{ width: '100%', height: '250px', borderRadius: '10px 10px 0 0' }} className='card-img-top' />
                           <div className='card-body'>
                              <h6 className='card-title' style={{margin: '5px 0', fontSize: '1.2rem'}}>Sunset Beach Work</h6>
                              <div style={{justifyContent: 'space-between', display: 'flex', marginTop: '20px'}}>
                              <p style={{}}><i className="bi bi-calendar"></i> Nov 10, 2024</p>
                              <p style={{marginLeft: '5px', fontSize: '0.8rem'}}><i className="bi bi-geo-alt"></i> Malibu Beach</p>
                              <p><i className="bi bi-heart"></i> </p>
                           </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-6 col-md-3">
                        <div className='card' style={{borderRadius: '10px'}}>
                           <img src="loveletters.png" alt="Memory 3" style={{ width: '100%', height: '250px', borderRadius: '10px 10px 0 0' }} className='card-img-top' />
                           <div className='card-body'>
                              <h6 className='card-title' style={{margin: '5px 0', fontSize: '1.2rem'}}>Love Letters Collections</h6>
                              <div style={{justifyContent: 'space-between', display: 'flex', marginTop: '20px'}}>
                              <p><i className="bi bi-calendar"></i> Nov 8, 2024</p>
                              <p><i className="bi bi-heart"></i> </p>
                           </div>
                           </div>
                     </div>
                     </div>
                     <div className="col-6 col-md-3">
                        <div className='card' style={{width: '350px', borderRadius: '10px'}}>
                           <img src="Quiettime.png" alt="Memory 4" style={{ width: '100%', height: '250px', borderRadius: '10px 10px 0 0' }}  className='card-img-top'/>
                        <div className='card-body'>
                           <h6 className='card-title' style={{margin: '5px 0', fontSize: '1.2rem'}}>Quiet Reading Time</h6>
                           <div style={{justifyContent: 'space-between', display: 'flex', marginTop: '20px'}}>
                              <p><i className="bi bi-calendar"></i> Nov 5, 2024</p>
                              <p style={{marginLeft: '-30px', fontSize: '0.8rem'}}><i className="bi bi-geo-alt"></i> Library Corner</p>
                              <p><i className="bi bi-heart"></i> </p>
                           </div>
                        </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className='image-container' style={{ textAlign: 'center', marginTop: '30px' }}>
            <p style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '10px', width: '20%', textAlign: 'center', cursor: 'pointer' }}><i className="bi bi-plus-lg"></i> Add New Memory</p>
         </div>
         <button className='btn btn-primary' style={{borderRadius: '10px', padding: '5px 10px 5px 10px', height: '40px', width: '180px', textAlign: 'center'}}><i className="bi bi-plus-lg"></i> Add New Memory</button>
      </div>



   )
}

export default LandingPage;