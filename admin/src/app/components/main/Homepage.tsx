import React from 'react'

//componants de la pages
import Navbar from '../layouts/Navbar'
import Heros from '../layouts/Heros'
import About from '../layouts/About'
import Infos from '../layouts/Infos'
import Footer from '../layouts/Footer'
export default function Homepage() {
  return (
    <div className='w-full h-full'>
      <Navbar/>
      <Heros/>
      <About/>
      <Infos/>
      <Footer/>
    </div>
  )
}
