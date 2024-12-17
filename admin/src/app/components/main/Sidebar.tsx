'use client'
import React from 'react'
import { useState } from 'react';
import "../../globals.css"

// codes
import { FaArtstation } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { CiSearch,CiCalculator2 ,CiSettings ,CiUser ,CiPower } from "react-icons/ci";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
export default function Sidebar() {
    const [open, setOpen] = useState(true);// hooks pour connaitre letat du button qui va reduire le sidebar
    const [submenuOpen, setSubmenuOpen] = useState(false);// hooks pour connaitre letat des sous menus

    const Menus = [
        {title:"search", icon:<CiSearch/>},
        {title:"jobs", icon:<HiOutlineClipboardDocumentList/>},
        {title:"cosinus_similarity", icon:<CiCalculator2 />},
        {title:"settings", icon:<CiSettings/>},
        {title:"profils", icon:<CiUser/>},
        {title:"deconnexion", icon:<CiPower/>},

    ]
    return (
        <div className='flex h-screen'>
            <div className={`sidebar bg-emerald-600 flex flex-col h-screen p-5 pt-8 ${open ? "w-52" : "w-20"} duration-700 ease-out  relative `}>
                <FaArrowAltCircleRight
                    className={`bg-white text-purple-dark text-3xl  rounded-full absolute -right-3 top-9 border-purple-dark border  cursor-pointer
                                    ${open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="infline-flex">
                    <FaArtstation className={`bg-amber-300 text-3xl rounded cursor-pointer   block float-left mr-2 duration-500 ${open && "rotate-[360deg]"} `} />
                    <h1 className={`text-white origin-left font-light text-lg ${!open && "scale-0 hidden"}`} >Admin</h1>
                </div>
                <ul className='pt-2'>
                    {Menus.map((menu,index) => {
                        return(<>
                            <li key={index} className={` text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-searchfield rounded-md mt-2`} >
                                <span className='text-2xl block float-left' >{menu.icon}</span>
                                {menu.title}
                            </li>
                        </>)
                    })}

                </ul>
            </div>

        </div>
    )
}
