"use client";
import { useCourses } from "./courses";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import $ from "jquery";

import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';

import { useState, useRef } from "react";

function toDate(date) {
  const formattedDate = date.replace('Z', '');
  const originalDate = new Date(formattedDate);

  // Format the date
  const formattedDateString = originalDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return formattedDateString;  
}

function generateExcelData(courses) {
  return courses.map(course => ({
    source: course.source,
    institution_name: course.institution_name,
    institution_location: course.institution_location,
    scope: course.scope,
    type_of_course: course.type_of_course,
    teaching_mechanism: course.teaching_mechanism,
    population_focus: course.population_focus,
    objective_of_training: course.objective_of_training,
    thematic_focus: course.thematic_focus,
    methods_of_teaching: course.methods_of_teaching,
    frequency_of_running_of_course: course.frequency_of_running_of_course,
    funding_availability: course.funding_availability,
    additional_details: course.additional_details,
  }));
}

function convertToXLSX(data) {
  try {
    const ws = XLSX.utils.json_to_sheet(data);
    console.log("ws: ", ws);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    console.log("excel buffer: ", excelBuffer);
    return excelBuffer;
  } catch (error) {
    console.log("Error downloading xslx", error);
  }
}

function downloadExcelFile(buffer, fileName) {
  const data = new Blob([buffer], { type: 'application/octet-stream' });
  saveAs(data, fileName);
}

const Courses = () => {
  const { courses } = useCourses();
  const courseRefs = {};

  const [expandedCourses, setExpandedCourses] = useState({});
  const {currentPage, setCurrentPage} = useCourses();
  const coursesPerPage = 6; // Set the number of courses per page

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const loadMore = () => {
    setCurrentPage(currentPage + 1);
  };
  
  const loadLess = () => {
    setCurrentPage(currentPage - 1);
  };
  
  const showLoadMore = indexOfLastCourse < courses.length;
  const showLoadLess = currentPage > 1;

  const toggleExpanded = (courseId) => {
    setExpandedCourses((prevExpandedCourses) => ({
      ...prevExpandedCourses,
      [courseId]: !prevExpandedCourses[courseId],
    }));
    const courseContainer = courseRefs[courseId];
    setTimeout(()=>{
      courseContainer.scrollIntoView({ behavior: 'smooth'});
    }, 200);    
  };

  const handleDownload = () => {
    const excelBuffer = convertToXLSX(generateExcelData(courses));
    downloadExcelFile(excelBuffer, `courses_${courses.length}.xlsx`);
  };

  return (
    <>
    <div className="entries mt-8 w-full flex flex-row justify-center items-center">
        <p>{courses.length ? courses.length : "No"} course{courses.length > 1 ? "s": ""} found</p>
        {courses ? <button className="bg-blue-500 font-bold text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-150 mx-5" onClick={handleDownload}>Download as XLSX</button>: <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-150 mx-5" >No Courses to download</button>}
      </div>
    <div id="courses" className="courses w-full p-4 lg:p-12 flex flex-wrap justify-evenly">
      
      {currentCourses.map((course) => (
        <div 
          key={course.id} 
          ref={(element) => {
            courseRefs[course.id] = element;
          }}
          id={course.id} style={{ boxShadow: "0 0 20px -3px rgba(0, 0, 0, 0.25)",width: expandedCourses[course.id] ? "100%": '', transition: 'width 0.5s ease-in-out'}} className="course rounded-2xl w-full lg:w-5/12 p-6 pb-10 relative mb-5" >
          <div className="course-title-container">
            <h3>
              <strong>
                <a href={course.source} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLink} />
                </a>{" "}
                {course.institution_name}
              </strong>
            </h3>
            <p>{course.institution_location}</p>
          </div>
          <div className="row-1">
            <div className="col-1">
              <p>
                <strong> Type of course: </strong> {course.type_of_course}
              </p>
              <p>
                <strong> Teaching mechanism: </strong>{" "}
                {course.teaching_mechanism}
              </p>
              <div className={`${expandedCourses[course.id] ? '' : 'hidden'}`}>
                <p>
                    <strong> Population focus: </strong> {course.population_focus}
                </p>
                <p>
                    <strong> Objective of training: </strong>{" "}
                    {course.objective_of_training}
                </p>
                <p>
                    <strong> Thematic Focus: </strong> {course.thematic_focus}
                </p>
              </div>
            </div>
            <div className={`col-2 ${expandedCourses[course.id] ? '' : 'hidden'}`}>
              <p>
                <strong> Methods of teaching: </strong> {course.methods_of_teaching}
              </p>
              <p>
                <strong> Frequency of running of course/training: </strong>
                {course.frequency_of_running_of_course}
              </p>
              <p>
                <strong> Funding Availability: </strong> {course.funding_availability}
              </p>
              <p>
                <strong> Additional Details: </strong>
                {course.additional_details}
              </p>
            </div>
          </div>
          <div className={`${expandedCourses[course.id] ? 'row-2' : 'hidden'}`}>
            <p>
              <strong> Scope: </strong>{course.scope}
            </p>
          </div>
          <div className="footnotes p-2 absolute bottom-1 left-1">
            <p className="created text-sm text-gray-500">Last updated: {toDate(course.created_at)}</p>
          </div>
          <button id="expand-button" onClick={() => toggleExpanded(course.id)} className="bg-blue-500 font-bold text-white px-2 py-2 rounded-2xl hover:text-blue-600 hover:bg-white focus:outline-none focus:shadow-outline-blue active:bg-white active:text-blue-500 transition duration-150 absolute bottom-1 right-1 text-sm">
          {expandedCourses[course.id] ? 'Read less' : 'Read more'}
          </button>
        </div>
      ))}
    </div>
    <div className="course-buttons flex justify-center">
    {showLoadLess && (<button onClick={loadLess} className="bg-blue-500 font-bold text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-150 mx-5">Previous page </button>)}  {showLoadMore && (<button onClick={loadMore} className="bg-blue-500 font-bold text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-150 mx-5">Next page </button>)} 
    </div>
    </>
  );
};
export default Courses;

