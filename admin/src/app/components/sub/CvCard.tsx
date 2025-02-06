'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";

// icons
import { IoBackspaceOutline } from "react-icons/io5";
import { IoLibraryOutline } from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa6";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { GrUserExpert } from "react-icons/gr";
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
    exprience: any ;
}



export default function CvCard({ user_id, nom_prenom, mail, numero_tlfn, profil, competences, resume_cv, disponibilite, domaine_etude ,exp_salaire ,exprience }: Props) {
   
    const interviewData = {
        videoUrl: 'https://dailyco-recordings.s3.amazonaws.com/mercor-user/345587d681/1718561465127?AWSAccessKeyId=AKIAUDSPHZUWR73DATPQ&Signature=e15T2YHjrmU4%2BJI0N3Sb8JSjvIc%3D&Expires=1738750353', // Chemin vers votre vidéo
        transcript: [
            { time: '00:00', speaker: 'IA', text: 'Bonjour et bienvenue à cet entretien.', notes: 0 },
            { time: '00:05', speaker: 'Candidat', text: 'Bonjour, merci de me recevoir.', notes: 90 },
            { time: '00:10', speaker: 'IA', text: 'Parlez-moi de votre expérience.', notes: 0 },
            { time: '00:20', speaker: 'Candidat', text: 'J\'ai travaillé pendant 5 ans en tant que chargée de marketing CRM à Worldpay from FIS.', notes: 85 },
            { time: '00:30', speaker: 'IA', text: 'Pouvez-vous me donner un exemple de projet réussi dans ce rôle ?', notes: 0 },
            { time: '00:40', speaker: 'Candidat', text: 'Bien sûr. J\'ai lancé une campagne qui a augmenté l\'engagement client de 30 % grâce à l\'automatisation des emails personnalisés.', notes: 95 },
            { time: '00:50', speaker: 'IA', text: 'Quelles compétences spécifiques pensez-vous être vos points forts ?', notes: 0 },
            { time: '01:00', speaker: 'Candidat', text: 'Je dirais mes compétences analytiques, ma maîtrise des outils CRM comme Salesforce, et ma capacité à collaborer avec des équipes interfonctionnelles.', notes: 90 },
            { time: '01:10', speaker: 'IA', text: 'Comment gérez-vous les situations de stress au travail ?', notes: 0 },
            { time: '01:20', speaker: 'Candidat', text: 'Je prends le temps de prioriser mes tâches et je m\'assure de communiquer efficacement avec mon équipe pour répartir la charge de travail si nécessaire.', notes: 85 },
            { time: '01:30', speaker: 'IA', text: 'Où vous voyez-vous dans 5 ans ?', notes: 0 },
            { time: '01:40', speaker: 'Candidat', text: 'Je me vois diriger une équipe CRM ou travailler sur des stratégies de fidélisation client à grande échelle.', notes: 80 },
            { time: '01:50', speaker: 'IA', text: 'Quels sont vos objectifs professionnels à court terme ?', notes: 0 },
            { time: '02:00', speaker: 'Candidat', text: 'Mon objectif immédiat est de continuer à développer mes compétences en marketing digital et de contribuer efficacement à la croissance de l\'entreprise.', notes: 85 },
            { time: '02:10', speaker: 'IA', text: 'Avez-vous des questions pour moi ?', notes: 0 },
            { time: '02:20', speaker: 'Candidat', text: 'Oui, pourriez-vous m\'en dire plus sur les principaux défis auxquels votre équipe marketing est confrontée actuellement ?', notes: 90 },
            { time: '02:30', speaker: 'IA', text: 'Passons maintenant à des questions techniques liées à votre domaine.', notes: 0 },
            { time: '02:35', speaker: 'IA', text: 'Pouvez-vous expliquer comment vous segmentez une base de données clients pour une campagne marketing ?', notes: 0 },
            { time: '02:45', speaker: 'Candidat', text: 'Je commence par identifier les critères pertinents comme l\'âge, la localisation, ou les préférences d\'achat, puis j\'utilise des outils comme SQL ou les fonctionnalités de segmentation intégrées dans un CRM.', notes: 95 },
            { time: '02:55', speaker: 'IA', text: 'Quelles métriques utilisez-vous pour évaluer le succès d\'une campagne marketing ?', notes: 0 },
            { time: '03:05', speaker: 'Candidat', text: 'Je regarde principalement le taux d\'ouverture, le taux de clic, le retour sur investissement (ROI), et les conversions directes générées.', notes: 90 },
            { time: '03:15', speaker: 'IA', text: 'Si vous deviez optimiser un faible taux d\'ouverture sur une campagne emailing, que feriez-vous ?', notes: 0 },
            { time: '03:25', speaker: 'Candidat', text: 'Je testerais des objets d\'email plus engageants avec des A/B tests, j\'analyserais les heures d\'envoi, et je m\'assurerais que les emails ne tombent pas dans les spams.', notes: 95 },
            { time: '03:35', speaker: 'IA', text: 'Pouvez-vous expliquer comment vous priorisez les tâches dans un projet complexe ?', notes: 0 },
            { time: '03:45', speaker: 'Candidat', text: 'J\'utilise la méthode Eisenhower pour classer les tâches selon leur urgence et importance, et je m\'assure de coordonner avec l\'équipe pour respecter les délais.', notes: 85 },
            { time: '03:55', speaker: 'IA', text: 'Merci pour ces réponses détaillées. Nous allons conclure cet entretien.', notes: 0 },
            { time: '04:00', speaker: 'Candidat', text: 'Merci pour votre temps. J\'ai hâte d\'avoir des nouvelles.', notes: 90 }
          ]
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
                <Link href={'/compagny/dashboard/'}><IoBackspaceOutline className="bg-[#165b77] hover:bg-[#163643] text-white text-2xl px-1 py-1 rounded-xl  font-medium" /></Link>
                <a href={`maito:${mail}`} type="button" className="bg-[#165b77] hover:bg-[#163643] text-white px-3 py-2 rounded-xl text-sm font-medium">
                    contact
                </a>
            </div>
            <div className="Hero w-full flex flex-col mt-4 ml-8  justify-start">
                <div className="flex flex-row justify-start items-center">
                    <img src="https://img.freepik.com/photos-gratuite/portrait-femme-entrepreneur-peau-sombre-confiante-regard-serieux-porte-lunettes-rondes-chemisier-rouge-va-rencontrer-partenaires-etranger-se-prepare-presenter-societe-isole-blanc_273609-3653.jpg?t=st=1735559202~exp=1735562802~hmac=5e9f9ed797a0e4483dde302bf325029a32ae260ac7e4332913ce6bfbde1a11cd&w=826"
                        alt="profil image"
                        className="w-12 h-12 rounded-xl object-cover" />
                    <h3 className="text-xl font-bold  ml-4">
                        {nom_prenom} | {numero_tlfn}
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
                <div className="flex flex-row justify-start items-center mt-2" >
                    <GrUserExpert  className="text-gray-400" /> 
                    <h3 className="text-sm font-bold   text-gray-400 ml-4">
                    Résumé:
                    </h3>
                    <h3 className="text-sm font-bold  ml-4">
                        {resume_cv}
                    </h3>
                </div>
            </div>
            <MinNavbar activeSection="someSection"/>
            <InterviewCard {...interviewData}/>
            <WorkExperienceCard experiences={experiencesData} />
        </div>
    )
}
