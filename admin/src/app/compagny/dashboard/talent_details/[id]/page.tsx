/*************  ✨ Codeium Command ⭐  *************/
'use client'
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CvCard from '@/app/components/sub/CvCard';
import Cv_card_loading from '@/app/components/layouts/Cv_card_loading';

export default function Profil() {
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/cvs/${id}/`);
        setUser(response.data);
      } catch (error) {
        console.error('Erreur API :', error);
      }
    };
    fetchUser();
  }, [id]);

// ! un composant ux/ui loagind design doit etre rendu ici
  if (!user) return <div><Cv_card_loading/></div>;

  return (
    <>
      <CvCard 
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
      />
    </>
  );
}
/******  2b68e6b5-8f34-4dc0-956b-363fbe8b17ee  *******/ 