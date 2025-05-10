'use client';

import React from 'react';

interface SliderProps {
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Slider: React.FC<SliderProps> = ({ isActive, setIsActive }) => {
    if (!isActive) return null;

    return (
        <div
            className={`fixed h-[100vh] left-0 top-0 z-10 transition-all duration-300 
      w-[70%] md:w-[15vw] shadow-lg rounded-lg 
      border border-black dark:border-zinc-800`}
        >
            <div className="w-full h-full flex flex-col">
                <div className="flex items-center py-4 pl-3 cursor-pointer" onClick={() => setIsActive(false)}>
                    <i className="fa-solid fa-right-from-bracket text-lg p-2 rounded-md text-black dark:text-white"></i>
                    <h3 className="ml-2 font-bold text-sm md:text-lg text-black dark:text-white">Close</h3>
                </div>
            </div>
        </div>

    );
};

export default Slider;
