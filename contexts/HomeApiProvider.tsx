import { createContext, useState, useEffect, useContext } from "react";
import { ExerciseObject, StatObject } from "@/constants/types";
import axios from "axios";

interface ApiContextType {
    exerciseData: ExerciseObject[],
    statsData: StatObject[],
    loading: boolean,
    reload: Function,
    search: string,
    setSearch: Function,
}

const HomeApiContext = createContext<ApiContextType | null>(null);

// Deal with all of the API calling in the background
export const HomeApiContetProvider = ({ children }: any) => {
    const [exerciseData, setExerciseData] = useState([]);
    const [search, setSearch] = useState(""); // Filtered
    const [statsData, setStatsData] = useState([]);
    const [loading, setLoading] = useState(true);

    // API Calling
    const fetchExerciseData = async () => {
        const response = await axios.get(`http://10.0.0.211:5000/exercise/all`);
        setExerciseData(await response.data);
    }

    const fetchStatsData = async () => {
        const response = await axios.get(`http://10.0.0.211:5000/stats/all`);
        setStatsData(await response.data);
    }

    const fetchApiData = async () => {
        setLoading(true);
        try {
            console.log("fetching...")
            await fetchExerciseData();
            await fetchStatsData();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setSearch("");
        }
    }

    // on component mount
    useEffect(() => {
        fetchApiData();
    }, []);

    return (
        <HomeApiContext.Provider value={{ exerciseData, statsData, loading, reload: fetchApiData, search, setSearch }}>
            { children }
        </HomeApiContext.Provider>
    )
}

export const useHomeApiContext = () => {
    const context = useContext(HomeApiContext);
    if (!context) {
      throw new Error("useHomeApi must be used within a HomeApiProvider");
    }
    return context;
};

