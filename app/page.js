import LandingPage from "@/components/landingpage";
import Dashboard from "@/components/dashboard";
// import {Filters} from "@/components/filteringpage";
// import Courses from "@/components/course";

export default function Home() {
  return (
    <main className="w-full">
      <LandingPage />
      <Dashboard />
      {/* <Filters/>
      <Courses/> */}
    </main>
  );
}
