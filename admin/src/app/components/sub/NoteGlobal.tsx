import React from 'react';

interface ProgressCircleProps {
  progress: number; // Pourcentage de progression (0 à 100)
  size?: number;   // Taille du cercle en pixels (optionnel, par défaut 100)
  strokeWidth?: number; // Épaisseur du trait en pixels (optionnel, par défaut 10)
    color?: string; // Couleur du cercle de progression
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress, size = 100, strokeWidth = 10, color = "#4287f5"}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="transparent"
          className="transition-all duration-300" // Pour une animation fluide
          strokeLinecap="round" // Bords arrondis
        />
          <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#374151"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
            strokeDashoffset={0}
        />
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={size / 4} // Taille du texte proportionnelle à la taille du cercle
          className="text-white font-bold"
        >
          {progress}
        </text>
      </svg>
    </div>
  );
};

export default ProgressCircle;