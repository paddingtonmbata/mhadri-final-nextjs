import { Filters } from "@/components/filteringpage";
import Courses from "@/components/course";
import LandingPage from "@/components/landingpage";
import Definitions from "@/components/definitions";

export default function Home() {
  return (
    <main className="w-full">
      <LandingPage isSearchPage={true} />
      <Filters />
      <Courses />
      <Definitions />
    </main>
  );
}
