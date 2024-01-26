"use client";

import ApexCharts from "apexcharts";
import { useEffect } from "react";
import $ from "jquery";
import "../public/js/jquery-jvectormap-2.0.5.min";
import "../public/js/jquery-jvectormap-world-mill";

import { useCourses } from "./courses";

const createMap = (id, data, updateCourses) => {
  let mapData = {};

  // creates an object for the chloropleth effect on the map
  for (var i = 0; i < data.length; i++) {
    var countryCode = Object.keys(data[i])[0];
    var courseCount = data[i][countryCode];
    mapData[countryCode] = courseCount;
  }

  console.log("map data: ", mapData);

  const mapObject = $(id).vectorMap({
    map: "world_mill",
    backgroundColor: "transparent",
    zoomOnScroll: true,
    regionStyle: {
      initial: {
        fill: "#333333",
        "fill-opacity": 1,
      },
      hover: {
        "fill-opacity": 0.6,
      },
      selected: {
        fill: "white",
      },
    },
    series: {
      regions: [
        {
          values: mapData,
          scale: ["#e7cdfe", "#5653FE"],
          normalizeFunction: "polynomial",
          min: 0,
          max: Math.max(...Object.values(mapData)),
          defaultFill: "#727272",
        },
      ],
    },
    onRegionTipShow: function (e, el, code) {
      var countryName = $(id).vectorMap("get", "mapObject").getRegionName(code);
      var courseCount = mapData[code];
      if (courseCount) {
        el.html(countryName + " - " + courseCount);
      } else {
        el.html(countryName + " - O");
      }
    },
    onRegionClick: async function (event, code) {
      try {
        const courseResponse = await fetch(`/api/courses_by_country/${code}`);
        const data = await courseResponse.json();
        updateCourses(data.data.data);
        const typeofcourseRespone = await fetch(
          `api/type_of_course_counts_by_code/${code}`
        );
        const typeofcourseData = await typeofcourseRespone.json();
        const teachingmechanismRespone = await fetch(
          `api/teaching_mechanism_counts_by_code/${code}`
        );
        const teachingmechanismData = await teachingmechanismRespone.json();
        const piechart1 = document.querySelector("#piechart1");
        const piechart2 = document.querySelector("#piechart2");
        if (piechart1) {
          createPieChart(
            "#piechart1",
            teachingmechanismData.data,
            "donut",
            200,
            "#621302",
            "Teaching mechanisms",
            code
          );
        }
        if (piechart2) {
          createPieChart(
            "#piechart2",
            typeofcourseData.data,
            "donut",
            200,
            "#0071A4",
            "Type of Course",
            code
          );
        }
        piechart1.scrollIntoView({ behavior: "smooth" });
      } catch (error) {
        console.error(`Error fetching course data: ${error}`);
      }
    },
  });
};

async function createPieChart(
  chartId,
  data,
  chartType,
  legend_height,
  pieColor,
  title,
  code
) {
  const options = {
    series: data.data,
    labels: data.labels,
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "right",
      height: legend_height,
    },
    responsive: [
      {
        breakpoint: 1490,
        options: {
          chart: {
            width: "100%",
            height: "500px",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    title: {
      text: title,
      align: "center",
      style: {
        fontSize: "14px",
        fontFamily: "IBM Plex Mono, monospace",
      },
    },
    theme: {
      palette: "palette10",
      monochrome: {
        enabled: false,
      },
    },
    chart: {
      type: chartType,
      height: "369px",
      events: {
        // clicking on the piechart will render courses with that specific filter indicated by the piechart
        dataPointSelection: async function (event, chartContext, config) {
          // const category = config.w.config.labels[config.dataPointIndex];
          // const response = await fetch(`/api/courses_by_category_code/${code}/${category}`);
          // const data = response.json();
          // console.log(`Response from ${code}, ${category}: `, data.data);
        },
      },
    },
  };
    if (typeof window[chartId] === "undefined") {
      // Create a new chart instance
      window[chartId] = new ApexCharts(
        document.querySelector(chartId),
        options
      );
      await window[chartId].render();
    } else {
      // Update the existing chart instance
      console.log("window: ", window[chartId]);
      console.log(data.data);
      await window[chartId].updateSeries(data.data, true); // Update series data
      await window[chartId].updateOptions(options);
    }
    console.log("Chart instance:", window[chartId]);
  }

export default function Dashboard() {
  const { setCourses } = useCourses();
  const updateCourses = (data) => {
    setCourses(data);
  };
  const id = "#map";
  const pieOne = "#piechart1";
  const pieTwo = "#piechart2";

  const fetchData = async () => {
    console.log("Running map fetch");
    try {
      const response = await fetch("/api/country_chloropleth");
      const data = await response.json();
      createMap(id, data.data, updateCourses);
    } catch (error) {
      console.error("Error fetching map data:", error);
    }
  };

  const fetchPieOneData = async () => {
    console.log("running pie one fetch")
    try {
      const response = await fetch("/api/teaching_mechanism_counts");
      const data = await response.json();
      createPieChart(
        pieOne,
        data.data,
        "donut",
        200,
        "#621302",
        "Teaching mechanisms",
        false
      );
    } catch (error) {
      console.error("Error fetching pieOne data: ", error);
    }
  };

  const fetchPieTwoData = async () => {
    console.log("running pie two fetch")
    try {
      const response = await fetch("/api/types_of_course_counts");
      const data = await response.json();
      createPieChart(
        pieTwo,
        data.data,
        "donut",
        200,
        "#0071A4",
        "Type of Course",
        false
      );
    } catch (error) {
      console.error("Error fetching pieTwo data: ", error);
    }
  };

  const resetStats = () => {
    fetchPieOneData();
    fetchPieTwoData();
  };
  const showAlert = () => {
    alert("Clicking on a country will cause the pie charts to reflect the teaching mechanism and type of courses. The pie chart filters for the clicked country.\n\nPlease note that the dashboard only provides general data of the entire database and more precise filters can be applied at the Search Trainings/Courses section of this site.");
  }

  useEffect(() => {
    window[pieOne] = undefined;
    window[pieTwo] = undefined;
    fetchData();
    fetchPieOneData();
    fetchPieTwoData();
  }, []);
  return (
    <div
      id="stats_page_wrapper"
      className="p-2 lg:p-12 w-full flex justify-center items-center"
    >
      <div
        id="stats_page_card"
        className="w-11/12 p-2 lg:p-6 rounded-lg self-center"
        style={{ boxShadow: "0 0 20px -3px rgba(0, 0, 0, 0.25)" }}
      >
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> */}<div>
          <div>
            <h2 className="text-gray-900 text-title font-bold text-center">
              Number of trainings/courses per country
            </h2>
            <div id="map" className="rounded-lg self-center"></div>
            <button
              className="cursor-pointer bg-blue-500 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-150 max-w-full"
              onClick={showAlert}
            >
              How to use the map
            </button>
          </div>

          {/* <div
            id="bargraph"
            className="py-4 self-center flex justify-center w-full"
          ></div> */}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-6">
          <div id="piechart1" className="overflow-hidden"></div>
          <div id="piechart2" className="overflow-hidden"></div>
        </div>

        <div id="reset-filters" className="mt-8">
          <button
            id="reset_stats_page"
            onClick={resetStats}
            className="bg-blue-500 text-white px-4 py-2 text-sm rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-150"
          >
            Reset stats
          </button>
        </div>
      </div>
    </div>
  );
}
