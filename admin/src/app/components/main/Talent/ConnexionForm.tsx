'use client'
import React from 'react'
import "../../../globals.css"
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export default function ConnexionForm() {
  
  const router = useRouter()
 
  const redirection = () => {
    router.push("/talent/Upload_Resume")
  }

  // const goToSignUp = () => {
  //   router.push("/Register")
  // }

  return (
    <div className='flex min-h-screen bg-blue-50'>
      {/* Conteneur gauche : Formulaire */}
      <div className='w-1/2 bg-white flex flex-col justify-between p-6 shadow-lg'>
        <div>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center space-x-4 justify-start w-full'>
              <img src="/LOGO_UJUZAI_HD.png" alt="logo-gtp"  className='w-36 h-auto' />
            </div>
          </div>
          <h1 className='text-2xl font-bold text-[#03346E] mb-2'>
            UjuzAI Page de connexion
          </h1>
          <p className='text-gray-500 mb-8'>Une application de ressources humaines par Gainde Talent Provider</p>

          {/* Formulaire */}
          <form className='space-y-6'>
            <input
              type='email'
              placeholder='email'
              className='w-full p-2 border border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
            />
            <input
              type='password'
              placeholder='Password'
              className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
            />
          </form>

          <button type='submit' className='mt-3 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600' onClick={redirection}>
            CONNEXION
          </button>
          <p className='text-sm text-gray-500 mt-3'>
            En cliquant  <Link href={'/Register'} className='text-blue-500 cursor-pointer' >ici</Link> vous acceptez nos conditions d'utilisations.
          </p>
          <p className='text-sm text-gray-500 mt-6'>
            Pas encore inscrit? <Link href={'/Register'} className='text-blue-500 cursor-pointer' >s'inscrire</Link>
          </p>
        </div>
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
