import React from 'react'

export default function About() {
    return (
        <section className="about px-[40px] py-0 h-auto bg-[#165b77] -mt-20  text-white ">
            <div className="about__container max-w-[1200px] mx-0 my-auto px-0 py-[20px] ">
                <h2 className="about__title text-2xl text-center mt-[150px]  mb-[30px] italic font-bold">"Qu'est-ce qu'UjuzAi ?"</h2>
                <div className="about__content flex items-center justify-between">
                    <p className="about__description max-w-[50%] text-3xl">
                        <span className="about__description--highlight text-[#E1AD01] text-5xl font-bold ">UjuzAi</span> utilise des technologies avancées pour connecter talents
                        cachés et opportunités professionnelles, en valorisant équité et innovation.
                    </p>
                    <div className="about__image max-w-[40%] ml-[20px]">
                        <img src="3.PNG" alt="Des personnes travaillant" />
                    </div>
                </div>
            </div>
        </section>
    )
}
