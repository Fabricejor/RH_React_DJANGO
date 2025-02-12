// components/WorkExperienceCard.tsx
import React from 'react';

interface Experience {
  title: string;
  company: string;
  dates: string;
  description: string;
  prestige?: 'Good' | 'Prestigious'; // Type optionnel pour le prestige
}

interface WorkExperienceCardProps {
  experiences: Experience[];
}

const WorkExperienceCard: React.FC<WorkExperienceCardProps> = ({ experiences }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6" id="experience">
      <h2 className="text-2xl font-bold mb-4">Experience Professionelle</h2>
      <div className="flex">
        {/* <div className="w-1/4 pr-6"> 
          <ul className="relative flex flex-col justify-between items-baseline">
            {experiences.map((exp, index) => (
              <li key={index} className="mb-4 relative pl-6"> 
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#165b77] rounded-full"></span> 
                {index < experiences.length -1 && (
                    <div className="absolute left-1/2 -ml-[1px] top-4 bottom-0 w-[2px] bg-gray-300"></div>
                )}
                <span className="text-gray-600 text-sm italic">{exp.dates}</span>
              </li>
            ))}
          </ul>
        </div> */}
        <div className="w-full"> {/* Colonne pour les détails de l'expérience (3/4 de la largeur) */}
          {experiences.map((exp, index) => (
            <div key={index} className='flex flex-row justify-start'>
              <div className='flex flex-row w-1/3 items-center'>
                <span className="left-0  w-4 h-4 bg-[#165b77] rounded-full"></span> {/* Puce */}
                <span className="ml-2 text-gray-600 text-sm italic">{exp.dates}</span>
              </div>
              <div className="mb-6 w-2/3">
                <h3 className="font-semibold">{exp.title}</h3>
                <p className="text-gray-600">{exp.company}</p>
                {exp.prestige && <span className={`inline-block ml-2 px-2 py-1 rounded-full text-xs font-medium ${exp.prestige === 'Good' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{exp.prestige}</span>}
                <p className="mt-2 text-sm">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkExperienceCard;