import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Navbar from './assets/components/Navbar/Navbar'
// import Footer from './assets/components/Footer/Footer' 
import LandingPage from './LandingPage' 


function App() {
  
  return (
    <Router>
      <Navbar />
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  )
}

export default App;
