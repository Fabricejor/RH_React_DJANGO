import React from 'react'
import "../../globals.css"

export default function ConnexionForm() {
  return (
    <div className='flex h-screen bg-blue-50'>
      {/* Conteneur gauche : Formulaire */}
      <div className='w-1/2 bg-white flex flex-col justify-between p-10 shadow-lg'>
        <div>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center space-x-4'>
              <img src="favicon.png" alt="logo-gtp"  />
              <span className='text-sm font-semibold text-[#03346E]'>GTP</span>
              <span className='text-sm font-semibold text-[#03346E]'>RH APP</span>
            </div>
          </div>
          <h1 className='text-2xl font-bold text-[#03346E] mb-2'>
            Gainde Talent Provider Login page
          </h1>
          <p className='text-gray-500 mb-8'>A human resources app</p>

          {/* Formulaire */}
          <form className='space-y-6'>
            <input
              type='email'
              placeholder='email'
              className='w-full p-4 border border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
            />
            <input
              type='password'
              placeholder='Password'
              className='w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
            />
          </form>

          <button className='mt-6 w-full bg-yellow-500 text-white py-4 rounded-lg hover:bg-yellow-600'>
            CONNEXION
          </button>
        </div>
        <p className='text-sm text-gray-500 mt-6'>
          By clicking, you confirm that you agree with our terms & conditions.
        </p>
      </div>

      {/* Conteneur droit : Image avec fond graphique */}
      <div
        className='right-form-container w-1/2 flex items-center justify-center relative'
      >
        <div className='relative text-center'>
          <blockquote className='italic text-white mt-8'>
            "Le succès ne vient pas par accident. C'est du travail intense, de
            la persévérance, de l'apprentissage, de l'étude, du sacrifice et,
            plus que tout, de la passion pour ce que vous faites ou ce que vous
            êtes en train d'apprendre."
          </blockquote>
          <blockquote className='italic text-white mt-8'>Pelé</blockquote>
        </div>
      </div>
    </div>
  )
}
