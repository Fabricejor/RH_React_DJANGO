'use client'
import React, { useEffect, useState } from "react";
import Footer from "@/app/components/layouts/Footer";
import Navbar from "@/app/components/layouts/Navbar";
import { MdAddPhotoAlternate } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import axios from "axios";
import { IoMdSearch } from "react-icons/io";
import { ChevronDown, ChevronUp } from 'lucide-react';
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
    commitment: string;
}
interface Experience {
    poste: string;
    entreprise: string;
    missions: string[] | string;
    date_debut: string;
    date_fin: string;
}
interface Offre {
    id_offre: number;
    titre: string;
    entreprise: string;
    description: string;
    type_contrat: string;
    revenu: number;
    link_interview: string;
}
export default function Menu({ user_id, nom_prenom, mail, numero_tlfn, exp_salaire, commitment, competences, disponibilite, domaine_etude, experience, resume_cv }: Props) {
    const [imgProfil, setImgProfil] = useState<string>('');
    const [activeSection, setActiveSection] = useState<string>('about'); // État pour gérer la section active
    const [infoSupModif, setInfoSupModif] = useState<boolean>(false);
    const [Offres, setOffres] = useState<Offre[]>([]);
    const [showDialog, setShowDialog] = useState(false);
    const getAllOffres = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/offers/');
            setOffres(Array.isArray(response.data) ? response.data : []);

        } catch (error) {
            console.error('Erreur API :', error);
            setOffres([]);
        }
    }
    // Fetch data on component mount (initial render)
    useEffect(() => {
        getAllOffres();
    }, []); // Empty dependency array ensures fetching only once

    function handleChange(e: any) {
        console.log(e.target.files);
        setImgProfil(URL.createObjectURL(e.target.files[0]));
    }
    const handleModInfoSup = () => {
        setInfoSupModif(!infoSupModif);
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
                                                <MdAddPhotoAlternate className=" text-sm cursor-pointer hover:text-gray-700 border rounded-full w-full h-full p-1 " />
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
                            <div className="flex flex-row items-center justify-between">
                                <h3 className="font-semibold text-gray-800">Informations suplémentaires</h3>
                                <FiEdit2 className=" text-[#165b77] transition duration-150 rounded-xl hover:text-white hover:bg-[#165b77] p-2 text-3xl " onClick={handleModInfoSup} />
                            </div>
                            {infoSupModif ?
                                (
                                    <>
                                        <div className="flex flex-row items-center justify-between">
                                            <p className="text-teal-600 font-bold text-xs">
                                                type de contract:
                                            </p>
                                            <form className=" mx-auto w-full max-w-xs">
                                                <select id="underline_select" title="UNDERLINE SELECT" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                                    <option defaultValue={commitment}>Contrat Type</option>
                                                    <option value="stage">Stage</option>
                                                    <option value="cdd">CDD</option>
                                                    <option value="cdi">CDI</option>
                                                    <option value="Freelance">Freelance</option>
                                                </select>
                                            </form>
                                        </div>
                                        <div className="flex flex-row items-center justify-between">
                                            <p className="text-teal-600 font-bold text-xs">
                                                Prétentions Salariales:
                                            </p>
                                            <input type="number"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer " placeholder={exp_salaire.toString()} /> XOF

                                        </div>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <div className="flex flex-row items-center justify-between">
                                            <p className="text-teal-600 font-bold text-xs">
                                                type de contract recherché:
                                            </p>
                                            <p className="text-gray-500 text-xs">
                                                {commitment}
                                            </p>
                                        </div>
                                        <div className="flex flex-row items-center justify-between">
                                            <p className="text-teal-600 font-bold text-xs">
                                                Prétentions Salariales:
                                            </p>
                                            <p className="text-gray-500 text-xs">
                                                {exp_salaire} FCFA
                                            </p>
                                        </div>
                                    </>
                                )
                            }

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
                            Éducation
                        </button>
                        <button className={`px-4 py-2 ${activeSection === 'entretien' ? 'text-emerald-600 border-b-2 border-green-600' : 'text-gray-500'}`} onClick={() => setActiveSection('entretien')}>
                            Entretien
                        </button>
                        <button className={`px-4 py-2 ${activeSection === 'sommaire' ? 'text-emerald-600 border-b-2 border-green-600' : 'text-gray-500'}`} onClick={() => setActiveSection('sommaire')}>
                            Sommaire
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
                            <>
                                <form className="w-[50%] mx-auto">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                        </div>
                                        <input type="search" id="default-search"
                                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="recherher une offre" required />
                                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                                    </div>
                                </form>
                                {Offres.map((offre, index) => (

                                    <div className="bg-white rounded-lg shadow-md p-4 flex flex-row justify-between" key={index}>
                                        <div className="flex flex-col items-start">
                                            <h3 className="font-semibold text-gray-800">{offre.titre}</h3>
                                            <p className="text-gray-500 text-sm">
                                                {offre.entreprise}
                                            </p>
                                        </div>
                                        <div className="flex flex-row   items-start ">
                                            <h3 className="font-medium text-teal-800 mr-2">{offre.type_contrat}</h3>
                                            <p className="text-teal-500 text-sm ml-2">
                                                {offre.revenu} FCFA
                                            </p>
                                        </div>
                                        <div className="flex flex-row items-start">
                                            <IoMdSearch className="hover:bg-white hover:text-[#165b77] border border-[#165b77] mr-2 transition duration-150 rounded-xl text-white bg-[#165b77] p-2 text-3xl" title="Voir plus" />
                                            <a href={offre.link_interview}
                                                className="hover:bg-white hover:text-[#165b77] border border-[#165b77] mr-2 transition duration-150 rounded-xl text-white bg-[#165b77] p-2 text-xs"
                                                target="_blank">
                                                postuler</a>
                                        </div>
                                    </div>

                                ))}

                            </>

                        )}
                        {activeSection === 'sommaire' && (
                            <>


                                <div className="bg-white rounded-lg p-6 shadow-md mt-4">
                                    <h2 className="text-xl font-semibold mb-4">Tableau des Notes</h2>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <span className="font-medium">Note entretien</span>
                                            <span className="text-lg font-bold text-green-500">16/20</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <span className="font-medium">Note CV</span>
                                            <span className="text-lg font-bold text-green-500">15/20</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <span className="font-medium">Note quiz</span>
                                            <span className="text-lg font-bold text-green-500">14/20</span>
                                        </div>
                                    </div>
                                </div>
                            </>

                        )}
                        {activeSection === 'entretien' && (
                            <>
                                <div className="bg-white rounded-lg p-6 shadow-md mt-4">
                                    <div className=" h-[50vh] w-full bg-gray-900 rounded-lg overflow-hidden mb-6">
                                        <div className="grid grid-cols-2 h-full">
                                            <div className="bg-yellow-700 p-4 flex items-center justify-center">
                                                <div className="relative">
                                                    <img
                                                        src="https://img.freepik.com/free-photo/confident-business-woman-portrait-smiling-face_53876-137693.jpg?ga=GA1.1.265756862.1733930614&semt=ais_hybrid_sidr"
                                                        alt="Candidate"
                                                        className="w-32  h-32 rounded-full object-cover border-4 border-yellow-500"
                                                    />
                                                    <span className="absolute -top-10 left-2 bg-yellow-900 text-white px-3 py-1 rounded-full text-sm">
                                                        Apprenant
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="bg-green-800 p-4 flex items-center justify-center">
                                                <div className="relative">
                                                    <img
                                                        src="/defaultProfil.jpg"
                                                        alt="AI Agent"
                                                        className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
                                                    />
                                                    <span className="absolute -top-10 right-2 bg-green-900 text-white px-3 py-1 text-nowrap rounded-full text-sm">
                                                        agent-IA-developpeur-full-stack
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setShowDialog(!showDialog)}
                                        className="w-full bg-gray-100 hover:bg-gray-200 transition-colors py-3 rounded-lg flex items-center justify-center gap-2 mb-4"
                                    >
                                        <span className="font-medium">Voir {showDialog ? 'moins' : 'plus'}</span>
                                        {showDialog ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>

                                    {showDialog && (
                                        <div className="space-y-6">
                                            <div className="border-l-4 border-yellow-500 pl-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-sm text-gray-500">00:00</span>
                                                    <span className="font-medium">Apprenant</span>
                                                </div>
                                                <p className="text-gray-700">
                                                    Bonjour, je suis Amina Ndiaye. Je suis très intéressée par la formation  de développeur full-stack.
                                                </p>
                                            </div>

                                            <div className="border-l-4 border-green-500 pl-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-sm text-gray-500">00:15</span>
                                                    <span className="font-medium">Agent IA</span>
                                                </div>
                                                <p className="text-gray-700">
                                                    Bonjour Amina, ravi de vous rencontrer. Pouvez-vous me parler de votre expérience en développement web ?
                                                </p>
                                            </div>

                                            <div className="border-l-4 border-yellow-500 pl-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-sm text-gray-500">00:30</span>
                                                    <span className="font-medium">Apprenant</span>
                                                </div>
                                                <p className="text-gray-700">
                                                    J'ai un diplôme de licecne en marketing digital, mais j'ai récemment suivi une formation intensive en développement web. Je maîtrise HTML, CSS, JavaScript et React.
                                                </p>
                                            </div>

                                            <div className="border-l-4 border-green-500 pl-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-sm text-gray-500">01:00</span>
                                                    <span className="font-medium">Agent IA</span>
                                                </div>
                                                <p className="text-gray-700">
                                                    Très intéressant. Avez-vous déjà travaillé sur des projets concrets ? Pouvez-vous me parler de l'un d'entre eux ?
                                                </p>
                                            </div>

                                            <div className="border-l-4 border-yellow-500 pl-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-sm text-gray-500">01:15</span>
                                                    <span className="font-medium">Apprenant</span>
                                                </div>
                                                <p className="text-gray-700">
                                                    Oui, j'ai développé une application de gestion de tâches utilisant React et Node.js. Elle permet aux utilisateurs de créer, organiser et suivre leurs tâches quotidiennes.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </>

                        )}
                    </div>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </>
    )
}
