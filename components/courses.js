"use client";
// Courses.js
import React, { useContext, useEffect, useState } from 'react';

// Create a context for managing courses
const CoursesContext = React.createContext();

// Create a CoursesProvider component to wrap your app and manage the courses state
export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  // Fetch all courses initially
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://mhadri-final-database-af023718fb18.herokuapp.com/api/courses_data');
        const data = await response.json();
        setCourses(data.data.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <CoursesContext.Provider value={{ courses, setCourses }}>
      {children}
    </CoursesContext.Provider>
  );
};
// Create a useCourses hook to access the courses context
export const useCourses = () => {
  return useContext(CoursesContext);
};