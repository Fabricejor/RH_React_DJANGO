// components/InterviewCard.tsx
import React, { useState, useRef } from 'react';

interface InterviewCardProps {
    videoUrl: string;
    transcript: { time: string; speaker: string; text: string; }[];
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

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
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
                        <div key={index} className="mb-2 cursor-pointer hover:bg-gray-100 p-1 rounded" onClick={() => handleTimeJump(line.time)}>
                            <span className="font-bold mr-2 text-gray-600">[{line.time}]</span>
                            <span className="font-semibold">{line.speaker}:</span> {line.text}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InterviewCard;