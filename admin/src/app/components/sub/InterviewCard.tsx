// components/InterviewCard.tsx
import React, { useState, useRef } from 'react';
import RadarChart from './RadarGraph';
import { ChartData } from 'chart.js';
import ProgressCircle from './NoteGlobal'
interface InterviewCardProps {
    videoUrl: string;
    transcript: { time: string; speaker: string; text: string; notes: number }[];
}


const InterviewCard: React.FC<InterviewCardProps> = ({ videoUrl, transcript }) => {
    const [showTranscript, setShowTranscript] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleTimeJump = (time: string) => {
        if (videoRef.current) {
            const [minutes, seconds] = time.split(':').map(Number);
            const totalSeconds = minutes * 60 + seconds;
            videoRef.current.currentTime = totalSeconds;
        }
    };

    const data: ChartData<'radar'> = {
        labels: ['Work experience', 'Education', 'Similarité', 'Entretien', 'Motivation'], // Les 5 axes
        datasets: [
            {
                label: 'Joueur 1',
                data: [70, 65, 75, 70, 55], // Valeurs pour chaque axe
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: '#165b77',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Comparaison des joueurs',
            },
        },
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6" id='interview'>
            <div className="relative pb-[56.25%] h-0 overflow-hidden mb-4"> {/* Aspect ratio 16:9 */}
                <video ref={videoRef} src={videoUrl} controls className="absolute top-0 left-0 w-full h-full" />
            </div>

            <div className="flex justify-center"> {/* Centrage du bouton */}
                <button
                    className="bg-[#165b77] hover:bg-[#163643] text-white font-bold py-2 px-4 rounded"
                    onClick={() => setShowTranscript(!showTranscript)}
                >
                    {showTranscript ? "Hide Transcript" : "Show More"}
                </button>
            </div>

            {showTranscript && (
                <div className="mt-4 border border-gray-300 rounded-lg p-4 max-h-96 overflow-y-auto"> {/* Ajout de la scrollbar et hauteur max */}
                    {transcript.map((line, index) => (
                        <div key={index} className="mb-2 cursor-pointer w-full flex flex-row   hover:bg-gray-100 p-1 rounded" onClick={() => handleTimeJump(line.time)}>
                            <span className="font-bold mr-2 text-xs rounded-full p-1  text-[#165b77] self-center">[{line.time}]</span>
                            <span className="font-semibold text-sm self-start">{line.speaker}:</span>
                            <p className='text-xs self-start text-[#165b77] max-w-[90wv]'>
                                {line.text}
                            </p>
                            {line.notes > 0 ?
                                (line.notes > 50 ?
                                    <span className='font-semibold text-sm self-center ml-6 p-2 rounded-full  bg-green-100   text-green-800'>{line.notes}% </span>
                                    :
                                    <span className='font-semibold text-sm self-center ml-6 p-2 rounded-full  bg-red-200   text-red-800 '>{line.notes}% </span>)
                                : ''}
                        </div>
                    ))}
                </div>
            )}
            <div className="p-4 flex flex-row w-full justify-around mt-10 "> {/* Ajout de padding avec Tailwind */}
                <div className='flex flex-row justify-start'>
                    <h1 className="text-2xl font-bold mb-4 text-nowrap">Evaluation Radar</h1>
                    <div className="w-full h-96 "> {/* Définition de la taille avec Tailwind et centrage*/}
                        <RadarChart data={data} options={options} />
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <h1 className="text-2xl font-bold mb-4 text-nowrap">Note Globale</h1>
                    {/* <div className="w-full h-full"> Définition de la taille avec Tailwind et centrage */}
                    <span className='font-semibold text-2xl self-center ml-6 p-4 rounded-full  bg-green-100   text-green-800'> 86 % </span>
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};

export default InterviewCard;