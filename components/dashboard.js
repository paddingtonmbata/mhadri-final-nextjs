"use client";

import ApexCharts from "apexcharts";
import { useEffect } from "react";
import $ from "jquery";
import "../public/js/jquery-jvectormap-2.0.5.min";
import "../public/js/jquery-jvectormap-world-mill";

import { useCourses } from "./courses";

function createBarGraph(data, updateCourses) {
  const categories = data.map(item => item.country_name);
  const courseCounts = data.map(item => item.course_count);

  const options = {
    series: [
      {
        data: courseCounts
      }
    ],
    title: {
      text: "Number of institution by location",
      align: 'center',
      style: {
        fontSize: "16px"
      }
    },
    chart: {
      type: 'bar', 
      height: 500, 
      width: '100%',
      fontFamily: 'Heebo, monospace',
      events: {
        // when each point of the bargraoh is clicked on it renders courses belonging to the clicked country on the bargraph
        dataPointSelection: async function (event, chartContext, config) {
          const country_name = config.w.config.xaxis.categories[config.dataPointIndex];
          // Fetch and render courses for the clicked category
          const courseResponse = await fetch(`/api/country_by_name/${country_name}`);
          const countryCourses = await courseResponse.json();
          const coursesContainer = $('.courses');
          updateCourses(countryCourses.data);
          setTimeout(()=>{
            coursesContainer.get(0).scrollIntoView({ behavior: 'smooth'});
          }, 200);                  
        }
      }
    },
    plotOptions: { 
      bar: { 
        borderRadius: 4, 
        horizontal: true
      } 
    },
    dataLabels: { 
      enabled: false 
    },
    xaxis: { 
      categories: categories 
    },
    grid: {
      show: true,
      yaxis: {
        lines: {
          show: false
        }
      },
      xaxis: {
        lines: {
          show: true
        }
      },
      columns: {
        opacity: 0.5
      }
    },
    tooltip: {
      followCursor: true,
      x: {
        show: false
      },
      marker: {
        show: false
      },
      y: {
        title: {
          formatter: (seriesName) => ""
        },
      },
    },
  };

  const chart = new ApexCharts(document.querySelector("#bargraph"), options);
  chart.render();
}

const createMap = (id, data) => {
    let mapData = {};
  
    // creates an object for the chloropleth effect on the map
    for (var i = 0; i < data.length; i++) {
      var countryCode = Object.keys(data[i])[0];
      var courseCount = data[i][countryCode];
      mapData[countryCode] = courseCount;
    }
    
    console.log("map data: ", mapData);
  
    const mapObject = $(id).vectorMap({
      map: 'world_mill',
      backgroundColor: 'transparent',
      zoomOnScroll: true,
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
      series: {
        regions: [{
          values: mapData,
          scale: ['#C8EEFF', '#0071A4'],
          normalizeFunction: 'polynomial',
          min: 0,
          max: Math.max(...Object.values(mapData)),
          defaultFill: '#727272'
        }]
      },
      onRegionTipShow: function(e, el, code) {
        var countryName = $(id).vectorMap('get', 'mapObject').getRegionName(code);
        var courseCount = mapData[code];
        if (courseCount) {
          el.html(countryName + ' - ' + courseCount);
        } else {
          el.html(countryName + ' - O');
        }
      },
      onRegionClick: async function(event, code) {
        console.log(`Clicked on: ${code}`);
      }
    });
};

async function createPieChart (chartId, data, chartType, legend_height, pieColor, title, code) {
  const options = {
    series: data.data,
    labels: data.labels,
    dataLabels: {
        enabled: false,
    },
    legend: {
        position: 'right',
        height: legend_height,
    },
    responsive: [
        {
            breakpoint: 1490,
            options: {
                chart: {
                    width: '100%',
                    height: '500px'
                },
                legend: {
                    position: 'bottom',
                },
            },
        },
    ],
    title: {
        text: title,
        align: 'center',
        style: {
            fontSize: '14px',
            fontFamily: 'IBM Plex Mono, monospace',
        },
    },
    theme: {
        monochrome: {
            enabled: true,
            color: pieColor,
            shadeTo: 'dark',
            shadeIntensity: 0.5,
        },
    },
    chart: {
      type: chartType,
      height: '369px',
      events: {
        // clicking on the piechart will render courses with that specific filter indicated by the piechart
          dataPointSelection: async function (event, chartContext, config) { },
      },
    },
  }
  if (typeof window[chartId] === 'undefined') {
      // Create a new chart instance
      window[chartId] = new ApexCharts(document.querySelector(chartId), options);
      await window[chartId].render();
  } else {
      // Update the existing chart instance
      await window[chartId].updateSeries(data.data, true); // Update series data
      await window[chartId].updateOptions(options);
  }
}

export default function Dashboard() {
  const {setCourses} = useCourses();
  const updateCourses = (data) => {
    setCourses(data);
  }

  useEffect(() => {
      const id = "#map";
      const barId = "#bargraph";
      const pieOne = "#piechart1";
      const pieTwo = "#piechart2";

      const fetchBarData = async () => {
        try {
          const response = await fetch('/api/country_course_count');
          const data = await response.json();
          console.log("bar data response: ", data.data);
          createBarGraph(data.data, updateCourses);
          console.log("Bar graph created");
        } catch (error) {
          console.log("Error fetching bar data: ", error)
        }
      }
      
      const fetchData = async () => {
        try {
          const response = await fetch('/api/country_chloropleth');
          const data = await response.json();
          createMap(id, data.data);
          console.log("Map created");
        } catch (error) {
          console.error('Error fetching map data:', error);
        }
      };

      const fetchPieOneData = async () => {
        try {
          const response = await fetch('/api/teaching_mechanism_counts');
          const data = await response.json();
          createPieChart(pieOne, data.data, 'donut', 200, '#727272', 'Teaching mechanisms', false);
          console.log(pieOne, " created");
          console.log(pieOne, data.data);
        } catch (error) {
          console.error('Error fetching pieOne data: ', error);
        }
      };

      const fetchPieTwoData = async () => {
        try {
          const response = await fetch('/api/types_of_course_counts');
          const data = await response.json();
          createPieChart(pieTwo, data.data, 'donut', 200, '#0071A4', 'Type of Course', false);
          console.log(pieTwo, " created");
          console.log(pieTwo, data.data);
        } catch (error) {
          console.error('Error fetching pieTwo data: ', error);
        }
      };
    
      fetchData();
      fetchBarData();
      fetchPieOneData();
      fetchPieTwoData();
    }, []);
    return (
        <div id="stats_page_wrapper" className="p-4 w-full flex justify-center items-center">
            <div id="stats_page_card" className="w-11/12 p-6 rounded-lg self-center" style={{boxShadow: "0 0 20px -3px rgba(0, 0, 0, 0.25)"}}>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h2 className="text-gray-900 text-title font-bold text-center">Number of courses/trainings offered per country</h2>
                      <div id="map" className="rounded-lg self-center">
                      </div>
                    </div>
                    
                    <div id="bargraph" className="py-4 self-center flex justify-center w-full">
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-6">
                    <div id="piechart1" className="overflow-hidden">
                    </div>
                    <div id="piechart2" className="overflow-hidden">
                    </div>
                </div>
                
                <div id="reset-filters" className="mt-8">
                    <button id="reset_stats_page" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-150">
                        Reset stats
                    </button>
                </div>
            </div>
        </div>
      );
}