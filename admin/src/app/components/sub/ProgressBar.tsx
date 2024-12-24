import React from 'react';

interface ProgressBarProps {
    progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <div className="progress-bar-container w-full h-3 rounded-full bg-[#E0DFDF]">
            <div className="progress-bar flex flex-row h-full items-center justify-start duration-300 ease-in-out">
              <div className="progress-bar-fill bg-[#165b77]  h-full rounded-full" style={{ width: `${progress}%` }}></div>
                <div className="progress-bar-handle w-4 h-[130%] -ml-2 rounded-[100%] bg-white  cursor-pointer"></div>
            </div>
        </div>
    );
};

export default ProgressBar;