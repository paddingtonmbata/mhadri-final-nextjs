"use client";
import Image from "next/image";
import { useState } from "react";
import $ from "jquery";
import { useCourses } from "./courses";
import Link from "next/link";
import SearchBar from "./searchbar";
import { useMediaQuery } from "react-responsive";
import { Tooltip } from "react-tooltip";

const Logo = ({ isMobile }) => (
  <Image
    src="/mhadri_logo.png"
    alt="Logo"
    width={isMobile ? 70 : 100}
    height={isMobile ? 69 : 99}
  />
);

export default function LandingPage({ isSearchPage }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { setCourses } = useCourses();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = `/api/course_data_search?search=${searchTerm}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      // Handle the fetched data as needed
      setCourses(data.data);
      const coursesContainer = $(".courses");
      setTimeout(() => {
        coursesContainer.get(0).scrollIntoView({ behavior: "smooth" });
      }, 200);
      setSearchTerm("");
    } catch (error) {
      console.log(error);
      const coursesContainer = $(".courses");
      setTimeout(() => {
        coursesContainer.get(0).scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };
  return (
    <div className="landing-page w-screen">
      <div className="landing-page-header w-full">
        {/*Explore search bar and logo*/}
        <div className="bg-white py-2">
          <div className="mb-4 flex justify-center">
            <a href="https://mhadri.org"><Logo isMobile={isMobile}/></a>       
                 
          </div>
          <h1 className="text-pg-header-m lg:text-pg-header font-bold text-center">
            Global Migration Health Training and Course Repository
          </h1>
          <div className="justify-center mx-auto flex items-center max-h-13">
            {isSearchPage ? (
              <SearchBar
                setSearchTerm={setSearchTerm}
                handleSubmit={handleSubmit}
                searchTerm={searchTerm}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <ul className="landing-page-nav flex flex-row justify-center self-center py-8 w-full bg-indigo-500">
          <li className="nav-item mx-1 lg:mx-5 border-b-2 border-transparent hover:transition duration-250 text-base-m lg:text-base font-bold text-black px-4 bg-white rounded-lg hover:bg-white hover:px-6 hover:rounded-lg ease-in py-1 hover:font-bold transition-all">
            <Link className="font-bold" href="/">
              About
            </Link>
          </li>
          <li className="nav-item mx-1 lg:mx-5 border-b-2 border-transparent hover:transition duration-250 text-base-m lg:text-base font-bold text-black px-4 bg-white rounded-lg hover:bg-white hover:px-6 hover:rounded-lg ease-in py-1 hover:font-bold transition-all">
            <Link className="font-bold" href="/search-filters">
              Search Trainings/Courses
            </Link>
          </li>
          <li className="nav-item mx-1 lg:mx-5 border-b-2 border-transparent hover:transition duration-250 text-base-m lg:text-base font-bold text-black px-4 bg-white rounded-lg hover:bg-white hover:px-6 hover:rounded-lg ease-in py-1 hover:font-bold transition-all">
            <a href="https://mhadri.org/contact/" target="_blank">Contact</a>
          </li>
        </ul>
      </div>
      {isSearchPage ? (
        ""
      ) : (
        <div className="landing-page-content w-full">
          <div className="landing-page-content-header self-center">
            <div className="landing-page-content-header-about py-5 px-7 lg:px-14 w-full flex flex-col justify-items-center justify-center text-left">
              <h3 className="text-pg-title-m lg:text-pg-title font-bold text-left">
                About the Repository
              </h3>
              <br />
              <p className="text-base-m lg:text-base" id="about">
                The repository is a searchable database of migration and
                health-related courses and trainings across the globe. The data
                is drawn from a live database built by the Migration Health and
                Development Research initiative (MHADRI) through which training and course information is collated and updated.
              </p>
              <br />
              <p className="text-base-m lg:text-base">                
              The repository provides a comprehensive database of <a data-tooltip-id="tool" data-tooltip-content="While not all courses and trainings are captured here the
                repository provides a comprehensive database – you can find out
                what courses are available and where" data-tooltip-place="top"><Link
                className="font-bold text-purple-800"
                href="/search-filters"
              >
                trainings/courses
              </Link>{" "}</a><Tooltip id="tool"/>
                Use the search function and filters to learn more about types of courses, teaching format, target audience, funding etc.
                <br />
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
