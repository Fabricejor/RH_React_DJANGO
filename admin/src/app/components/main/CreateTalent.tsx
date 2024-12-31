'use client'
import React, { useState, useCallback } from 'react'
import ProgressBar from '../sub/ProgressBar'
//pourl'icone de l'upload	
import { MdOutlineDriveFolderUpload } from "react-icons/md";
// pour les redirection
import Link from 'next/link';
//pour le drag and drop
import { useDropzone } from 'react-dropzone';

export default function CreateTalent() {
    // Hook pour cconnaitre l'étape du formulaire 
    const [step, setStep] = useState(1)
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
                    <ProgressBar progress={60} />
                </header>
                <main className="main-content mt-10 min-h-[55vh] flex flex-col items-center  gap-3 w-full ">
                    <h1 className="upload-title self-start font-bold text-lg ml-10 ">Upload your resume</h1>
                    <div
                        className={`upload-area bg-[#E0DFDF] w-[90%] ${pdfUrl ? 'h-screen' : 'h-[50vh] '}  flex flex-col items-center justify-center cursor-pointer ${isDragActive ? 'border-[#165b77] border-[2px] bg-[#bddce7]' : 'border-gray-300'}`}  {...getRootProps()}>
                        {pdfUrl ?
                            <div className="w-[50vw] h-[80vh] mt-0"> {/* Ajustez la hauteur selon vos besoins */}
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

            </div>
           
          
        </div>
    )
}
