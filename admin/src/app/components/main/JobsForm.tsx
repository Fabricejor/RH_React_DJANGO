'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { FaRegCopy } from "react-icons/fa";
import { log } from 'console';

export default function JobsForm() {
    const [formData, setFormData] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [job_title, setJobTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handlesubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Regroupement des données en un seul string
        const combinedData = `${job_title} ${description}`.trim();

        try {
            // Envoi de l'objet JSON avec Axios
            const response = await axios.post(
                'https://api.ednova.ai/its/interview-agents',
                { jobDescription: combinedData }, // Envoi des données structurées
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': '*/*',
                    },
                }
            );

            // Gestion de la réponse
            setResponseMessage(response.data.data.interviewUrl || 'Formulaire envoyé avec succès.');
            console.log(responseMessage)
        } catch (error) {
            console.error('Erreur API :', error);
            setResponseMessage('Une erreur est survenue lors de l\'envoi du formulaire.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='w-full h-[100%]  bg-[rgb(22,91,119)] flex flex-col p-5 justify-start items-center'>
            <div className="header flex items-start  w-full ">
                <FaRegCopy className='text-[#165b77] bg-white rounded-[90%] p-[3px] text-2xl' />
                <h2 className='text-white ml-2'>Create Job Listing</h2>
            </div>
            <form onSubmit={handlesubmit} className='flex flex-col w-[60%] mt-2'>
                <label className='text-white text-base'>Job title</label>
                <input
                    className='w-full rounded-lg py-2'
                    type="text"
                    name='job_title'
                    title='job_title'
                    value={job_title}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                />

                <label className='text-white text-base mt-2'>Description</label>
                <textarea
                    className='w-full rounded-lg py-2'
                    name='Description'
                    title='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <label className='text-white text-base mt-4'>Hourly rate</label>
                <input
                    className='w-full rounded-lg py-2'
                    type="text"
                    name='Hourly rate'
                    title='Hourly rate'
                />

                <label className='text-white text-base mt-2'>Commitment Type</label>
                <input
                    className='w-full rounded-lg py-2'
                    type="text"
                    name='Commitment Type'
                    title='Commitment Type'
                />

                <button
                    title='Creating jobs'
                    className='mt-8 py-2 bg-[#e1ac0c] text-white rounded-lg'
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Envoi en cours...' : 'Creating Job'}
                </button>
            </form>

          {responseMessage ?<Link href={responseMessage} target='_blank' className="text-white p-2  bg-blue-400 rounded-md mt-1">Votre interview est pret</Link> : <p className='mt-2 text-white'>Aucun lien</p>}  
        </div>
    );
}
