'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";


import {  FaVideo ,FaVideoSlash } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { MdHighlightOff } from "react-icons/md";

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
    interview:boolean;
}
interface skills {
    image: string;
}



const ProfilCard = ({ user_id, nom_prenom, mail, numero_tlfn, profil, competences, resume_cv, disponibilite, domaine_etude,interview }: Props) => {
    const tab = [
        // { image: "https://img.freepik.com/photos-gratuite/jeune-bel-homme-posant-chapeau_23-2148884336.jpg?t=st=1735558831~exp=1735562431~hmac=d6e03e7e4ee9e0b9030855a57b0ceb859df4f2977bed010b4108b23f079f7175&w=740" },
        // { image: "https://img.freepik.com/photos-premium/memoji-homme-afro-americain-fond-blanc-emoji_826801-6858.jpg?w=740" },
        { image: "https://img.freepik.com/photos-gratuite/portrait-adolescente-africaine-visage-souriant-heureux_53876-146757.jpg?t=st=1735559046~exp=1735562646~hmac=23d00b71382fa29a81a1cb7dc7e4705850d42b211e69cecd2393ba37b30fc922&w=740" },
        // { image: "https://img.freepik.com/photos-gratuite/femme-africaine-smiley-boucles-oreilles-dorees_23-2148747979.jpg?t=st=1735559130~exp=1735562730~hmac=20fcf34a37290b231533575abc1ca8df702945c28cc38097593b3f7a8493ffa0&w=360" },
        { image: "https://img.freepik.com/photos-gratuite/portrait-femme-entrepreneur-peau-sombre-confiante-regard-serieux-porte-lunettes-rondes-chemisier-rouge-va-rencontrer-partenaires-etranger-se-prepare-presenter-societe-isole-blanc_273609-3653.jpg?t=st=1735559202~exp=1735562802~hmac=5e9f9ed797a0e4483dde302bf325029a32ae260ac7e4332913ce6bfbde1a11cd&w=826" },
        { image: "https://img.freepik.com/photos-gratuite/portrait-femme-affaires-confiant-visage-souriant_53876-137693.jpg?t=st=1735559219~exp=1735562819~hmac=86b4a99c46ebdc0a670e444dcc7e4cfb783136ca586c491cf5cf8dfb05dcc0b9&w=740" },
        // { image: "https://img.freepik.com/photos-gratuite/portrait-homme-serieux_23-2148779998.jpg?t=st=1735559234~exp=1735562834~hmac=7c07adcc6a7de618e1d06ca0307b38572729f11fde5ca0f2864cbc35ffe02700&w=360" },
        { image: "https://img.freepik.com/photos-premium/photo-studio-jeune-homme-affaires-africain-chauve-beau-fond-blanc_251136-84139.jpg?w=360" },
        // { image: "https://img.freepik.com/photos-gratuite/bel-homme-affaires-expression-deprimee_93675-129337.jpg?t=st=1735559532~exp=1735563132~hmac=1bba4e8730f847488aeb5e80f3c3f2cea5f6631bca0bf87ef62b56fa847b9e8f&w=740" },
    ];
    const [imageSrc, setImageSrc] = useState("defaultProfil.jpg"); // État pour la source de l'image
    const shuffleArray = (array: string[]) => {
        const newArray = [...array]; // Important : créer une copie pour ne pas modifier le tableau original
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const competencesAleatoires = shuffleArray(competences).slice(0, 2);
    useEffect(() => {
        // Fonction pour choisir une image aléatoire
        const choisirImageAleatoire = () => {
            if (tab && tab.length > 0) { // Vérifie que le tableau n'est pas vide
                const randomIndex = Math.floor(Math.random() * tab.length);
                setImageSrc(tab[randomIndex].image);
            }
        };
        choisirImageAleatoire();
    });


    return (
        <div className="ml-0 bg-white border rounded-lg shadow-md p-5 min-w-[512px] hover:shadow-[#165b77] z-10 ">
            {/* Header: Image, Nom et Expérience */}
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img
                        // src="https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?t=st=1735573212~exp=1735576812~hmac=d6e18ea14f6b96324c73902554e3c1e35b316636a71841e4fa2c5f18f31333db&w=740"
                        src={imageSrc}
                        alt="profile"
                        className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div className="ml-4">
                        <h2 className="text-xs font-semibold text-gray-800">{nom_prenom} | {domaine_etude}</h2>
                    </div>
                </div>
                <Link  href={`/compagny/dashboard/talent_details/${user_id}`} className="bg-[#165b77] hover:bg-[#163643] text-white text-center text-nowrap px-3 py-2 rounded-xl text-sm font-medium" >
                    voir plus
                </Link>
            </div>

            {/* Description */}
            <p className="text-gray-600 mt-4 text-xs text-wrap">
                {/* Enhanced security and productivity infrastructure at Cloudera as MTS-2. */}
                {resume_cv}
            </p>

            {/* Expert In */}
            <div className="flex flex-row w-full justify-between ">
                <div className="mt-6 w-[50%]">
                    <h3 className=" text-xs font-semibold  text-gray-800 mb-2">Disponibilité</h3>
                    <div className="flex flex-wrap gap-2 text-xs ">
                        {/* {["Python", "Django", "AWS", "Azure", "Kubernetes"].map((skill) => (
                            <span
                                key={skill}
                                className="bg-[#d0ebf5] text-[#165b77] px-2 py-1 rounded-full text-xs"
                            >
                                {skill}
                            </span>
                        ))} */}
                        {interview === true ? <p className="bg-green-400 text-white p-1 rounded-lg" title="entretien disponible"> < FaVideo /></p> : <p className="bg-red-400 text-white p-1 rounded-lg" title="entretien indisponible"> <FaVideoSlash /></p>}
                       {disponibilite === "disponible" ?<FaCheckCircle className="bg-green-400 text-white text-xl p-1  rounded-lg" title="Disponible"/> : <MdHighlightOff className="bg-red-400 text-white text-xl p-1 rounded-lg" title="Indisponible"/>}
   
                    </div>
                </div>

                {/* Commitment */}
                <div className="mt-6 flex flex-col">
                    {/* <h3 className="font-semibold text-gray-800 mb-2 text-xs self-end ">Commitment</h3> */}
                    <h3 className="font-semibold text-gray-800 mb-2 text-xs self-end ">SKILLS</h3>
                    <div className="flex gap-4 items-center">
                    {competencesAleatoires.map((competence, index) => (
                    <span
                        key={index}
                        className=" px-4 py-1 rounded-full text-xs text-nowrap bg-[#d0ebf5] text-[#165b77]"
                    >
                        {competence}
                    </span>
                ))}
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilCard;
