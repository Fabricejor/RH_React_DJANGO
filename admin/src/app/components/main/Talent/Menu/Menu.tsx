'use client'
import React, { useEffect, useState } from "react";
import Footer from "@/app/components/layouts/Footer";
import Navbar from "@/app/components/layouts/Navbar";

export default function Menu() {
    return (
        <>
            <Navbar />
            <div className="bg-gray-50 min-h-screen flex flex-col items-center">

                {/* Profile Section */}
                <div className="mt-6 flex w-full max-w-5xl space-x-6">
                    {/* Left Section */}
                    <div className="flex-1 bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Nom & Prenom</h2>
                                <p className="text-gray-500">Votre poste</p>
                                <p className="text-gray-500">Localisation</p>
                            </div>
                            <button type="button" className="text-[#165b77] underline">Préférence job</button>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-80 space-y-4">
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="font-semibold text-gray-800">Curriculum Vitae</h3>
                            <p className="text-gray-500 text-sm">
                                Uploadez votre cv pour completer votre profil
                            </p>
                            <button type="button" className="mt-4 w-full bg-[#165b77] text-white py-2 rounded-md">
                                import CV
                            </button>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="font-semibold text-gray-800">Votre profil</h3>
                            <p className="text-gray-500 text-sm">
                                Ajoutez plus de details pour avoir de meilleurs résultats.
                            </p>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="mt-8 w-full max-w-5xl">
                    <div className="flex space-x-6 border-b border-gray-200">
                        <button className="text-emerald-600 border-b-2 border-green-600 px-4 py-2">
                            À propos
                        </button>
                        <button type="button" className="text-gray-500 px-4 py-2">Experience</button>
                        <button type="button" className="text-gray-500 px-4 py-2">Education</button>
                    </div>

                    <div className="mt-6 flex flex-col space-y-4 mb-10">
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="font-semibold text-gray-800">Intro</h3>
                            <p className="text-gray-500 text-sm">
                                {/* Use this space to let folks know who you are. */}
                            </p>
                            <button className="text-[#16] underline mt-2">+</button>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="font-semibold text-gray-800">Links</h3>
                            <p className="text-gray-500 text-sm">
                                Ajoutez votre profil linkedin
                            </p>
                            <button className="text-blue-600 underline mt-2">+</button>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="font-semibold text-gray-800">Languages</h3>
                            <p className="text-gray-500 text-sm">
                                Ajoutez Les langues que vous maitrisez
                            </p>
                            <button className="text-blue-600 underline mt-2">+</button>
                        </div>
                    </div>
                </div>


            </div>
            {/* Footer */}
            <Footer />
        </>
    )
}
