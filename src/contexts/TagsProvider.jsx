import { createContext, useState, useEffect } from "react";
import { getAllTags } from "../api/tags";

export const TagsContext = createContext();

export const TagsProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getAllTags();
        setTags(response.data);
      } catch(error) {
        console.error("Error fetching tags:", error);
        throw error;
      }
    };
    fetchTags();
  }, []);

  return (
    <TagsContext.Provider value={{tags}}>
      {children}
    </TagsContext.Provider>
  );
};