'use client'

import React from 'react'

//pour call api 
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
//les incones
import { FcGoogle } from "react-icons/fc";
import { AiFillInfoCircle } from "react-icons/ai";
import { IoBackspaceOutline } from "react-icons/io5";
import { GoGraph } from "react-icons/go";
//pour les liens
import Link from 'next/link'
//composant resultCard
import ResultCard from './ResultCard'
import EditOffre from './EditOffre'
import Cv_card_loading from '../layouts/Cv_card_loading'

interface offreData {
  titre: string;
  entreprise: string;
  type_contrat: string;
  revenu: number;
  google_form?: string;
}

export default function OffreCard() {
  const router = useRouter()
  const { id } = useParams()
  const [result, setResult] = useState<any>(null)
  const [offre, setOffre] = useState<offreData | any >(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup state
  

  useEffect(() => {
    const fetchOffre = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/offers/${id}/`);
        setOffre(response.data);
        console.log("Offre: ", response.data);
      } catch (e) {
        console.log("Erreur cette offre n'existe pas:", e);
      }
    };
    fetchOffre();


    const fetchResultofOffre = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/results/get_result_by_offer/${id}`);
        setResult(response.data);
        console.log("Resultat :", response.data);
        // console.log("cv_id :", result[0].id_cv);
      } catch (error) {
        console.log("Erreur aucun résultat pour cet offres", error);
      }
    };
    fetchResultofOffre();
  }, [id]);

    const handleOpenPopup = () => {
      setIsPopupOpen(!isPopupOpen); // Toggle popup visibility
  };

  if (!result) return <>
    <Cv_card_loading/>
  </>

  return (
    <div>
      <div className="container mx-auto w-full p-2">
        {/* En-tête */}
        <div className='w-full flex justify-between items-center  mb-3' >
          <Link href={'/compagny/dashboard/'} className='rounded-xl'><IoBackspaceOutline className="bg-[#165b77] hover:bg-[#163643] text-white text-2xl px-1 py-1 rounded-xl  font-medium" /></Link>
        </div>
        <div className="flex justify-between items-start mb-3">
          <div className='flex flex-col'>
            <div>
              <span className="text-gray-600 mr-2">Titre :</span>
              <span className="text-[#165b77] font-bold">{offre.titre}</span>
            </div>
            <div>
              <span className="text-gray-600 mr-2">Société :</span>
              <span className="text-[#165b77] font-bold">{offre.entreprise}</span>
            </div>
            <div>
              <span className="text-gray-600 mr-2">contrat :</span>
              <span className="text-[#165b77] font-bold">{offre.type_contrat}</span>
            </div>
            <div>
              <span className="text-gray-600 mr-2">Rémuneration :</span>
              <span className="text-[#165b77] font-bold">{offre.revenu} XOF</span>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between ">
            {offre.google_form ? <Link href={offre.google_form} target='_blank' className='border border-[#165b77] hover:bg-[#165b77]   text-[#165b77] hover:text-[#fff] p-2 rounded-xl text-xs  font-medium flex flex-row items-center justify-between'><FcGoogle /><span className='ml-1'> google form</span></Link > : <p>auccun lien google form</p>}
            <button type='button' className="bg-[#165b77] hover:bg-[#163643] text-white ml-1 p-2 rounded-xl text-sm font-medium"
            onClick={handleOpenPopup}>
              Modifier le job
              </button>
          </div>
        </div>



        {/* Barre d'outils (Status, Tags, Interviews, Sources) */}
        <div className="flex items-center border-t border-b border-gray-200 py-2">
          <div className="flex items-center  mr-6">
            <label htmlFor="select-all" className="hidden"></label>
            <button type='button' className="text-white text-xs  bg-[#165b77] border border-[#165b77]  rounded-full py-1 px-2 hover:text-[#165b77] hover:bg-transparent flex items-center">
              <AiFillInfoCircle />
              <span className="ml-2">Status</span>
            </button>
          </div>
          <div className="flex items-center mr-6">
            <button type='button' className="text-white text-xs  bg-[#165b77] border border-[#165b77]  rounded-full py-1 px-2 hover:text-[#165b77] hover:bg-transparent flex items-center">
              <GoGraph />
              <span className="ml-2">score</span>
            </button>
          </div>
        </div>
        {/*Contenu principal ici*/}
        <div className='flex flex-col w-full flex-wrap items-center  '>
          {result.length === 0 ? <p>Aucun résultat pour cette offre</p> :
            result.map((result: any,index :number) => (
              <div className='w-full h-full'key={index} >
                <ResultCard
                  key={index}
                  user_id={result.id_cv}
                  cosine_similarity={result.cosine_similarity}
                  nom_prenom={result.nom_prenom}
                  offre_id={result.offre_id}
                  domaine_etude={result.domaine_etude}
                />
              </div>
            ))
          }
        </div>
      </div>
      {isPopupOpen && <EditOffre onClose={handleOpenPopup} offre={offre} />} {/* Render JobForm conditionally */}
    </div>
  )
}
