"use client";
import Image from "next/image";
import { useState } from "react";
import $ from "jquery";
import { useCourses } from "./courses";
import Link from "next/link";

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
                <div className="mb-4 flex justify-center"><Image src="/mhadri_logo.png" alt="Logo"  width={50+40} height={49+40} min-width={100} /></div>
                <h1 className="text-pg-header-m lg:text-pg-header font-bold text-center">Global Migration Health Training and Course Repository</h1>
                    <div className="justify-center mx-auto flex items-center max-h-13">
                        

                        {/**  Search Bar */}
                        <form className="flex flex-row mt-4" onSubmit={handleSubmit} id="landing-search">
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
                    <li className="nav-item mx-5 border-b-2 border-transparent hover:transition duration-250 text-base-m lg:text-base font-bold text-black hover:border-black">
                        <a href="#about">About</a>
                    </li>
                    <li className="nav-item mx-5 border-b-2 border-transparent hover:transition duration-250 text-base-m lg:text-base font-bold text-black hover:border-black">
                        <a href="#search-trainings">Search Trainings/Courses</a>
                    </li>
                    <li className="nav-item mx-5 border-b-2 border-transparent hover:transition duration-250 text-base-m lg:text-base font-bold text-black hover:border-black">
                    <a href="#contact">Contact</a>
                    </li>
                </ul>
            </div>
            <div className="landing-page-content w-full">
                <div className="landing-page-content-header self-center">
                    <div className="landing-page-content-header-about py-5 px-7 lg:px-14 w-screen flex flex-col justify-items-center justify-center text-left">
                        <h3 className="text-pg-title-m lg:text-pg-title font-bold text-left">About the Repository</h3>
                        <br />
                        <p className="text-base-m lg:text-base" id="about">
                            The repository is a searchable database of migration and health-related courses and trainings across the globe. The data is drawn from a live database built by the Migration Health and Development Research initiative (MHADRI) through which course and training information is collated and updated.
                        </p>
                        <br />
                        <br />
                        <p className="text-base-m lg:text-base">
                            While not all courses and trainings are captured here the repository provides a comprehensive database – you can find out what courses are available and where - and using the <Link className="font-bold" href="/search-filters">search function and filters</Link> can learn more about types of courses, teaching format, target audience, funding etc. 
                            <br />
                            {/* Clicking on a country will cause the pie charts to reflect the teaching mechanism and type of courses. The pie chart filters for the clicked country.
                            <br />
                            Clicking on the bar graph will render courses/trainings for the selected country.
                            <br />
                            Clicking on the bar graph will render courses/trainings for the selected country. Please note that the dashboard only provides general data of the entire database and more precise filters can be applied at the <a className="font-bold" href="#search-trainings">Search Trainings/Courses</a> section of this site. */}
                        </p>
                    </div>                    
                </div>
            </div>
        </div>
    );
}