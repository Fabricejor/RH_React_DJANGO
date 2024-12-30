import React from "react";

interface Props {
    user_id: any;
    nom_prenom: string;
    mail: string;
    numero_tlfn: string;
    profil: string;
}
const ProfilCard = ({user_id,nom_prenom , mail ,numero_tlfn , profil} : Props) => {
    return (
        <div className="ml-0 bg-white border rounded-lg shadow-md p-5 min-w-[512px] hover:shadow-[#165b77] z-10 ">
            {/* Header: Image, Nom et Expérience */}
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img
                        src="defaultProfil.jpg"
                        alt="profile"
                        className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div className="ml-4">
                        <h2 className="text-sm font-semibold text-gray-800">{nom_prenom} | Exp: 9 years</h2>
                    </div>
                </div>
                <button type="button" className="bg-[#165b77] hover:bg-[#163643] text-white px-3 py-2 rounded-xl text-xs font-medium" onClick={() => console.log(user_id)}>
                    voir plus
                </button>
            </div>

            {/* Description */}
            <p className="text-gray-600 mt-4 text-xs text-nowrap">
                {/* Enhanced security and productivity infrastructure at Cloudera as MTS-2. */}
               {nom_prenom}  {mail}
            </p>

            {/* Expert In */}
            <div className="flex flex-row w-full justify-between ">
                <div className="mt-6 w-[50%]">
                    <h3 className=" text-xs font-semibold  text-gray-800 mb-2">Expert in</h3>
                    <div className="flex flex-wrap gap-2">
                        {/* {["Python", "Django", "AWS", "Azure", "Kubernetes"].map((skill) => (
                            <span
                                key={skill}
                                className="bg-[#d0ebf5] text-[#165b77] px-2 py-1 rounded-full text-xs"
                            >
                                {skill}
                            </span>
                        ))} */}
                        {profil}
                    </div>
                </div>

                {/* Commitment */}
                <div className="mt-6 flex flex-col">
                    {/* <h3 className="font-semibold text-gray-800 mb-2 text-xs self-end ">Commitment</h3> */}
                    <h3 className="font-semibold text-gray-800 mb-2 text-xs self-end ">Coordonés</h3>
                    <div className="flex gap-4 items-center">
                        <span className="bg-gray-100 px-4 py-1 rounded-full text-xs text-gray-600 text-nowrap">
                            {/* Full-time */}
                            {mail}
                        </span>
                        <span className="bg-gray-200 px-4 py-1 rounded-full text-xs text-gray-800   text-nowrap">
                            {/* Part-time */}
                            {numero_tlfn}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilCard;
