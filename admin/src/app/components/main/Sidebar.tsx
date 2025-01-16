'use client'
import React from 'react'
import { useState } from 'react';
import "../../globals.css"

import Link from 'next/link';
// icones
import { FaCalculator, FaRegUser, FaPowerOff } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FiClipboard } from "react-icons/fi";
// import { FaArrowAltCircleRight } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
// components
import JobsForm from './JobsForm';
import TalentMenu from './TalentMenu';
import MenuOffre from './MenuOffre';
import CalculSimilarity from './CalculSimilarity';

export default function Sidebar() {
    // const [open, setOpen] = useState(true);// hooks pour connaitre letat du button qui va reduire le sidebar
    const [activeMenu, setActiveMenu] = useState('Talents'); // Initial active menu

    const Menus = [
        { title: "search", icon: <FaSearch />, handleClick: () => setActiveMenu('Talents') },
        { title: "jobs", icon: <FiClipboard />, handleClick: () => setActiveMenu('jobs') },
        { title: "cosin_sim", icon: <FaCalculator />  , handleClick: () => setActiveMenu('cosin_sim') },
        { title: "settings", icon: <IoSettingsOutline />, handleClick: () => setActiveMenu('settings') },
        { title: "profil", icon: <FaRegUser /> },
        { title: "log off", icon: <FaPowerOff /> },

    ]
    return (
        <div className='flex w-full '>
            <div className={`sidebar bg-[] border-red-700 border-solid shadow-xl shadow-[#165b77] flex flex-col h-screen p-4 pt-8  w-16 duration-700 ease-out  relative `}>
                {/* <FaArrowAltCircleRight
                    className={`bg-white  text-[#165b77] text-2xl  rounded-full absolute -right-4 top-9 border-purple-dark border  cursor-pointer`}
                    // onClick={() => setOpen(!open)}
                /> */}
                <div className="infline-flex">
                    <img src="LOGO.png" alt="logo" className={`w-[1.8rem] rounded cursor-pointer   block float-left mr-2 duration-500 `} />
                    {/* <FaArtstation className={`bg-amber-300 text-3xl rounded cursor-pointer   block float-left mr-2 duration-500 ${open && "rotate-[360deg]"} `} /> */}
                    {/* <h1 className={`text-[#165b77] origin-left font-bold text-lg ${!open && "scale-0 hidden"}`} >JuzAi</h1> */}
                </div>
                <ul className='pt-2'>
                    {Menus.map((menu,) => {
                        return (
                            <li key={menu.title} className={`  text-white text-xs flex flex-col items-center gap-x-2 cursor-pointer p-2 my-4 hover:bg-[#cce6f0] rounded-md mt-2`} onClick={menu.handleClick} >
                                <span className='text-lg block  text-[#165b77]' >{menu.icon}</span>
                                {/* <Link href={"#"} className={`text-base font-medium flex-1 duration-300 text-[#165b77] ${!open && "hidden"}`} >{menu.title}</Link> */}

                                <span className={`text-[10px] font-medium flex-1 duration-300 text-black text-nowrap `} >{menu.title}</span> {/* Remove Link */}
                            </li>
                        )
                    })}

                </ul>
            </div>
            <div className='componant-render ml-1 w-full '>
                {activeMenu === 'Talents' && <TalentMenu />}
                {activeMenu === 'jobs' && <MenuOffre />}
                {/* {activeMenu === 'settings' && <MenuOffre />} */}
                {activeMenu === 'cosin_sim' && <CalculSimilarity />}
                    
            </div>
        </div>
    )
}
