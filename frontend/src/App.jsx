import React from 'react'
import { Routes, Route,Outlet } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Login from './pages/Login'
import Placeorder from './pages/Placeorder'
import Orders from './pages/Order'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import ChatBot from './components/ChatBot'


const AppLayout = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />

      <Outlet />

      <ChatBot />
      <Footer />
    </div>
  )
}

const App = () => {

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/Pickles' element={<Collection />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Product/:ProductId' element={<Product />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Placeorder' element={<Placeorder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/verify' element={<Verify />} />
      </Route>
    </Routes>

  )
}


export default App
