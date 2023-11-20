"use client";

import React ,{ useState, useEffect, useContext } from "react";

const FiltersContext = React.createContext();

export const FiltersProvider = ({children}) => {
    const [filters, setFilters] = useState({});

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                // fetch data from: thematic_focus_counts, type_of_course_counts, institution_counts
                const tfCountsRes = await fetch('api/thematic_focus_counts');
                const tfCountsData = await tfCountsRes.json();
                const tOfCountsRes = await fetch('api/type_of_course_counts');
                const tOfCountsData = await tOfCountsRes.json();
                const iCountsRes = await fetch('api/institution_counts');
                const iCountsData = await iCountsRes.json();

                setFilters({
                    "thematic":tfCountsData.data,
                    "typeofcourse":tOfCountsData.data,
                    "institutions":iCountsData.data
                });
            } catch (error) {
                console.error("error setting filters: ", error)
            }            
        };
        fetchFilters();
    }, []);
    return (
        <FiltersContext.Provider value={{ filters, setFilters }}>
            {children}
        </FiltersContext.Provider>
    );
};

export const useFilters = () => {
    return useContext(FiltersContext);
}