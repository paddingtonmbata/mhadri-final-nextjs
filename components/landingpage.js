"use client"
import Image from "next/image";

const isMobile = window.innerWidth <= 1000;

export default function LandingPage() {
    return (
        <div className="landing-page w-screen">
            <div className="landing-page-header w-full">
                {/*Explore search bar and logo*/}
                <div className="bg-white py-8">
                {isMobile ? ( <div className="mb-4 flex justify-center"><Image src="/mhadri_logo.png" alt="Logo"  width={50+20} height={49+20} min-width={100} /></div>) : null}
                    <div className="justify-center mx-auto flex items-center max-h-13">
                        {/** Logo */}
                        {isMobile ? null: ( <div className="mr-4"><Image src="/mhadri_logo.png" alt="Logo" width={50+20} height={49+20} min-width={100}/></div>)}

                        {/**  Search Bar */}
                        <div className="relative">
                        <input
                            type="text"
                            placeholder="Explore courses..."
                            className="w-64 sm:w-96 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-gray-300 transition duration-150"
                        />
                        <svg
                            className="absolute right-0 top-0 mt-3 mr-4 text-gray-500 h-4 w-4"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 12 12"
                            stroke="currentColor"
                        >
                            <path d="M12 4v16"></path>
                        </svg>
                        </div>
                        <button className="ml-4 bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-900 transition duration-150"> Search </button>

                    </div>
                </div>
                <ul className="landing-page-nav flex flex-row justify-center self-center py-4">
                    <li className="nav-item mx-5 border-b-2 border-transparent hover:transition duration-250 text-sm font-bold text-black hover:border-black">
                        About
                    </li>
                    <li className="nav-item mx-5 border-b-2 border-transparent hover:transition duration-250 text-sm font-bold text-black hover:border-black">
                        Search Trainings/Courses
                    </li>
                    <li className="nav-item mx-5 border-b-2 border-transparent hover:transition duration-250 text-sm font-bold text-black hover:border-black">
                        Contact
                    </li>
                </ul>
            </div>
            <div className="landing-page-content w-full">
                <div className="landing-page-content-header">
                    <div className="landing-page-content-header-about py-5 px-10 w-screen flex flex-col justify-items-center justify-center text-center">
                        <h3 className="text-pg-header font-bold">About the Repository</h3>
                        <hr className="w-16 m-4 bg-black font-extrabold border-2 text-black self-center"/>
                        <p className="text-base font-medium">
                            This is a searchable database of all migration and health related courses and trainings. Entries obtained from the MHADRI database
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}