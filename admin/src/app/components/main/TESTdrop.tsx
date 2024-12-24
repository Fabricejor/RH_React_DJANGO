// components/ResumeUploader.js
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ResumeUploader = () => {
    const [uploadedFile, setUploadedFile] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
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
        } else {
            alert("Veuillez ajouter un fichier PDF")
        }

    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
                <div className="flex items-center mb-6">
                    <span className="text-2xl font-semibold mr-2">
                        U
                    </span>
                    <h2 className="text-xl font-semibold">Etape 1</h2>
                </div>
                <div className="mb-4 flex items-center">
                    <div className="bg-blue-200 h-2 w-full rounded-full relative">
                        <div className="bg-blue-500 h-2 rounded-full w-1/4"></div>
                        <span className="absolute right-0 -top-3 translate-x-1/2 bg-white rounded-full border-2 border-blue-500 h-4 w-4"></span>
                    </div>
                </div>

                <h3 className="text-2xl font-semibold mb-4">Upload your resume</h3>
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-md p-10 flex flex-col items-center justify-center text-gray-500 ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                        } hover:border-blue-500 cursor-pointer transition-colors duration-200`}
                >
                    <input {...getInputProps()} />
                    <div className="mb-2">
                        <svg
                            className="w-10 h-10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 17v-2m3 2v-4m3 4v-2m3 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>

                    </div>
                    <p>
                        Drag & Drop or click to upload (.pdf)
                    </p>
                    {uploadedFile && <p className='text-green-500 mt-4'> Fichier telechargé : {uploadedFile.name}</p>}
                </div>

                <button
                    onClick={handleNext}
                    className="mt-6 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 w-full"
                >
                    NEXT
                </button>
            </div>
        </div>
    );
};

export default ResumeUploader;