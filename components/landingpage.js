"use client";
import Image from "next/image";
import { useState } from "react";
import $ from "jquery";
import { useCourses } from "./courses";

let isMobile = false;

export default function LandingPage() {
    const {setCourses} = useCourses();
    const [searchTerm, setSearchTerm] = useState('');
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const apiUrl = `/api/course_data_search?search=${searchTerm}`;
        const response = await fetch(apiUrl);
  
        if (!response.ok) {
          throw new Error('Failed to fetch data');
          
        }
  
        const data = await response.json();
        // Handle the fetched data as needed
        setCourses(data.data);
        const coursesContainer = $('.courses');
        setTimeout(()=>{
          coursesContainer.get(0).scrollIntoView({ behavior: 'smooth'});
        }, 200);
        setSearchTerm('');
      } catch (error) {
        console.log(error);
        const coursesContainer = $('.courses');
        setTimeout(()=>{
          coursesContainer.get(0).scrollIntoView({ behavior: 'smooth'});
        }, 200);
      }
    };
    return (
        <div className="landing-page w-screen">
            <div className="landing-page-header w-full">
                {/*Explore search bar and logo*/}
                <div className="bg-white py-8">
                <div className="mb-4 flex justify-center"><Image src="/mhadri_logo.png" alt="Logo"  width={50+20} height={49+20} min-width={100} /></div>
                    <div className="justify-center mx-auto flex items-center max-h-13">
                        

                        {/**  Search Bar */}
                        <form className="flex flex-row" onSubmit={handleSubmit} id="landing-search">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Explore courses..."
                                    className="w-64 sm:w-96 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-gray-300 transition duration-150"
                                />
                                <svg className="absolute right-0 top-0 mt-3 mr-4 text-gray-500 h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 12 12" stroke="currentColor">
                                    <path d="M12 4v16"></path>
                                </svg>
                            </div>
                            <button type="submit" className="ml-4 bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-900 transition duration-150"> Search </button>
                        </form>
                    </div>
                </div>
                <ul className="landing-page-nav flex flex-row justify-center self-center py-4">
                    <li className="nav-item mx-5 border-b-2 border-transparent hover:transition duration-250 text-sm font-bold text-black hover:border-black">
                        <a href="#about">About</a>
                    </li>
                    <li className="nav-item mx-5 border-b-2 border-transparent hover:transition duration-250 text-sm font-bold text-black hover:border-black">
                        <a href="#search-trainings">Search Trainings/Courses</a>
                    </li>
                    <li className="nav-item mx-5 border-b-2 border-transparent hover:transition duration-250 text-sm font-bold text-black hover:border-black">
                    <a href="#contact">Contact</a>
                    </li>
                </ul>
            </div>
            <div className="landing-page-content w-full">
                <div className="landing-page-content-header self-center">
                    <div className="landing-page-content-header-about py-5 lg:px-14 px-10 w-screen flex flex-col justify-items-center justify-center text-center">
                        {/* <h3 className="text-pg-header font-bold">About the Repository</h3>
                        <hr className="w-16 m-4 bg-black font-extrabold border-2 text-black self-center"/> */}
                        <p className="text-base" id="about">
                            This is a searchable database of all migration and health related courses and trainings. All entries are obtained from the MHADRI database
                        </p>
                        <br />
                        <br />
                        <p className="text-base">
                            Below is the dashboard with a chloropleth map of the world displaying the number of courses and trainings related to migration and health from the entries in our database.
                            <br />
                            Clicking on the countrie will cause the piecharts to reflect the teaching mechanism and type of courses piechart filters for the clicked counntry
                            <br />
                            Clicking on the bargraph will render courses/trainings for the clicked country
                            <br />
                            Please note that the  dashboard only provides general data of the whole database and more precise filters can be applied at the <a className="font-bold" href="#search-trainings">Search Trainings/Courses</a> section of this site.
                        </p>
                    </div>                    
                </div>
            </div>
        </div>
    );
}