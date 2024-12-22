import React from 'react'
import Link from 'next/link'
export default function Footer() {
  return (
    <footer className="footer bg-[#165b77] px-[20px] py-0 text-white relative">
            <div className="footer__container max-w-[1200px] mx-0 my-auto  px-0 py-[20px] flex justify-between items-center  ">
                 <div className="footer__logo flex items-center">
                     <img src="LOGO_UJUZAI_fond_sombre.png" className='w-40 mr-3' alt="UjuzAi Logo"/>
                </div>
                <nav className="footer__nav flex-1 flex justify-center">
                    <ul className="footer__nav-list flex flex-col text-start">
                        <li className="footer__nav-item ml-[20px]"><Link href="#" className="footer__nav-link text-white text-[0.9rem]">ACCUEIL</Link></li>
                        <li className="footer__nav-item ml-[20px]"><Link href="#" className="footer__nav-link text-white text-[0.9rem]">QUI SOMMES-NOUS ?</Link></li>
                        <li className="footer__nav-item ml-[20px]"><Link href="#" className="footer__nav-link text-white text-[0.9rem]">POLITIQUES DE CONFIDENTIALITE</Link></li>
                        <li className="footer__nav-item ml-[20px]"><Link href="#" className="footer__nav-link text-white text-[0.9rem]">CONDITIONS D'UTILISATION</Link></li>
                    </ul>
                </nav>
                 <div className="footer__actions text-right">
                    <ul className="footer__actions-list flex flex-col">
                        <li className="footer__actions-item ml-[20px]"><Link href="#" className="footer__actions-link text-[#fff] text-[1.1rem]">TALENTS</Link></li>
                        <li className="footer__actions-item ml-[20px]"><Link href="#" className="footer__actions-link text-[#fff] text-[1.1rem]">RECRUTEURS</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
  )
}
