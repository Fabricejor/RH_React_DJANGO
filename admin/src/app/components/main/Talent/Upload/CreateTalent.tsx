'use client'
import ProgressBar from '@/app/components/sub/ProgressBar';
//pourl'icone de l'upload	
import { MdOutlineDriveFolderUpload } from "react-icons/md";
// pour les redirection
import Link from 'next/link';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { GoogleGenerativeAI } from "@google/generative-ai";


interface PdfData {
  nom: string;
  domaine_etude: string;
  experience: string[];
  langues: string[];
}
export default function CreateTalent() {
  // Hook pour cconnaitre l'étape du formulaire 
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [summary, setSummary] = useState<PdfData | null>(null);
  const [isloading, setIsloading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setPdfFile(file);
      setPdfUrl(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/pdf': ['.pdf'] } });

  const handleAnalyzePdf = async () => {
    setIsloading(true);

    if (!pdfFile) {
      console.error("Pas de fichier PDF à analyser.");
      return;
    }

    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!API_KEY) {
      console.error("La clé API Gemini n'est pas définie dans les variables d'environnement.");
      return;
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });


    const reader = new FileReader();

    reader.onload = async (event) => {

      if (!event.target || !event.target.result) {
        console.error("Erreur de lecture du fichier PDF.");
        return;
      }

      const pdfBase64 = event.target.result.toString().split(',')[1];

      const prompt = `
                  Extrait les informations suivantes du contenu PDF, puis fournis le resultat au format JSON sans faire de markdown renvoie uniquement ces valeurs sans formattage, et sans aucun texte supplementaire:
                  -nom_prenom est le nom complet que tu retrouvera dans le pdf
                  -mail est le mail que tu retrouvera dans le pdf si il existe
                  -numero_tlfn est le numero de telephone dans le pdf si il existe 
                  -cv_text est le contenu du cv dans le pdf (tous le texte du pdf) sans '\n'
                  -cv_pretraite est le contenu du cv pretraite dans le pdf c'est a dire le cv_text mais sans les ponctuations et les mots vides (les articles)et sans majiscule
                  -competences est une liste de competences dans le pdf chaque competence devra etre synthetisé/résumé en minimum un mot et maximum deux ou trois mots sans de mots vide
                  -domaine_etude qui soit apparaitra clairement soite devra etre synthetisé a partir de l'education trouvé dans le pdf
                  -experience doit contenir toutes les expériences listées dans le document. Chaque entrée du tableau 'experience' doit être un objet JSON contenant les champs 'poste','date_debut','date_fin','entreprise' et 'missions'[qui devra etre le contenue de l'experience profesionnel]
                  -langues doit contenir toutes les langues listées dans le document. Chaque entrée du tableau 'langues' doit contenir le nom de la langue
                  -resume_cv est le resume du cv de maniere à présenter le profil du cv de maniere attrayante et professionnelle(sans de pronom personel) en une phrase de maximum quinze mots
                  {
                  "nom_prenom": "",
                  "mail":"",
                  "numero_tlfn":"",
                  "cv_text": "",
                  "cv_pretraite": "",
                  "competences":[],
                  "domaine_etude": "",
                  "experience": [],
                  "langues": [],
                  "resume_cv":"",
                  }
                
                `;
      try {
        const result = await model.generateContent({
          contents: [{
            role: "user",
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: "application/pdf",
                  data: pdfBase64,
                }
              }
            ]
          }]
        });

        const response = await result.response;
        if (response.text()) {
          try {
            const jsonString = response.text().replace(/^```json\n/, '').replace(/\n```$/, ''); // Suppression des balises
            const parsedSummary = JSON.parse(jsonString);
            setSummary(parsedSummary);
          } catch (e) {
            setIsloading(false);
            console.log("Valeur du json:", response.text())
            console.error("Erreur de conversion du JSON:", e);
          }
        } else {
          console.error("La réponse de Gemini est vide.");
        }
      } catch (error) {
        console.error("Erreur lors de l'appel à l'API Gemini:", error);
      }
    };

    reader.readAsDataURL(pdfFile);
    setIsloading(false);

  }

  return (
    <div className='w-full min-h-screen flex flex-col  justify-center items-center   '>
      <div className="container flex flex-col w-[90%] min-h-screen bg-[#F3F0F0] p-8">
         {/* CONTENUE DU formulaire step by step */}
         <header className="header flex flex-col">
                    <Link href={"/"} className="logo w-6 h-auto self-start ml-3" >
                        <img src="/LOGO.png" alt="logo" />
                    </Link>
                    <h2 className="step-title self-start font-bold text-lg   ml-3 mt-3">Etape 1</h2>
                    <ProgressBar progress={50} />
                </header>
        <main className="main-content mt-10 min-h-[55vh] flex flex-col items-center  gap-3 w-full ">
                <h1 className="upload-title self-start font-bold text-lg ml-10 ">Uploadez votre cv</h1>        
        <div {...getRootProps()} className={`dropzone p-4 mt-4 ${isDragActive ? 'active bg-blue-300 border border-blue-500 rounded p-1' : ' border  bg-gray-300 border-gray-500 rounded p-1'}`}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Déposez le PDF ici...</p>
          ) : (
            <p>Glissez-déposez un PDF, ou cliquez pour sélectionner un fichier</p>
          )}
        </div>
        {pdfUrl && (
          <div className=' border border-gray-300 w-full h-screen p-4 bg-emerald-600 flex items-center justify-center' style={{ marginTop: '20px' }}>
            <iframe src={pdfUrl} width="80%" className='h-screen' title="PDF Viewer" />
          </div>
        )}
        {pdfFile && (
          <button type='button' className='next-button w-[30%] py-2 bg-[#165b77] rounded-md text-white' disabled={isloading} onClick={handleAnalyzePdf} style={{ marginTop: '10px' }}>
            {isloading ? "Loading..." : 'Analyse du cv'}
          </button>
        )}

        {summary && (
          <div className="border border-green-300 p-8 w-full" style={{ marginTop: '20px' }}>
            <h2>Résumé du PDF</h2>
            <pre className='text-red-500 text-wrap'>{JSON.stringify(summary, null, 2)}</pre>
          </div>
        )}
        </main>
      </div>
    </div>
  )
}
