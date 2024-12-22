import React from "react";

const ProfilCard = () => {
    return (
        <div className="bg-white border rounded-lg shadow-md p-5 max-w-lg hover:shadow-[#165b77] ">
            {/* Header: Image, Nom et Expérience */}
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img
                        src="defaultProfil.jpg"
                        alt="profile"
                        className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div className="ml-4">
                        <h2 className="text-base font-semibold text-gray-800">Ibrahima Sané | Exp: 9 years</h2>
                    </div>
                </div>
                <button type="button" className="bg-[#165b77] hover:bg-[#163643] text-white px-3 py-2 rounded-xl text-xs font-medium">
                    Voir plus
                </button>
            </div>

            {/* Description */}
            <p className="text-gray-600 mt-4 text-sm">
                Enhanced security and productivity infrastructure at Cloudera as MTS-2.
            </p>

            {/* Expert In */}
            <div className="flex flex-row w-full justify-between ">
                <div className="mt-6 w-[50%]">
                    <h3 className=" text-xs font-semibold  text-gray-800 mb-2">Expert in</h3>
                    <div className="flex flex-wrap gap-2">
                        {["Python", "Django", "AWS", "Azure", "Kubernetes"].map((skill) => (
                            <span
                                key={skill}
                                className="bg-[#d0ebf5] text-[#165b77] px-2 py-1 rounded-full text-xs"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Commitment */}
                <div className="mt-6 flex flex-col">
                    <h3 className="font-semibold text-gray-800 mb-2 text-xs self-end ">Commitment</h3>
                    <div className="flex gap-4">
                        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-600">
                            Full-time
                        </span>
                        <span className="bg-gray-200 px-3 py-1 rounded-full text-xs text-gray-800">
                            Part-time
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilCard;
