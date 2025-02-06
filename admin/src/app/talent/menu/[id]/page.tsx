'use client'
import Menu from '@/app/components/main/Talent/Menu/Menu'
import React,{ useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import Cv_card_loading from '@/app/components/layouts/Cv_card_loading'

export default function pages() {
  const [user, setUser] = useState<any>(null);
  const { id } = useParams();
  
  useEffect (() => {
    const userData = async () => {
      try{
        const response = await axios.get(`http://127.0.0.1:8000/api/cvs/${id}/`);
        setUser(response.data);
      }catch(error){
        console.error('Erreur API :', error);
      }
    };
    userData();
  },[id])
  if (!user) return <div><Cv_card_loading/></div>;

  return (
    <>
        <Menu
        user_id={user.user_id}
        nom_prenom={user.nom_prenom}
        mail={user.mail}
        numero_tlfn={user.numero_tlfn}
        profil={user.profil}
        competences={user.competences}
        resume_cv={user.resume_cv}
        disponibilite={user.disponibilite}
        domaine_etude={user.domaine_etude}
        exp_salaire={user.exp_salaire}
        experience={user.experience}
        commitment={user.commitment}
        />
    </>
  )
}
