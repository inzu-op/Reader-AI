'use client';

import React from 'react';
import Navbar from './Navbar';
import { Button } from '@/components/ui/button';

interface StructureProps {
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Structure: React.FC<StructureProps> = ({ isActive, setIsActive }) => {
    const handleTask =()=>{

    }
    return (
        <div
            className={`absolute top-0 main rounded transition-all duration-300 ease-in-out p-2 custom-scrollbar`}
            style={{
                position: 'absolute',
                left: isActive ? '15vw' : '0',
                right: '0',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {!isActive && (
                <div className="cursor-pointer absolute top-5 left-4 z-50" onClick={() => setIsActive(true)}>
                    <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed z-10 h-8 w-8 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
                        data-sidebar="trigger"
                        onClick={() => setIsActive(true)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-panel-left"
                        >
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="M9 3v18" />
                        </svg>
                        <span className="sr-only">Toggle Sidebar</span>
                    </button>
                </div>
            )}
            <div><Navbar></Navbar></div>
            <div>
                <Button onClick={handleTask}>Add Task</Button>
            </div>
            <div>
                
            </div>
        </div>
    );
};

export default Structure;
