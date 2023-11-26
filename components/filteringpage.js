"use client";

import ApexCharts from "apexcharts";
import { useEffect, useState } from "react";
import $ from "jquery";
import "../public/js/jquery-jvectormap-2.0.5.min";
import "../public/js/jquery-jvectormap-world-mill";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useCourses } from "./courses";
import { useFilters } from "./filters";

const createFilterMap = (id, updateCourses) => {
    // var selectedRegion = null;
    // var originalFillColors = {};
    const mapObject = $(id).vectorMap({
      map: 'world_mill',
      backgroundColor: 'transparent',
      zoomOnScroll: true,
      onRegionTipShow: function(e, el, code) {
        var countryName = $(id).vectorMap('get', 'mapObject').getRegionName(code);
        el.html(countryName);
      },
      regionStyle: {
        initial: {
          fill: '#333333',
          'fill-opacity': 1,
        },
        hover: {
          'fill-opacity': 0.6
        },
        selected: {
          fill: 'white'
        }
      },
      onRegionClick: async function (event, code) {
        try {
          const courseResponse = await fetch(`https://mhadri-final-database-af023718fb18.herokuapp.com/api/courses_by_country/${code}`);
          const data = await courseResponse.json();
          updateCourses(data.data.data);
          const coursesContainer = $('.courses');
          setTimeout(()=>{
            coursesContainer.get(0).scrollIntoView({ behavior: 'smooth'});
          }, 200); 
        } catch (error) {
          console.error(`Error fetching course data: ${error}`);
        }
      },
    });
  }

export function Filters() {
    const {courses} = useCourses();
    const [isTypeOfCourseExpanded, setIsTypeOfCourseExpanded] = useState(true);
    const [isThematicFocusExpanded, setIsThematicFocusExpanded] = useState(true);
    const [isInstitutionsExpanded, setIsInstitutionsExpanded] = useState(true);

    const toggleTypeOfCourse = () => {
      setIsTypeOfCourseExpanded((prevExpanded) => !prevExpanded);
    };

    const toggleThematicFocus = () => {
      setIsThematicFocusExpanded((prevExpanded) => !prevExpanded);
    };

    const toggleInstitutions = () => {
      setIsInstitutionsExpanded((prevExpanded) => !prevExpanded);
    };

    const {setCourses} = useCourses();
    const {filters} = useFilters();
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://mhadri-final-database-af023718fb18.herokuapp.com/api/courses_data');
        const data = await response.json();
        setCourses(data.data.data);
        const coursesContainer = $('.courses');
        setTimeout(()=>{
          coursesContainer.get(0).scrollIntoView({ behavior: 'smooth'});
        }, 200);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    const [searchTerm, setSearchTerm] = useState('');
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const apiUrl = `https://mhadri-final-database-af023718fb18.herokuapp.com/api/course_data_search?search=${searchTerm}`;
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
    const handleThematicFocusFilterClick = (label) => {
      // Filter the courses based on the selected category and label
      const filteredCourses = [];
      const coursesArray = courses.forEach((course)=>{
        if (course.thematic_focus === label) {
          filteredCourses.push(course);
        }
      });
      
      // Update the courses state with the filtered data
      setCourses(filteredCourses);
  
      // Scroll to the courses container
      const coursesContainer = $('.courses');
      setTimeout(() => {
        coursesContainer.get(0).scrollIntoView({ behavior: 'smooth' });
      }, 200);
    };
    const handleTypeofcourseFilterClick = (label) => {
      // Filter the courses based on the selected category and label
      const filteredCourses = [];
      const coursesArray = courses.forEach((course)=>{
        if (course.type_of_course === label) {
          filteredCourses.push(course);
        }
      });

      setCourses(filteredCourses)
  
      // Scroll to the courses container
      const coursesContainer = $('.courses');
      setTimeout(() => {
        coursesContainer.get(0).scrollIntoView({ behavior: 'smooth' });
      }, 200);
    };
    const handleInstitutionsFilterClick = (label) => {
      // Filter the courses based on the selected category and label
      const filteredCourses = [];
      const coursesArray = courses.forEach((course)=>{
        if (course.institution_name === label) {
          filteredCourses.push(course);
        }
      });
      // Update the courses state with the filtered data
      setCourses(filteredCourses);
  
      // Scroll to the courses container
      const coursesContainer = $('.courses');
      setTimeout(() => {
        coursesContainer.get(0).scrollIntoView({ behavior: 'smooth' });
      }, 200);
    };
    useEffect(()=> {

        const updateCourses = (data) => {
            setCourses(data);
        }
        const id = "#filtermap";        

        try {
            createFilterMap(id, updateCourses);
            console.log('Succesfully created filter map');
            const coursesContainer = document.getElementById("courses");
            coursesContainer.scrollIntoView({ behavior: "smooth"});
        } catch (error) {
            console.log('Error with filtermap: ', error);
        }
    }, [setCourses]);
    return (
        <div className="filtering_page">
            <div className="filtering-page-header py-5 px-10 w-screen flex flex-col justify-items-center justify-center text-center">
                    <h2 className="text-pg-header font-bold" id="search-trainings">Search Trainings/Courses</h2>
                    <br/> <br/>

                    <p className="text-base font-medium">The courses are categorized by type, instititution location, teaching <br/> mechanism, target audience, and thematic focus. The map reflects the countries<br/> where the courses and trainings are implemented.</p>
                    <br/><br/>

                    <p className="text-base font-medium"><strong>To browse or search:</strong> simply use the filter options on the right-hand side (or below the map) or click on the map below. Alternatively, you can enter keyword/s in the searchbox</p>
                </div>
                <br/>
                <br/>                
            <div className="filtermap-filtercolumn w-full flex flex-col md:flex-row justify-center items-center">
                <div id="filtermap" className=""></div>
                <div className="filterby-reset p-5 flex flex-col justify-start w-96 lg:mt-8 md:mt-10">
                    <div className="filter-by rounded-lg font-bold mb-4 mt-10 w-full" >
                        <h2 className="text-base font-bold text-center mix-blend-luminosity bg-gray-900 text-white rounded-lg py-2 px-5">Filter By</h2>
                        <ul className="filters p-4 text-sm text-center md:text-left max-h-80 overflow-y-auto" style={{transition: 'height 0.5s ease'}}>
                        <li className="filter my-4" >
                          <span onClick={toggleTypeOfCourse} className="expand_filter_button text-base cursor-pointer">
                            <FontAwesomeIcon icon={isTypeOfCourseExpanded ? faAngleUp : faAngleDown} /> Type of Course
                          </span>
                          <ul className={`overflow-y-auto ${isTypeOfCourseExpanded ? "max-h-60" : "max-h-0"}`} style={{transition: 'max-height 0.6s ease-in'}}>
                            {filters.typeofcourse && (
                              Object.entries(filters.typeofcourse).map(([label, count]) => (
                                
                                <li key={label} className="cursor-pointer text-sm" onClick={() => handleTypeofcourseFilterClick(label)}>
                                {label} ({count})
                              </li>
                              ))
                            )}
                          </ul>
                        </li>

                        <li className="filter my-4">
                          <span onClick={toggleThematicFocus} className="expand_filter_button text-base cursor-pointer">
                            <FontAwesomeIcon icon={isThematicFocusExpanded ? faAngleUp : faAngleDown} /> Thematic focus
                          </span>
                          <ul className={`overflow-y-auto ${isThematicFocusExpanded ? "max-h-60" : "max-h-0"}`} style={{transition: 'max-height 0.6s ease-in'}}>
                            {filters.thematic && (
                              Object.entries(filters.thematic).map(([label, count]) => (
                                
                                <li key={label} className="cursor-pointer text-sm" onClick={() => handleThematicFocusFilterClick(label)}>
                                {label} ({count})
                              </li>
                              ))
                            )}
                          </ul>
                        </li>

                        <li className="filter my-4">
                          <span onClick={toggleInstitutions} className="expand_filter_button text-base cursor-pointer">
                            <FontAwesomeIcon icon={isInstitutionsExpanded ? faAngleUp : faAngleDown} /> Institution offering the course
                          </span>
                          <ul className={`overflow-y-auto ${isInstitutionsExpanded ? "max-h-60" : "max-h-0"}`} style={{transition: 'max-height 0.6s ease-in'}}>
                            {filters.institutions && (
                              Object.entries(filters.institutions).map(([label, count]) => (
                                
                                <li key={label} className="cursor-pointer text-sm" onClick={() => handleInstitutionsFilterClick(label)}>
                                {label} ({count})
                              </li>
                              ))
                            )}
                          </ul>
                        </li>

                        </ul>
                    </div>
                    <form onSubmit={handleSubmit} id="search" className="bg-white rounded-xl py-3 px-2 flex flex-row justify-center">
                      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} name="searchbar" id="searchbar" className="p-3 rounded-xl" placeholder="Search courses..." />
                        <button name="search_submit" type="submit" className="rounded-xl py-3 px-4 ml-1 bg-gray-900 text-white font-bold"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                    </form>
                    <div className="reset-filter-page self-center">
                        <button onClick={fetchCourses} id="reset_filter_button" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-150 font-bold mt-3"> Reset all filters</button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}