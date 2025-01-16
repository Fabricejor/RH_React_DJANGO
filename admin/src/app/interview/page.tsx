import React from 'react'
import { IoVideocamOutline ,IoExitOutline } from "react-icons/io5";
import { CiMicrophoneOn } from "react-icons/ci";

export default function pages() {
  return (
    <div className='w-full h-screen flex flex-col  items-center p-4  bg-[#165477]'>
      <h1 className='text-3xl font-bold text-white italic'>interview</h1>
      <div className='w-full h-[75vh] flex flex-row justify-between '>
        <div className=' camera-container w-[50%] '>
          <img src="https://img.freepik.com/photos-gratuite/portrait-femme-entrepreneur-peau-sombre-confiante-regard-serieux-porte-lunettes-rondes-chemisier-rouge-va-rencontrer-partenaires-etranger-se-prepare-presenter-societe-isole-blanc_273609-3653.jpg?t=st=1735559202~exp=1735562802~hmac=5e9f9ed797a0e4483dde302bf325029a32ae260ac7e4332913ce6bfbde1a11cd&w=826"
            alt=""
            className='h-full rounded-lg w-full' />
        </div>
        <div className=' camera-container w-[45%]'>
          <img src="defaultProfil.jpg"
            alt=""
            className='h-full rounded-lg w-full' />
        </div>
      </div>
      <div className=" Btn-container flex flex-row w-full justify-between mt-4 ">
          <div className="w-[30%] justify-center btn-Name flex flex-row py-1 px-1 bg-[#e1ac0c] text-white text-lg rounded-lg items-center">
            <IoVideocamOutline className='mr-4'/>
            <span >
              camera
            </span>
          </div>
          <div className="w-[30%] justify-center btn-Name flex flex-row py-1 px-1 bg-[#e1ac0c] text-white text-lg rounded-lg items-center">
            <CiMicrophoneOn  className='mr-4' />
            <span >
              micro
            </span>
          </div>
          <div className="w-[30%] justify-center btn-Name flex flex-row py-1 px-1 bg-red-700 text-white text-lg rounded-lg items-center">
            <IoExitOutline   className='mr-4'/>
            <span >
              leave
            </span>
          </div>
      </div>
    </div>
  )
}
