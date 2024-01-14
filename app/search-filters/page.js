import { Filters } from "@/components/filteringpage";
import Courses from "@/components/course";
import LandingPage from "@/components/landingpage";

export default function Home() {
  return (
    <main className="w-full">
      <LandingPage isSearchPage={true} />
      <Filters />
      <Courses />
    </main>
  );
}
