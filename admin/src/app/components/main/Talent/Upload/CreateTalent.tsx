'use client'
import React, { useState, useCallback } from 'react'
import ProgressBar from '@/app/components/sub/ProgressBar';
//pourl'icone de l'upload	
import { MdOutlineDriveFolderUpload } from "react-icons/md";
// pour les redirection
import Link from 'next/link';
//pour le drag and drop
import { useDropzone } from 'react-dropzone';

export default function CreateTalent() {
    // Hook pour cconnaitre l'étape du formulaire 
    const [step, setStep] = useState(2)
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null); // State pour l'URL Blob

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setUploadedFile(acceptedFiles[0]);
        }
    }, []);


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false,
    });

    const handleNext = () => {
        if (uploadedFile) {
            console.log('Uploaded File:', uploadedFile);
            // You can do something with the uploaded file, such as saving it
            // to a database or sending it to an API
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const blob = new Blob([fileReader.result as ArrayBuffer], { type: 'application/pdf' });
                const blobUrl = URL.createObjectURL(blob); // Création de l'URL Blob
                setPdfUrl(blobUrl); // Mise à jour de l'état avec l'URL Blob
            };
            fileReader.readAsArrayBuffer(uploadedFile);

        } else {
            alert("Veuillez ajouter un fichier PDF")
        }

    };
    return (
        <div className='w-full min-h-screen flex flex-col  justify-center items-center   '>
            <div className="container flex flex-col w-[90%] min-h-screen bg-[#F3F0F0] p-8">
                {/* CONTENUE DU formulaire step by step */}
                <header className="header flex flex-col">
                    <Link href={"/"} className="logo w-6 h-auto self-start ml-3" >
                        <img src="LOGO.png" alt="" />
                    </Link>
                    <h2 className="step-title self-start font-bold text-lg   ml-3 mt-3">Etape {step}</h2>
                    <ProgressBar progress={99} />
                </header>
                <main className="main-content mt-10 min-h-[55vh] flex flex-col items-center  gap-3 w-full ">
                    <h1 className="upload-title self-start font-bold text-lg ml-10 ">Upload your resume</h1>
                    <div
                        className={`upload-area bg-[#E0DFDF] w-[90%] ${pdfUrl ? 'h-screen' : 'h-[50vh] '}  flex flex-col items-center justify-center cursor-pointer ${isDragActive ? 'border-[#165b77] border-[2px] bg-[#bddce7]' : 'border-gray-300'}`}  {...getRootProps()}>
                        {pdfUrl ?
                            <div className="w-[50vw] h-[80vh] mt-0">
                                <iframe src={pdfUrl} width="100%" height="100%" title="PDF Viewer" />
                            </div>
                            :
                            <div className="upload-icon">
                                <input {...getInputProps()} />
                                <MdOutlineDriveFolderUpload className='text-[#165b77] size-10 font-bold' />
                            </div>
                        }
                        {!uploadedFile ? <p className="upload-text text-[#165b77] font-bold">Drag & Drop or click to upload(.pdf)</p> : <p className='text-[#165b77] mt-4'> Fichier telechargé : {uploadedFile.name}</p>}
                    </div>
                    <button type='button' className="next-button w-[30%] py-2 bg-[#165b77] rounded-md text-white"
                        onClick={handleNext}>
                        NEXT
                    </button>
                </main>
{/* <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <button className="flex items-center text-blue-700 mb-4 font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3a1 1 0 00.293.707l2 2a1 1 0 001.414-1.414L11 9.586V7z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>
        <h2 className="text-xl font-semibold mb-6">Confirmation des details</h2>
        <form className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Noms"
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Prénoms"
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <input
            type="mail"
            placeholder="mail"
            defaultValue="talent@gmail.com"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="Numéro téléphone"
            defaultValue="(+221) 77 452 44 44"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Vos meilleurs compétences</h3>
            <p className="text-sm text-gray-500 mb-4">
              UjuzaUi utilise des technologies avancées pour connecter talents
              cachés et opportunités professionnelles, en valorisant équité et
              innovation.
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Main skill #1"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              <input
                type="text"
                placeholder="Main skill #2"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              <input
                type="text"
                placeholder="Main skill #3"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button className="py-1 px-4 bg-[#165477] text-white text-lg rounded-lg">
              Valider
            </button>
          </div>
        </form>
      </div>
    </div> */}
            </div>
           
          
        </div>
    )
}
