import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router'
import Footer from './components/Footer'

const Layout = () => {
  return (
    <>
    <Header/>
     <div id='wrapper'>
        <Outlet/>
     </div>
    <Footer/>
    </>
  )
}

export default Layout