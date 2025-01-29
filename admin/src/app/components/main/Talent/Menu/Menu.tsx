'use client'
import React, { useEffect, useState } from "react";
import Footer from "@/app/components/layouts/Footer";
import Navbar from "@/app/components/layouts/Navbar";
import { MdAddPhotoAlternate } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";


interface Props {
    user_id: any;
    nom_prenom: string;
    mail: string;
    numero_tlfn: string;
    profil: string;
    competences: string[];
    resume_cv: string;
    disponibilite: string;
    domaine_etude: string;
    exp_salaire: number;
    experience: any;
}
interface Experience {
    poste: string;
    entreprise: string;
    missions: string[] | string;
    date_debut: string;
    date_fin: string;
}
export default function Menu({ user_id, nom_prenom, mail, numero_tlfn, competences, disponibilite, domaine_etude, experience, resume_cv }: Props) {
    const [imgProfil, setImgProfil] = useState<string>('');
    const [activeSection, setActiveSection] = useState<string>('about'); // État pour gérer la section active

    function handleChange(e: any) {
        console.log(e.target.files);
        setImgProfil(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <>
            <Navbar />
            <div className="bg-gray-200 min-h-screen flex flex-col items-center">
                {/* Profile Section */}
                <div className="mt-6 flex w-full max-w-5xl space-x-6">
                    {/* Left Section */}
                    <div className="flex-1 bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                {/* Image de profil */}
                                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
                                    {imgProfil ? (
                                        <img
                                            src={imgProfil}
                                            alt="Image de profil"
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full">
                                            <label htmlFor="image-upload" className="cursor-pointer w-full h-full bg-gray-200 flex items-center justify-center rounded-full">
                                                <MdAddPhotoAlternate className=" text-base cursor-pointer hover:text-gray-700 border rounded-full w-full h-full p-1 " />
                                            </label>
                                            <label htmlFor="image-upload" className="sr-only">Upload Image</label>
                                            <input
                                                type="file"
                                                id="image-upload"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleChange}
                                                title="Upload Image"
                                            />
                                        </div>
                                    )}
                                </div>

                                <h2 className="text-xl font-bold text-gray-800">{nom_prenom}</h2>
                                <p className="text-gray-500">{mail}</p>
                                <p className="text-gray-500">{numero_tlfn}</p>
                            </div>
                            {/* <button type="button" className="text-[#165b77] underline"> {experience}</button> */}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-80 space-y-4">
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="font-semibold text-gray-800"> Résumé du Cv</h3>
                            <p className="text-gray-500 text-sm">
                                {resume_cv}
                            </p>
                            <button type="button" className="mt-4 w-full bg-[#165b77] text-white py-2 rounded-md flex items-center justify-center">
                                <span> modifier le cv </span><MdEdit />
                            </button>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="font-semibold text-gray-800">Votre profil</h3>
                            <p className="text-gray-500 text-sm">
                                Ajoutez plus de details pour avoir de meilleurs résultats.
                            </p>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="mt-8 w-full max-w-5xl">
                    <div className="flex space-x-6 border-b border-gray-200">
                        <button className={`px-4 py-2 ${activeSection === 'about' ? 'text-emerald-600 border-b-2 border-green-600' : 'text-gray-500'}`} onClick={() => setActiveSection('about')}>
                            À propos
                        </button>
                        <button className={`px-4 py-2 ${activeSection === 'experience' ? 'text-emerald-600 border-b-2 border-green-600' : 'text-gray-500'}`} onClick={() => setActiveSection('experience')}>
                            Experience
                        </button>
                        <button className={`px-4 py-2 ${activeSection === 'dreamJob' ? 'text-emerald-600 border-b-2 border-green-600' : 'text-gray-500'}`} onClick={() => setActiveSection('dreamJob')}>
                            Job de rêve
                        </button>
                    </div>

                    <div className="mt-6 flex flex-col space-y-4 mb-10">
                        {activeSection === 'about' && (
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <div className="flex flex-row w-full justify-between" >
                                    <h3 className="font-semibold text-gray-800">Intro</h3>
                                    <FiEdit2 className=" text-[#165b77] transition duration-150 rounded-xl hover:text-white hover:bg-[#165b77] p-2 text-3xl " />
                                </div>
                                <hr className="mt-2 w-full bg-transparent h-1" />
                                <div>
                                    <p className=" mt-2 text-gray-500 text-sm">
                                        {resume_cv}
                                    </p>
                                </div>
                                <div className="flex flex-row items-center justify-start">
                                    <h3 className="font-semibold text-gray-800">Domaine d'étude :</h3>
                                    <p className="ml-2 text-gray-500 text-sm">
                                        {domaine_etude}
                                    </p>
                                </div>
                                <h3 className="font-semibold text-gray-800">Competences : </h3>
                                {competences.map((competence, index) => (
                                    <span key={index}
                                        className="inline-block bg-[#d0ebf5] text-[#165b77] text-sm px-2 py-1 rounded-full font-medium mr-2">
                                        {competence}
                                    </span>
                                ))}

                            </div>
                        )}

                        {activeSection === 'experience' && (
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <div className="flex flex-row w-full justify-between" >
                                    <h3 className="font-semibold text-gray-800">Experience</h3>
                                    <FiEdit2 className=" text-[#165b77] transition duration-150 rounded-xl hover:text-white hover:bg-[#165b77] p-2 text-3xl " />
                                </div>
                                <hr className="mt-2 w-full bg-transparent h-1" />
                                {experience.map((experience: Experience, index: number) => (
                                    <div key={index} className="mb-4">
                                        <h4 className="font-semibold text-gray-800">{experience.poste}</h4>
                                        <p className="text-gray-500 text-sm">{experience.entreprise}</p>
                                        <p className="text-gray-500 text-sm">{experience.date_debut} - {experience.date_fin}</p>
                                        <ul className="list-disc list-inside text-gray-500 text-sm">
                                            {Array.isArray(experience.missions) ? (
                                                experience.missions.map((mission, idx) => (
                                                    <li key={idx}>{mission}</li>
                                                ))
                                            ) : (
                                                <li>{experience.missions}</li>
                                            )}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeSection === 'dreamJob' && (
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <h3 className="font-semibold text-gray-800">Job de rêve</h3>
                                <p className="text-gray-500 text-sm">
                                    Ajoutez les détails de votre job de rêve ici.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </>
    )
}
