 import React, { useState } from 'react'
import Navbar from './pages/Navbar/Navbar'
import{Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlacedOrder from './pages/PlacedOrder/PlacedOrder'
import Footer from './pages/Footer/Footer'
import LoginPopup from './pages/LoginPopup/LoginPopup'
 const App = () => {
  const[showLogin,setShowLogin]=useState(false);
   return (
      <>
      {showLogin ?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
        <div className='app'>
          <Navbar setShowLogin={setShowLogin}/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/order' element={<PlacedOrder/>}/>
          </Routes>
          <Footer/>
      </div>
      </>
   )
 }
 
 export default App