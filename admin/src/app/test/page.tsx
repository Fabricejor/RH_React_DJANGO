'use client'
import React, { useEffect, useState } from "react";

const Page: React.FC = () => {
 

  return (
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
            <button className="text-blue-600 underline">Préférence job</button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-80 space-y-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-gray-800">Curriculum Vitae</h3>
            <p className="text-gray-500 text-sm">
              Uploadez votre cv pour completer votre profil
            </p>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md">
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
          <button className="text-blue-600 border-b-2 border-blue-600 px-4 py-2">
            À propos
          </button>
          <button className="text-gray-500 px-4 py-2">Experience</button>
          <button className="text-gray-500 px-4 py-2">Education</button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-gray-800">Intro</h3>
            <p className="text-gray-500 text-sm">
              {/* Use this space to let folks know who you are. */}
            </p>
            <button className="text-blue-600 underline mt-2">+</button>
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

      {/* Footer */}
      <footer className="mt-16 bg-white w-full py-6 px-4 text-sm text-gray-500">
        <div className="max-w-5xl mx-auto flex justify-between">
          <p>© 2025 UjuzAI, Inc. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Cookie Policy
            </a>
            <a href="#" className="hover:underline">
              Condition d'utilisation
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;