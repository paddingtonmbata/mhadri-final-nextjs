"use client";
import { useCourses } from "./courses";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';

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
  const handleDownload = () => {
    const excelBuffer = convertToXLSX(courses);
    downloadExcelFile(excelBuffer, `courses_${courses.length}.xlsx`);
  };

  return (
    <>
    <div className="entries mt-8 w-full flex flex-row justify-center items-center">
        <p>{courses.length ? courses.length : "No"} course{courses.length > 1 ? "s": ""} found</p>
        {courses ? <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-150 mx-5" onClick={handleDownload}>Download as XLSX</button>: <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-150 mx-5" >No Courses to download</button>}
      </div>
    <div id="courses" className="courses w-full p-12 flex flex-wrap justify-evenly">
      
      {courses.map((course) => (
        <div key={course.id} className="course rounded-2xl w-full lg:w-5/12 p-6 pb-8 relative mb-5" style={{boxShadow: "0 0 20px -3px rgba(0, 0, 0, 0.25)"}}>
          <div className="course-title-container">
            <h3>
              <strong>
                <a href={course.source}>
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
              <div className="hidden">
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
            <div className="col-2 hidden">
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
          <div className="footnotes">
            <p className="created text-sm text-gray-700">{toDate(course.created_at)}</p>
          </div>
        </div>
      ))}
      ;
    </div>
    </>
  );
};
export default Courses;