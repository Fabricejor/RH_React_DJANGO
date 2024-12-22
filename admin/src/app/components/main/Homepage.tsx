'use client'
import React from 'react'

//componants de la pages
import Navbar from '../layouts/Navbar'
import Heros from '../layouts/Heros'
import About from '../layouts/About'
import Infos from '../layouts/Infos'
import Footer from '../layouts/Footer'
import Modals from '../sub/Modal'
export default function Homepage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const openModal = () => {
    setIsModalOpen(true);
};

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='w-full h-full'>
      <Navbar openModal={openModal} />
      <Heros/>
      <About/>
      <Infos/>
      <Modals isOpen={isModalOpen} closeModal={closeModal} />
      <Footer/>
    </div>
  )
}

