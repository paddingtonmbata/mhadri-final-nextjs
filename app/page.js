import LandingPage from "@/components/landingpage";
import Dashboard from "@/components/dashboard";
// import {Filters} from "@/components/filteringpage";
// import Courses from "@/components/course";
import Definitions from "@/components/definitions";

export default function Home() {
  return (
    <main className="w-full">
      <LandingPage isSearchPage={false}/>
      <Dashboard />
      <Definitions />
    </main>
  );
}

/**
 * Institution	The official name of the organization or academic institution responsible for offering the course or training. E.g., "Harvard University" or "World Health Organization."
Institution Location	The country where the institution offering the course is primarily based. This may differ from the actual location where the course is taught, especially for online courses.
Type of course	The academic level or format of the course. E.g., "PhD" for doctoral-level courses, "Online Course" for courses conducted primarily or entirely online.
Thematic focus	The primary subject area or topics that the course covers. E.g., "Migration Studies," "Public Health," etc.
Population focus	The specific group or demographic that the course aims to benefit. Examples include "migrants," "healthcare workers," or "policy makers."
Scope	A brief description outlining the range of topics, skills, or competencies the course or training aims to cover.
Objectives of training	Clear goals that the course or training aims to achieve, such as skill development, knowledge transfer, or competency building.
Teaching approach	The pedagogical methods employed in the course, which could range from "Participatory" and "Case Study-Based" to "Didactic" or "Interactive."
Frequency of Training	Indicates how often the course or training is offered, such as "Annually," "Bi-Annually," or "On-demand."
Funding Schemes	Sources or mechanisms through which the course or training receives financial support. Could be internal (from the hosting Institution) or external grants.
Sustainabiity Factors	Elements that contribute to the long-term sustainability of the course, such as consistent funding, institutional support, or a steady demand.
Numbers Trained Since 2015	An estimate or exact count of individuals who have completed the course or training since the year 2015.
Key Challenges	Major obstacles or challenges faced in offering or maintaining the course or training, such as funding issues, resource constraints, or regulatory hurdles.
 */