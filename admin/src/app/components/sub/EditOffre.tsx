'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { FaRegCopy, FaTimes, FaRegSave } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

interface JobsFormProps {
    onClose: () => void; // Add onClose prop
    // other props
}


export default function EditOffre({ onClose }: JobsFormProps) {
        const [isLoading, setIsLoading] = useState(false);
        const [responseMessage, setResponseMessage] = useState('');
        

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex p-5 justify-center items-center z-50 overflow-y-scroll"> {/* Style pour le popup */}
    <div className="bg-[#165b77] p-8 rounded-lg w-[80%] md:w-[70%] relative mt-20"> {/* Conteneur du formulaire */}
        <button type='button' onClick={onClose} className="absolute top-6 right-2 text-xl text-red-500 hover:text-red-800">
            <FaTimes /> {/* Bouton de fermeture */}
        </button>
        <div className="header flex items-start w-full ">
            <FaRegCopy className='text-[#165b77] bg-white rounded-[90%] p-[3px] text-2xl' />
            <h2 className='text-white ml-2'>Create Job Listing</h2>

        </div>
        <form  className='flex flex-col w-[100%] mt-2'>
            <label className='text-white text-base'>Job title</label>
            <input
                className='w-full rounded-lg py-1 px-2'
                type="text"
                name='job_title'
                title='job_title'
                
                required
            />
            <label className='text-white text-base'>Compagny name</label>
            <input
                className='w-full rounded-lg py-1 px-2'
                type="text"
                name='compagny_name'
                title='compagny_name'
               
                required
            />

            <label className='text-white text-base mt-2'>Description</label>
            <textarea
                className='w-full rounded-lg py-2 px-2'
                name='Description'
                title='Description'
                
                required
            />

            <label className='text-white text-base mt-4'>Hourly rate</label>
            <input
                className='w-full rounded-lg py-1 px-2'
                type="number"
                name='Hourly rate'
                
                title='Hourly rate'
                min={1000}
                
                required
            />

            <label className='text-white text-base mt-2'>Commitment Type</label>
            <select
                className='w-full rounded-lg py-2 px-2'
                name='Commitment Type'
                title='Commitment Type'

                required
            >
                <option value="">Contrat type</option> {/* Option par défaut */}
                <option value="CDD">CDD</option>
                <option value="CDI">CDI</option>
                <option value="Stage">Stage</option>
                <option value="Freelance">Freelance</option>
            </select>
            <label className='text-white text-base mt-4'>Google form</label>
            <input
                className='w-full rounded-lg py-0 px-3'
                type="text"
                name='Google form'
                title='Google form'
                
                required
            />
            <div className='flex flex-row w-full justify-between'>
                {responseMessage ?
                    <div className='mt-4 w-full flex flex-row items-center justify-between'>
                        <Link href={responseMessage} target='_blank' className=" text-white p-2   bg-blue-400 rounded-md " title='voir interview'>Votre interview est pret</Link>
                        <button
                            type='button'
                            className='flex flex-row text-white p-2  items-center  bg-blue-400 rounded-md'
                            // onClick={Createjob}
                            >
                            <p className='mr-1'>save</p><FaRegSave />
                        </button>
                    </div>
                    :
                    <button
                        title='Creating jobs'
                        className=' flex flex-row  items-center mt-8 py-2 px-2 bg-[#e1ac0c] text-white rounded-lg'
                        type="submit"
                        disabled={isLoading}
                    >
                        <p className='mr-1'>{isLoading ? 'Envoi en cours...' : 'Generate Interview'}</p>
                        <IoMdSend />
                    </button>}
                {/* <button
                title='Creating jobs'
                className='mt-8 py-1 px-1 bg-[#e1ac0c] text-white rounded-lg'
                type="submit"
            >
                {isLoading ? 'Envoi en cours...' : 'or Upload (.pdf)'}
            </button> */}

            </div>
        </form>


    </div>
</div>
  )
}
