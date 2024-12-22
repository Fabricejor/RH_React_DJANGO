import React from 'react'

export default function Heros() {
  return (
    <section className="hero flex items-center justify-between  px-6 py-0  relative overflow-hidden min-h-[80vh] before:absolute before:w-full before:h-full before:-z-10 before:opacity-40 ">
    <div className="hero__content max-w-full p-3 ">
        <h1 className="hero__title text-[3rem] mb-[30px] leading-[1.6] text-nowrap">
            Révéler les <span className="hero__title--highlight bg-[#165b77] text-[#E1AD01] px-[20px] py-[10px] rounded-full hero__title--talents">Talents</span> <br/>
            Invisibles par <span className="hero__title--highlight bg-[#165b77] text-[#E1AD01] px-[20px] py-[10px] rounded-full hero__title--intelligence">l'Intelligence</span> <br/>
            <span className="hero__title--highlight bg-[#165b77] text-[#E1AD01] px-[20px] py-[10px] rounded-full hero__title--artificielle">Artificielle</span>
        </h1>
        <p className="hero__description text-[1rem] mb-[30px] font-medium text-[#000] italic ">"Connectez talents et entreprises pour un avenir inclusif."</p>
        <div className="hero__buttons flex justify-center">
            <button className="hero__button px-1 py-2  duration-100 ease-in-out rounded mr-2 bg-[#E1AC0C] font-bold text-[#fff] text-xs hover:opacity-80  hero__button--talent">Créer un compte Talent</button>
            <button className="hero__button px-1 py-2  duration-100 ease-in-out rounded mr-2 bg-[#E1AC0C] font-bold text-[#fff] text-xs hover:opacity-80  hero__button--recruteur">Créer un compte Recruteur</button>
        </div>
    </div>
    <div className="hero__image max-w-[40%] ml-0 ">
        <img src="hero-image.png" alt="Illustration de talents"/>
    </div>
</section>
  )
}
