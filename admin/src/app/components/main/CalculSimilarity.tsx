'use client'
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import Loading from "@/app/loading";
import { IoMdOptions } from "react-icons/io";

type Option = {
    label: string;
    value: string;
  };
const CalculSimilarity: React.FC = () => {
    const [cvOptions, setCvOptions] = useState<Option[]>([]);
    const [offerOptions, setOfferOptions] = useState<Option[]>([]);
  
    const [selectedCvs, setSelectedCvs] = useState<Option[]>([]);
    const [selectedOffer, setSelectedOffer] = useState<string>(""); // Single selected value for the second select
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<
      { id_cv: string; cosine_similarity: number; nom_prenom: string; mail: string; domaine_etude: string }[]
    >([]);
  
    // Fetch data from the API
    useEffect(() => {
      const fetchCvOptions = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/cvs/");
          const options = response.data.map(
            (item: { id_cv: number; nom_prenom: string }) => ({
              label: item.nom_prenom,
              value: item.id_cv.toString(),
            })
          );
          setCvOptions(options);
        } catch (error) {
          console.error("Error fetching CV options:", error);
        }
      };
  
      const fetchOfferOptions = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/offers/");
          const options = response.data.map(
            (item: { id_offre: number; titre: string }) => ({
              label: item.titre,
              value: item.id_offre.toString(),
            })
          );
          setOfferOptions(options);
        } catch (error) {
          console.error("Error fetching Offer options:", error);
        }
      };
  
      fetchCvOptions();
      fetchOfferOptions();
    }, []);
  
    // Function to submit data
    const handleSubmit = async () => {
      if (!selectedOffer) {
        alert("Sélectionnez une offre!");
        return;
      }
  
      if (selectedCvs.length === 0) {
        alert("Selectionnez au moins un Candidat!");
        return;
      }
      setIsLoading(true);
      const newResults = [];
      for (const cv of selectedCvs) {
        try {
          const response = await axios.post("http://localhost:8000/api/results/calculate_similarity/", {
            id_cv: cv.value,
            id_offre: selectedOffer,
          });
  
          newResults.push({
            id_cv: cv.value,
            cosine_similarity: response.data.cosine_similarity,
            nom_prenom: response.data.nom_prenom,
            mail: response.data.mail,
            domaine_etude: response.data.domaine_etude,
          });
        } catch (error) {
          console.log(`Error submitting id_cv: ${cv.value} with id_offre: ${selectedOffer}`, error);
        }
      }
      setIsLoading(false);
      setResults(newResults);
    };

    return (
       <div className="bg-white p-8">
             <div>
               <h2 className='italic text-[#165b77] text-xl font-semibold'> Cosine Similarity</h2>
             </div>
       
             {/* MultiSelect for CVs */}
             <div className="flex space-x-4 mb-8 items-center">
               <div className="w-1/2">
               <label htmlFor="candidat" className="block text-sm font-medium text-gray-700 mb-1">
                               Candidat
               </label>
               <div className="focus-within:ring-2 focus-within:ring-[#165b77] border border-gray-300 bg-white rounded-md shadow-sm">
                 <MultiSelect
                   options={cvOptions}
                   value={selectedCvs}
                   onChange={setSelectedCvs}
                   labelledBy="Select CVs"
                   hasSelectAll={false}
                   // className=" focus:border-[#165b77] focus:outline-1 focus:outline-[#165b77] focus:ring-[#165b77]"
                   className=""
                 />
                 </div>
               </div>
       
               {/* Single Select for Offers */}
               <div className="w-1/2">
                   <label htmlFor="offre" className="block text-sm font-medium text-gray-700 mb-1">
                               Offre
                           </label>
                 <select
                   title='offre'
                   value={selectedOffer}
                   onChange={(e) => setSelectedOffer(e.target.value)}
                    className="mt-1 block w-full rounded-md border-2  bg-white py-2 px-3 shadow-sm focus:border-[#165b77] focus:outline-1 focus:outline-[#165b77] focus:ring-[#165b77] sm:text-sm"
                 >
                   <option value="" disabled>
                     Selectionner une offre
                   </option>
                   {offerOptions.map((option) => (
                     <option key={option.value} value={option.value}>
                       {option.label}
                     </option>
                   ))}
                 </select>
               </div>
                {/* Submit Button */}
             <div className="flex items-center mt-6">
               <button
                 type="button"
                 onClick={handleSubmit}
                 className="bg-[#165b77]  text-white text-base font-medium py-2 px-4 rounded-xl flex flex-row items-center justify-between  hover:bg-teal-500 transition duration-200"
               >
                 Submit
               </button>
             </div>
             </div>
       
            
       
             {/* Display Results */}
             <div className='flex flex-col'>
               <div className="flex justify-between items-center mb-4">
                                   <h3 className="text-lg font-medium">Voici les résultat</h3>
                                   <span className="text-green-600 hover:text-green-900 text-sm font-medium">
                                       <IoMdOptions />
                                   </span>
                               </div>
               {results.length > 0 ? (
                <ul className="divide-y  divide-gray-200">
                     {results.map((result, index) => (
                       <li key={index} className="py-4">
                       <div className="flex items-center space-x-10  ">
                           {/* Image du profil (omis pour simplifier) */}
                           <div className="flex-1 min-w-0">
                               <p className="text-sm font-medium text-gray-900 truncate">{result.nom_prenom}</p>
                               <p className="text-sm text-gray-500 truncate">{result.mail}</p>
                           </div>
                           <div>
                               {parseFloat((result.cosine_similarity * 100).toFixed(2)) > 60 ?
                                   <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                       {(result.cosine_similarity * 100).toFixed(2)}%
                                   </span>
                                   :
                                   <span className="inline-flex items-center rounded-full bg-red-200 px-2.5 py-0.5 text-xs font-medium text-red-600">
                                       {(result.cosine_similarity * 100).toFixed(2) }%
                                   </span>
                               }
       
                           </div>
                           <div className='button-container'>
                               <button type='button' className="bg-[#165b77]  text-white text-xs font-medium py-2 px-4 rounded-xl flex flex-row items-center justify-between  hover:bg-teal-500 transition duration-200">
                                   voir plus
                               </button>
                           </div>
                       </div>
                   </li>
                       
                     ))}
                  </ul>
               ) : (
                 ( isLoading) ? 
                   <Loading />
                 :
                 <p>Aucun résultats pour le moment</p>
               )}
             </div>
           </div>
    );
};

export default CalculSimilarity;