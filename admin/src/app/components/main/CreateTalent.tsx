'use client'
import React , {useState , useCallback} from 'react'
import ProgressBar from '../sub/ProgressBar'
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import Link from 'next/link';
import { useDropzone } from 'react-dropzone';

export default function CreateTalent() {
    // Hook pour cconnaitre l'étape du formulaire 
    const [step,setStep]= useState(1)

     const { getRootProps, getInputProps, isDragActive } = useDropzone({
            accept: { 'application/pdf': ['.pdf'] },
            multiple: false,
        });
    return (
        <div className='w-full min-h-screen flex  justify-center items-center   '>
            <div className="container flex flex-col w-[90%] h-screen bg-[#F3F0F0] p-8">
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
                    <div className="upload-area bg-[#E0DFDF] w-[90%] h-[100%] flex flex-col items-center justify-center cursor-pointer"  {...getRootProps()}>
                        <div className="upload-icon" {...getInputProps()}>
                        <input {...getInputProps()} />
                            <MdOutlineDriveFolderUpload />
                        </div>
                        <p className="upload-text">Drag & Drop or click to upload(.pdf)</p>
                    </div>
                    <button type='button' className="next-button w-[30%] py-2 bg-[#165b77] rounded-md text-white">NEXT</button>
                </main>
            </div>
        </div>
    )
}
