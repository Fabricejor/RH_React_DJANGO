import React from "react";
import Link from "next/link";

export default function Navbar({}) {
    return (
        <header className=" header bg-white px-5 py-3 sticky top-0 z-50 ">
            {" "}
            <div className="header__container flex items-center justify-between max-w-[1200px] mx-auto my-0 px-[20px] py-0">
                <div className="header__logo flex items-center">
                    <img src="/LOGO_UJUZAI_HD.png" className="w-[80px] mr-[10px]" alt="UjuzAi Logo" />
                </div>
                <nav className="header__nav">
                    <ul className="header__nav-list flex">
                        <li className="header__nav-item border-[1.5px] rounded border-[#165b77] ml-[20px] group hover:text-white hover:bg-[#165b77] hover:border-[#165b77]">
                            <Link href="pages/talents" className="header__nav-link group-hover:text-white text-sm text-[#165b77] font-semibold px-[15px] py-[0px] rounded-sm duration-[1s]  ">
                                Talents
                            </Link>
                        </li>
                        <li className="header__nav-item border-[1.5px] rounded border-[#165b77] ml-[20px] group hover:text-white hover:bg-[#165b77] hover:border-[#165b77]">
                            <Link href="#" className="header__nav-link group-hover:text-white text-sm text-[#165b77] font-semibold px-[15px] py-[0px] rounded-sm duration-[1s]  ">
                                Recruteur
                            </Link>
                        </li>
                        <li className="header__nav-item border-[1.5px] rounded border-[#165b77] ml-[20px] group hover:text-white hover:bg-[#165b77] hover:border-[#165b77] ">
                            <Link href="#" className="header__nav-link group-hover:text-white text-sm text-[#165b77] font-semibold px-[15px] py-[0px] rounded-sm duration-[1s]  ">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="header__actions flex items-center h-full ">
                    <button type="button"
                        className="header__button px-[10px] py-2 rounded-md text-xs ml-[10px] duration-100 ease-in text-white bg-[#165b77] hover:opacity-[0.8] ">
                        Inscription
                    </button>
                    <button type="button"
                        className="header__button px-[10px] py-2 rounded-md text-xs ml-[10px] duration-100 ease-in text-white bg-[#165b77] hover:opacity-[0.8]  "
                        // onClick={openModal}
                    >
                        Connexion
                    </button>
                </div>
            </div>
        </header>
    );
}
