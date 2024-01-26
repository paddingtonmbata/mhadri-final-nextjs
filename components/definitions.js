/* eslint-disable react/no-unescaped-entities */
export default function Definitions() {
  return (
    <div className="definitions py-5 px-7 lg:px-14 w-full flex flex-col justify-items-center justify-center text-left">
      <h3 className="text-pg-title-m lg:text-pg-title font-bold text-left">
        Definitions / set of criteria
      </h3>
      <br />

      <table className="w-full text-base-m lg:text-base">
        <tbody>
          <tr className="mb-4">
            <th className="w-1/4">Institution:</th>
            <td>The official name of the organization or academic institution responsible for offering the course or training. E.g., "Harvard University" or "World Health Organization."</td>
          </tr>
          <tr>
            <th>Institution Location:</th>    
            <td>The country where the institution offering the course is primarily based. This may differ from the actual location where the course is taught, especially for online courses.</td>
          </tr>
          <tr>
            <th>Type of Course:</th>
            <td>The academic level or format of the course. E.g., "PhD" for doctoral-level courses, "Online Course" for courses conducted primarily or entirely online.</td>
          </tr>
          <tr>
            <th>Thematic Focus:</th>
            <td>The primary subject area or topics that the course covers. E.g., "Migration Studies," "Public Health," etc.</td>
          </tr>
          <tr>
            <th>Population Focus:</th>
            <td>The specific group or demographic that the course aims to benefit. Examples include "migrants," "healthcare workers," or "policy makers."</td>
          </tr>
          <tr>
            <th>Scope:</th>
            <td>A brief description outlining the range of topics, skills, or competencies the course or training aims to cover.</td>
          </tr>
          <tr>
            <th>Objectives of Training:</th>
            <td>Clear goals that the course or training aims to achieve, such as skill development, knowledge transfer, or competency building.</td>
          </tr>
          <tr>
            <th>Methods of teaching:</th>
            <td>The pedagogical methods employed in the course, which could range from "Participatory" and "Case Study-Based" to "Didactic" or "Interactive.</td>
          </tr>
          <tr>
            <th>Frequency of Training:</th>
            <td>Indicates how often the course or training is offered, such as "Annually," "Bi-Annually," or "On-demand."</td>
          </tr>
          <tr>
            <th>Funding/Grants availabliliy:</th>
            <td>The availabilty of funding schemes offered for the particular course or training program</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
