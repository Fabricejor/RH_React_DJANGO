'use client'
import React from 'react'
import { useState } from 'react';
import "../../globals.css"

import Link from 'next/link';
// icones
import { FaCalculator,FaRegUser ,FaPowerOff } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FiClipboard } from "react-icons/fi";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
// components
import JobsForm from './JobsForm';

export default function Sidebar() {
    const [open, setOpen] = useState(true);// hooks pour connaitre letat du button qui va reduire le sidebar

    const Menus = [
        {title:"search", icon:<FaSearch/>},
        {title:"jobs", icon:<FiClipboard/>},
        {title:"cosin_sim", icon:<FaCalculator/>},
        {title:"settings", icon:<IoSettingsOutline/>},
        {title:"profils", icon:<FaRegUser/>},
        {title:"deconnexion", icon:<FaPowerOff/>},

    ]
    return (
        <div className='flex w-full h-screen'>
            <div className={`sidebar bg-[] border-red-700 border-solid shadow-xl shadow-[#165b77] flex flex-col h-screen p-4 pt-8 ${open ? "w-52" : "w-16"} duration-700 ease-out  relative `}>
                <FaArrowAltCircleRight
                    className={`bg-white  text-[#165b77] text-2xl  rounded-full absolute -right-4 top-9 border-purple-dark border  cursor-pointer
                                    ${open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="infline-flex">
                    <img src="LOGO.png" alt="logo" className={`w-[1.8rem] rounded cursor-pointer   block float-left mr-2 duration-500 ${open && "rotate-[360deg]"}`} />
                    {/* <FaArtstation className={`bg-amber-300 text-3xl rounded cursor-pointer   block float-left mr-2 duration-500 ${open && "rotate-[360deg]"} `} /> */}
                    <h1 className={`text-[#165b77] origin-left font-bold text-lg ${!open && "scale-0 hidden"}`} >JuzAi</h1>
                </div>
                <ul className='pt-2'>
                    {Menus.map((menu,) => {
                        return(<>
                            <li key={menu.title} className={`   text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 my-8 hover:bg-[#cce6f0] rounded-md mt-2`} >
                                <span className='text-lg block float-left text-[#165b77]' >{menu.icon}</span>
                                <Link href={"#"}  className={`text-base font-medium flex-1 duration-300 text-[#165b77] ${!open && "hidden"}`} >{menu.title}</Link>
                            </li>
                        </>)
                    })}

                </ul>
            </div>
            <div className='componant-render ml-2 w-full'>
                    <JobsForm/>
            </div>
        </div>
    )
}
