'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

// icons
import { IoBackspaceOutline } from "react-icons/io5";
import { IoLibraryOutline } from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa6";
import { RiLightbulbFlashLine } from "react-icons/ri";
import MinNavbar from "./MinNavbar";
import InterviewCard from "./InterviewCard";
import WorkExperienceCard from "./WorkExperienceCard";

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
}



export default function CvCard({ user_id, nom_prenom, mail, numero_tlfn, profil, competences, resume_cv, disponibilite, domaine_etude ,exp_salaire }: Props) {
   
    const interviewData = {
        videoUrl: 'https://dailyco-recordings.s3.amazonaws.com/mercor-user/fd5a843880/1727180072920?AWSAccessKeyId=AKIAUDSPHZUWR73DATPQ&Signature=CCBapQ3vXsNezBc%2Fs2QItER4T8I%3D&Expires=1736188276', // Chemin vers votre vidéo
        transcript: [
          { time: '00:00', speaker: 'IA', text: 'Bonjour et bienvenue à cet entretien.' },
          { time: '00:05', speaker: 'Candidat', text: 'Bonjour, merci de me recevoir.' },
          { time: '00:10', speaker: 'IA', text: 'Parlez-moi de votre expérience.' },
          { time: '00:20', speaker: 'Candidat', text: 'J\'ai travaillé pendant 5 ans en tant que chargée de marketing CRM à Worldpay from FIS' },
          // ... plus de lignes
        ],
      };
      const experiencesData = [
        {
            title: "Chargée de Marketing & CRM",
            company: "Worldpay from FIS",
            dates: "08/2021-Present", // "null" devient "Present"
            description: [
                "Exécution du plan marketing, notamment en coordonnant les activités marketing, en gérant les délais et en veillant à ce que les livrables soient atteints.",
                "Création de supports marketing sur nos solutions de paiements tels que des brochures, des présentations et du contenu promotionnel.",
                "Suivi et reporting des kpi's campagnes avec les outils de marketing automation comme Salesforce, Outreach, Marketo.",
                "Organisation des salons, séminaires, webinaires avec les équipes transverses."
            ].join("\n"), // Concaténation des missions avec un retour à la ligne
        },
        {
            title: "Marketing Associate",
            company: "Schneider Electric",
            dates: "07/2020-12/2020",
            description: [
                "Coordination et déploiement des briefs campagnes.",
                "Soutien dans la planification et l'exécution de projets, garantissant le respect des délais et des livrables.",
                "Organisation d'événements: coordination des shootings, live event, webinaire...",
                "Veille concurrentielle et analyse de marché."
            ].join("\n"),
        },
        {
            title: "Assistante Marketing",
            company: "Massala Services",
            dates: "07/2018-02/2019",
            description: [
                "Gestion des canaux de ventes (d'une boutique Facebook : +5% de CA) et refonte de site web.",
                "Gestion du calendrier éditorial et animation des réseaux sociaux.",
                "Création et mise à jour des supports de communication internes."
            ].join("\n"),
        },
      ];
   
    return (
        <div className="w-full p-4 overflow-x-hidden min-h-full">
            <div className="layout w-full flex flex-row justify-between">
                <IoBackspaceOutline className="bg-[#165b77] hover:bg-[#163643] text-white text-2xl px-1 py-1 rounded-xl  font-medium" />
                <button type="button" className="bg-[#165b77] hover:bg-[#163643] text-white px-3 py-2 rounded-xl text-sm font-medium">
                    contact
                </button>
            </div>
            <div className="Hero w-full flex flex-col mt-4 ml-8  justify-start">
                <div className="flex flex-row justify-start items-center">
                    <img src="https://img.freepik.com/photos-gratuite/portrait-femme-entrepreneur-peau-sombre-confiante-regard-serieux-porte-lunettes-rondes-chemisier-rouge-va-rencontrer-partenaires-etranger-se-prepare-presenter-societe-isole-blanc_273609-3653.jpg?t=st=1735559202~exp=1735562802~hmac=5e9f9ed797a0e4483dde302bf325029a32ae260ac7e4332913ce6bfbde1a11cd&w=826"
                        alt="profil image"
                        className="w-12 h-12 rounded-xl object-cover" />
                    <h3 className="text-xl font-bold  ml-4">
                        {nom_prenom}
                    </h3>
                </div>
                <div className="flex flex-row justify-start items-center mt-2" >
                    <IoLibraryOutline className="text-gray-400" /> 
                    <h3 className="text-sm font-bold   text-gray-400 ml-4">
                    domaine d'etude:
                    </h3>
                    <h3 className="text-sm font-bold  ml-4">
                        {domaine_etude}
                    </h3>
                </div>
                <div className="flex flex-row justify-start items-center mt-2" >
                    <FaRegAddressCard className="text-gray-400" /> 
                    <h3 className="text-sm font-bold   text-gray-400 ml-4">
                        Souhaits salariaux:
                    </h3>
                    <h3 className="text-sm font-bold  ml-4">
                        {exp_salaire} XOF
                    </h3>
                </div>
                <div className="flex flex-row justify-start items-center mt-2" >
                    <RiLightbulbFlashLine  className="text-gray-400" /> 
                    <h3 className="text-sm font-bold   text-gray-400 ml-4">
                        skills:
                    </h3>
                    {competences.map((competence, index) => (
                    <span
                        key={index}
                        className=" ml-1 px-3 py-1 rounded-full text-sm font-medium text-nowrap bg-[#d0ebf5] text-[#165b77]"
                    >
                        {competence}
                    </span>
                ))}
                </div>
            </div>
            <MinNavbar activeSection="someSection"/>
            <InterviewCard {...interviewData}/>
            <WorkExperienceCard experiences={experiencesData} />
        </div>
    )
}
