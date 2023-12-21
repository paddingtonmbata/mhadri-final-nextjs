import {Filters} from "@/components/filteringpage";
import Courses from "@/components/course";

export default function Home() {
  return (
    <main className="w-full">
      <Filters/>
      <Courses/>
    </main>
  );
}
