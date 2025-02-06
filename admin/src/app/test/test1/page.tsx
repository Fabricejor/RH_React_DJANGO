'use client'
import React from 'react';
import { GraduationCap, Search, Plus } from 'lucide-react';

type Formation = {
  nom: string;
  duree: string;
  skills: string[];
  niveauRequis: string;
};


export default function page() {
  const formations = [
    {
      nom: "Formation React Avancée",
      duree: "3 mois",
      skills: ["React", "Redux", "TypeScript"],
      niveauRequis: "Master",
      status: "selection en cours",
    },
    {
      nom: "Data Science Bootcamp",
      duree: "6 mois",
      skills: ["Python", "Machine Learning", "SQL"],
      niveauRequis: "bts ou equivalent",
      status:" candidature cloturé"
    },
    {
      nom: "UX/UI Design",
      duree: "3 mois",
      skills: ["Figma", "Adobe XD", "Prototypage"],
      niveauRequis: "baccalauréat",
      status:"candidature ouverte"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-yellow-500" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">Toutes les formations</h1>
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md shadow-sm transition-colors">
              <Plus className="h-5 w-5 mr-2" />
              Nouvelle formation
            </button>
          </div>
          {/* <p className="mt-2 text-gray-600">Découvrez nos formations et développez vos compétences.</p> */}
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une formation..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Formation Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formations.map((formation, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{formation.nom}</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium">Durée:</span>
                    <span className="ml-2">{formation.duree}</span>
                  </div>
                  <div><div className="flex items-center text-gray-600">
                    <span className="font-medium">Niveau requis:</span>
                    <span className="ml-2">{formation.niveauRequis}</span>
                  </div>
                    <span className="font-medium text-gray-600">Compétences:</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formation.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 flex items-center text-gray-600">
                    <span className="font-medium text-xs">status:</span>
                    <span className="px-3 py-1 bg-green-200 text-green-900 rounded-full font-bold text-xs">{formation.status}</span>
                  </div>
                  </div>
                  
                </div>
                <button className="mt-4 w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md shadow-sm transition-colors">
                  Voir les détails
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
