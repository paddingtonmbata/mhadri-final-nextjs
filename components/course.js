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
    target_population: course.target_population,
    objective_of_training: course.objective_of_training,
    thematic_focus: course.thematic_focus,
    teaching_approach: course.teaching_approach,
    frequency_of_training: course.frequency_of_training,
    funding_schemes: course.funding_schemes,
    sustainibility_factors: course.sustainibility_factors,
    key_challenges: course.key_challenges
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
    <div id="courses" className="courses w-full p-12 flex flex-wrap justify-evenly">
      
      {courses.map((course) => (
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
                    <strong> Target population: </strong> {course.target_population}
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
                <strong> Teaching approach: </strong> {course.teaching_approach}
              </p>
              <p>
                <strong> Frequency of Training: </strong>
                {course.frequency_of_training}
              </p>
              <p>
                <strong> Funding Schemes: </strong> {course.funding_schemes}
              </p>
              <p>
                <strong> Sustainibility factors: </strong>
                {course.sustainibility_factors}
              </p>
              <p>
                <strong> Key Challenges: </strong>
                {course.key_challenges}
              </p>
            </div>
          </div>
          <div className="row-2">
            <p>
              <strong> Scope: </strong>{course.scope}
            </p>
          </div>
          <div className="footnotes p-2 absolute bottom-1 left-1">
            <p className="created text-sm text-gray-500">{toDate(course.created_at)}</p>
          </div>
          <button id="expand-button" onClick={() => toggleExpanded(course.id)} className="bg-blue-500 font-bold text-white px-2 py-2 rounded-2xl hover:text-blue-600 hover:bg-white focus:outline-none focus:shadow-outline-blue active:bg-white active:text-blue-500 transition duration-150 absolute bottom-1 right-1 text-sm">
          {expandedCourses[course.id] ? 'Read less' : 'Read more'}
          </button>
        </div>
      ))}
    </div>
    </>
  );
};
export default Courses;

