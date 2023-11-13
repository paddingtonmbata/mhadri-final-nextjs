"use client";
import { useCourses } from "./courses";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

function toDate(date) {
    console.log(date)
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
  


const Courses = () => {
  const { courses } = useCourses();

  return (
    <>
    <div className="entries mt-8 w-full flex justify-center">
        <p>{courses.length ? courses.length : "No"} course{courses.length > 1 ? "s": ""} found</p>
      </div>
    <div className="courses w-full p-12 flex flex-wrap justify-evenly">
      
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