import React from 'react'

export default function Infos() {
  return (
    <section className="info px-[40px] py-0">
            <div className="info__container flex justify-around max-w-[1200px] mx-0 my-auto px-0 py-[20px] text-center ">
                <div className="info__card bg-[#f0f4c3] p-[20px] rounded-md w-[30%] relative overflow-hidden before:absolute brefore:mb-0 before:w-[100%] before:h-[50%]">
                    <h3 className="info__card-title text-[#E1AD01] bg-[#165b77] p-2 mb-[20px] text-[1.2rem] relative z-10">IA ÉTHIQUE</h3>
                    <div className="info__card-count text-[#165b77] text-[3rem] font-bold relative z-10">+500</div>
                    <p className="info__card-description text-[#165b77] text-[0.9rem] relative z-10">talents connectés chaque mois</p>
                </div>
                <div className="info__card bg-[#f0f4c3] p-[20px] rounded-md w-[30%] relative overflow-hidden before:absolute brefore:mb-0 before:w-[100%] before:h-[50%]">
                    <h3 className="info__card-title  text-[#E1AD01] bg-[#165b77] p-2 mb-[20px] text-[1.2rem] relative z-10 ">INCLUSION PROFESSIONNELLE</h3>
                    <div className="info__card-count text-[#165b77] text-[3rem] font-bold relative z-10">100</div>
                    <p className="info__card-description  text-teal-600 text-[0.9rem] relative z-10">+ entreprises partenaires</p>
                </div>
                <div className="info__card bg-[#f0f4c3] p-[20px] rounded-md w-[30%] relative overflow-hidden before:absolute brefore:mb-0 before:w-[100%] before:h-[50%] ">
                    <h3 className="info__card-title  text-[#E1AD01] bg-[#165b77] p-2 mb-[20px] text-[1.2rem] relative z-10">RÉVÉLATION DES TALENTS INVISIBLES</h3>
                    <div className="info__card-count  text-[#165b77] text-[3rem] font-bold relative z-10">5</div>
                    <p className="info__card-description  text-[#165b77] text-[0.9rem] relative z-10">pays couverts</p>
                </div>
            </div>
        </section>
  )
}
