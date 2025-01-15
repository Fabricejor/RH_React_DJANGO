import { link } from 'fs';
import React from 'react'
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { MdTrendingFlat } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";

import Link from 'next/link'
interface Props {
    user_id: any,
    cosine_similarity: number,
    nom_prenom: string,
    offre_id: number,
    domaine_etude: string,
}
export default function ResultCard({ user_id, cosine_similarity, nom_prenom, offre_id, domaine_etude }: Props) {
    const formattedSimilarity = (cosine_similarity * 100).toFixed(2);  // Multiply by 100 and format to 4 decimal places
    return (
        <div className='w-full h-full flex flex-row items-center justify-between p-4 hover:bg-green-50 transition-all  cursor-pointer'>
            <div className='flex'>
                <img src="https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?t=st=1735573212~exp=1735576812~hmac=d6e18ea14f6b96324c73902554e3c1e35b316636a71841e4fa2c5f18f31333db&w=740" alt={nom_prenom}
                    className='w-12 h-12 rounded-full mr-4' />
                <div className='flex flex-col '>
                    <h3 className="text-sm font-bold">{nom_prenom}</h3>
                    <p className="text-xs text-gray-500 text-wrap">{domaine_etude}</p>
                </div>
            </div>
            <div className=' info flex flex-row items-center'>
                {(parseFloat(formattedSimilarity) < 50) ? 
                <span className=" flex flex-row items-center text-xs text-red-600 px-2 py-1 bg-red-100 rounded-full mr-4"><FaArrowTrendDown className='mr-2'/> <p>{formattedSimilarity}</p> %</span>
                :
                (parseFloat(formattedSimilarity) < 70) ?
                <span className=" flex flex-row items-center text-xs text-yellow-600 px-2 py-1 bg-yellow-100 rounded-full mr-4"><MdTrendingFlat className='mr-2'/> <p>{formattedSimilarity}</p> %</span>
                :
                <span className=" flex flex-row items-center text-xs text-green-600 px-2 py-1 bg-green-100 rounded-full mr-4"><FaArrowTrendUp className='mr-2'/> <p>{formattedSimilarity}</p> %</span> }
                <p className='status ml-4'> status </p>
            </div>
            <div className=' options flex flex-row items-center gap-3'>
                <button type='button' className='bg-[#165b77] text-sm p-1 rounded-lg text-white' title='changer statut'> <FiEdit /></button>
                <Link href={`/dashboard/${user_id}`} className='bg-[#165b77] text-sm p-1 rounded-lg text-white' title='voir profil'> <IoIosSearch /></Link>
            </div>
        </div>
    )
}
