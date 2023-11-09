"use client";
import { useCourses } from "./courses";
  
const Courses = () => {
  const { courses } = useCourses();
  console.log("from the course comp, ", )

  return (
    <div className='courses'>
    {courses.map((course) => (        
        <div key={course.id} className="course">
            <div className="course-title-container">
                <h3><strong><a href={course.source}><i className="fa fa-link" aria-hidden="true"></i></a> {course.institution_name}</strong></h3
                ><p>{course.institution_location}</p>
            </div>
            <div className="row-1">
                <div className="col-1">
                    <p><strong> Type of course: </strong> {course.type_of_course}</p>
                    <p><strong> Thematic Focus: </strong> {course.thematic_focus}</p>
                    <p><strong> Target audience: </strong> {course.target_audience}</p>
                    <p><strong> Target population: </strong> {course.target_population}</p>
                    <p><strong> Objective of training: </strong> {course.objective_of_training}</p>
                    <p><strong> Teaching mechanism: </strong> {course.teaching_mechanism}</p>
                </div>
                <div className="col-2">
                    <p><strong> Teaching approach: </strong> {course.teaching_approach}</p>
                    <p><strong> Frequency of Training: </strong>{course.frequency_of_training}</p>
                    <p><strong> Funding Schemes: </strong> {course.funding_schemes}</p>
                    <p><strong> Sustainibility factors: </strong>{course.sustainibility_factors}</p>
                    <p><strong> Key Challenges: </strong>{course.key_challenges}</p>
                </div>
            </div>
            <div className="row-2">
                <p><strong> Scope: </strong>{course.scope}</p>
            </div>
        </div>
    ))};
    </div>

  );
};
export default Courses;