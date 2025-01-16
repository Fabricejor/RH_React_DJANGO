// components/MinNavbar.tsx
import React from 'react';
import Link from 'next/link'; // Importez le composant Link de Next.js

import { CiVideoOn } from "react-icons/ci";
import { BiTask } from "react-icons/bi";
import { IoSchoolOutline } from "react-icons/io5";
interface MinNavbarProps {
  activeSection: string; // Pour suivre la section active
}


const MinNavbar: React.FC<MinNavbarProps> = ({ activeSection }) => {
  const navItems = [
    { label: 'Interview', href: '#interview', icon: <CiVideoOn /> },
    { label: 'Experience', href: '#experience', icon: <BiTask /> },
    { label: 'Education', href: '#education', icon: <IoSchoolOutline /> },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 py-2 px-4 sticky top-0 z-10">
      <div className="flex space-x-4 justify-center">
        {navItems.map((item) => (
          <Link key={item.label} href={item.href} legacyBehavior>
            <a
              className={`
                px-4 py-2 rounded-md flex items-center text-gray-700 hover:bg-gray-100 transition duration-300
                ${activeSection === item.label.toLowerCase() ? 'bg-gray-200 font-medium' : ''}
              `}
            >
              {item.icon} {/* Display the icon directly */}
              <span className="ml-2">{item.label}</span> {/* Add label after icon with margin */}
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MinNavbar;