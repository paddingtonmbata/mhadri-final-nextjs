"use client";

import React ,{ useState, useEffect, useContext } from "react";

const FiltersContext = React.createContext();
import { useCourses } from "./courses";

export const FiltersProvider = ({ children }) => {

    const [filters, setFilters] = useState({
      thematic: { labels: [], data: [] },
      typeofcourse: { labels: [], data: [] },
      institutions: { labels: [], data: [] },
    });
    const { courses } = useCourses();
  
    const countCategoryOccurrences = (courses, categories) => {
      const occurrences = {};
  
      // Initialize the occurrences object for each category
      categories.forEach((category) => {
        occurrences[category] = {};
      });
  
      courses.forEach((course) => {
        categories.forEach((category) => {
          const categoryValue = course[category];
  
          if (occurrences[category][categoryValue]) {
            occurrences[category][categoryValue]++;
          } else {
            occurrences[category][categoryValue] = 1;
          }
        });
      });
  
      return occurrences;
    };
  
    useEffect(() => {
      const fetchFilters = async () => {
        try {
          // Fetch data from: thematic_focus_counts, type_of_course_counts, institution_counts
          // const tfCountsRes = await fetch('api/thematic_focus_counts');
          // const tfCountsData = await tfCountsRes.json();
          // const tOfCountsRes = await fetch('api/types_of_course_counts');
          // const tOfCountsData = await tOfCountsRes.json();
          // const iCountsRes = await fetch('api/institution_counts');
          // const iCountsData = await iCountsRes.json();
          const categoriesToCount = [
            'institution_name',
            'type_of_course',
            'thematic_focus',
          ];
          const categoryOccurrences = countCategoryOccurrences(
            courses,
            categoriesToCount
          );
  
          setFilters({
            thematic: categoryOccurrences.thematic_focus,
            typeofcourse: categoryOccurrences.type_of_course,
            institutions: categoryOccurrences.institution_name,
          });
        } catch (error) {
          console.error('Error setting filters: ', error);
        }
      };
      fetchFilters();
    }, [courses]);
  
    return (
      <FiltersContext.Provider value={{ filters, setFilters }}>
        {children}
      </FiltersContext.Provider>
    );
  };

export const useFilters = () => {
    return useContext(FiltersContext);
}