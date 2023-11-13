"use client";

import ApexCharts from "apexcharts";
import { useEffect } from "react";
import $ from "jquery";
import "../public/js/jquery-jvectormap-2.0.5.min";
import "../public/js/jquery-jvectormap-world-mill";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const createFilterMap = (id) => {
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
      onRegionClick: async function(event, code) {
        // //logic to show the selected country
        // if (selectedRegion) {
        //   var prevRegionElement = $(id).find(`[data-code="${selectedRegion}"]`);
        //   prevRegionElement.css('fill', originalFillColors[selectedRegion]);
        // }

        // // Toggle the highlighting state for the clicked region
        // if (selectedRegion !== code) {
        //     selectedRegion = code;
        //     var currentRegionElement = $(id).find(`[data-code="${selectedRegion}"]`);
        //     // Store the original fill color before changing it
        //     originalFillColors[selectedRegion] = currentRegionElement.css('fill');
        //     currentRegionElement.css('fill', 'rgb(0, 143, 255)'); // Change to your desired highlight color
        // } else {
        //     selectedRegion = null; // Reset the selected region
        // } 
        // // Fetch and display courses from the clicked country
        // try {
        //   // Remove the previously highlighted region
        //   $('.jvectormap-region.active').removeClass('active');
          
        //   // Add the active class to the clicked region
        //   //$(event.target).addClass('active');

        //   const courseResponse = await fetch(`https://mhadri-test-site-bdfa87d23e0b.herokuapp.com/api/courses_by_country/${code}`);
        //   const data = await courseResponse.json();
        //   renderCourses(data, true)         

        // } catch (error) {
        //   console.error(`Error fetching course data: ${error}`);
        // }
      }
    });
  }

export function Filters() {
    useEffect(()=> {
        const id = "#filtermap";

        try {
            createFilterMap(id);
            console.log('Succesfully created filter map');
        } catch (error) {
            console.log('Error with filtermap: ', error);
        }
    }, []);
    return (
        <div className="filtering_page">
            <div className="filtering-page-header py-5 px-10 w-screen flex flex-col justify-items-center justify-center text-center">
                    <h2 className="text-pg-header font-bold">Search Trainings/Courses</h2>
                    <br/> <br/>

                    <p className="text-base font-medium">The courses are categorized by type, instititution location, teaching <br/> mechanism, target audience, and thematic focus. The map reflects the countries<br/> where the courses and trainings are implemented.</p>
                    <br/><br/>

                    <p className="text-base font-medium"><strong>To browse or search:</strong> simply use the filter options on the right-hand side or click on the map below. Alternatively, you can enter keyword/s in the searchbox.</p>
                </div>
                <br/>
                <br/>                
            <div className="filtermap-filtercolumn w-full flex flex-col sm:flex-row justify-center">
                <div id="filtermap" className=""></div>
                <div className="filterby-reset p-5 flex flex-col justify-start w-96">
                    <div className="filter-by rounded-lg font-bold mb-4 mt-10 w-full" >
                        <h2 className="text-pg-title font-bold text-center mix-blend-luminosity bg-gray-900 text-white rounded-lg py-3 px-8">Filter By</h2>
                        <ul className="filters p-4">
                            <li className="filter my-4">
                                <span className="expand_filter_button text-base"><FontAwesomeIcon icon={faAngleDown} /> Type of Course</span>
                                <ul className="expanded-filter ef-type">
                                </ul>
                            </li>
                            <li className="filter my-4">
                                <span className="expand_filter_button text-base"><FontAwesomeIcon icon={faAngleDown} /> Teaching mechanism</span>
                                <ul className="expanded-filter ef-teaching">
                                </ul>
                            </li>
                            <li className="filter my-4">
                                <span className="expand_filter_button text-base"><FontAwesomeIcon icon={faAngleDown} /> Target Audience</span>
                                <ul className="expanded-filter ef-target">
                                </ul>
                            </li>
                            <li className="filter my-4">
                                <span className="expand_filter_button text-base"><FontAwesomeIcon icon={faAngleDown} /> Thematic focus</span>
                                <ul className="expanded-filter ef-thematic">
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <form className="search bg-white rounded-xl py-3 px-2 flex flex-row justify-center">
                        <input type="text" name="searchbar" id="searchbar" className="p-3 rounded-xl" placeholder="Search courses..." />
                        <button name="search_submit" type="submit" className="rounded-xl py-3 px-4 ml-1 bg-gray-900 text-white font-bold"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                    </form>
                    <div className="reset-filter-page self-center">
                        <button id="reset_filter_button" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-150 font-bold mt-3"> Reset all filters</button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}