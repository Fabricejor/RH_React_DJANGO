'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
// import Link from 'next/link';
import axios from 'axios';
import { FaRegCopy, FaTimes, FaRegSave ,FaExclamationTriangle } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { Tooltip } from 'react-tooltip';
import { ClipLoader } from "react-spinners";


interface OfferData {
    id_offre: any;
    titre: string;
    entreprise: string;
    description: string;
    revenu: number;
    type_contrat: string;
    google_form: string;
}

interface JobsFormProps {
    onClose: () => void;
    offre: OfferData;
}

export default function EditOffre({ onClose, offre }: JobsFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [formData, setFormData] = useState<OfferData>({ ...offre }); // Initialize form data with offer data

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.put(`http://localhost:8000/api/offers/${offre.id_offre}/`, formData); // Send PUT request with updated data
            console.log("Offer updated:", response.data);
            // setResponseMessage("Offer updated successfully!"); // Or handle the response as needed
            // Use a timeout to simulate a delay before reloading (optional)
            alert("Offer updated successfully!");
            setTimeout(() => {
                window.location.reload(); // Reload the page
              }, 100); // Adjust timeout as needed
        } catch (error) {
            console.log("Error updating offer:", error);
            setResponseMessage("Error updating offer.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex p-5 justify-center items-center z-50 overflow-y-scroll">
            <div className="bg-[#165b77] p-8 rounded-lg w-[80%] md:w-[70%] relative mt-20">
                <button title='button' type='button' onClick={onClose} className="absolute top-6 right-2 text-xl text-red-500 hover:text-red-800">
                    <FaTimes />
                </button>
                <div className="header flex items-start w-full ">
                    <FaRegCopy className='text-[#165b77] bg-white rounded-[90%] p-[3px] text-2xl' />
                    <h2 className='text-white ml-2'>Modification de {offre.titre}</h2>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col w-[100%] mt-2'> {/* Add onSubmit handler */}
                    <div className='flex flex-row gap-1 items-center'>
                        <div className='flex flex-col w-full'>
                            <label className='text-white text-base'>Titre Offre</label>
                            <input
                                className='w-full rounded-lg py-1 px-2'
                                type="text"
                                name='titre' // Match the name to the property in OfferData
                                title='job_title'
                                value={formData.titre} // Use value and onChange for controlled input
                                onChange={handleChange}
                                disabled
                                required
                            />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label className='text-white text-base'>Nom Entreprise</label>
                            <input
                                className='w-full rounded-lg py-1 px-2'
                                type="text"
                                name='titre' // Match the name to the property in OfferData
                                title='entreprise'
                                value={formData.entreprise} // Use value and onChange for controlled input
                                onChange={handleChange}
                                disabled
                                required
                            />
                        </div>
                    </div>
                    {/* ... other input fields */}
                    <div className='flex flex-row w-full items-center justify-between'>
                    <label className='text-white text-base mt-2'>Description</label>
                    <FaExclamationTriangle className=' bg-red-400 text-white p-1 rounded-md text-lg mt-2' data-tooltip-id='warning' />
                    <Tooltip id="warning"  className="bg-red-400 text-white text-sm rounded-lg py-2 px-3 shadow-sm">
                        <p>Le lien de l'entretien restera inchangé. Veuillez éviter de modifier significativement le contenu de l'offre pour garantir une expérience fluide.</p>
                    </Tooltip>
                    </div>
                    <textarea
                        className='w-full rounded-lg py-2 px-2'
                        name='description'
                        title='Description'
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <div className='flex flex-row gap-1 items-center'>
                        <div className='flex flex-col w-full'>

                            <label className='text-white text-base mt-4'>Rémunération</label>
                            <input
                                className='w-full rounded-lg py-1 px-2'
                                type="number"
                                name='revenu'
                                title='Hourly rate'
                                min={1000}
                                value={formData.revenu}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='flex flex-col w-full'>

                            <label className='text-white text-base mt-4'>Type de Contrat</label>
                            <select
                                className='w-full rounded-lg py-2 px-2'
                                name='type_contrat'
                                title='Commitment Type'
                                value={formData.type_contrat}
                                onChange={handleChange}
                                required
                            >
                                <option value="CDD">CDD</option>
                                <option value="CDI">CDI</option>
                                <option value="Stage">Stage</option>
                                <option value="Freelance">Freelance</option>
                            </select>
                        </div>
                    </div>
                    <label className='text-white text-base mt-4'>Google form</label>
                    <input
                        className='w-full rounded-lg py-0 px-3'
                        type="text"
                        name='google_form'
                        title='Google form'
                        value={formData.google_form}
                        onChange={handleChange}
                        required
                    />
                    <div className='flex flex-row w-full justify-between'>
                        {/* ... your buttons */}
                        <button
                            title='Update jobs'
                            className=' flex flex-row  items-center mt-8 py-2 px-2 bg-[#e1ac0c] text-white rounded-lg'
                            type="submit"
                            disabled={isLoading}
                            onClick={handleSubmit}
                        >
                            <p className='mr-1'>{isLoading ? <ClipLoader color="white" loading={isLoading} size={20} /> : 'Mettre à jour'}</p>
                            <IoMdSend />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}