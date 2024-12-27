import { createContext, useState, useEffect, useContext } from "react";
import { ExerciseObject, StatObject } from "@/constants/types";
import axios from "axios";

interface ApiContextType {
    exerciseData: ExerciseObject[],
    statsData: StatObject[],
    loading: boolean,
    reload: Function,
    getExercise: Function,
    getStat: Function,
    search: string,
    setSearch: Function,
}

const ApiContext = createContext<ApiContextType | null>(null);

// Deal with all of the API calling in the background
export const ApiContextProvider = ({ children }: any) => {
    const [exerciseData, setExerciseData] = useState([]);
    const [search, setSearch] = useState(""); // Filtered
    const [statsData, setStatsData] = useState([]);
    const [loading, setLoading] = useState(true);

    // API Calling
    const fetchExerciseData = async () => {
        const response = await axios.get(`exercise/all`);
        setExerciseData(await response.data);
    }

    const fetchStatsData = async () => {
        const response = await axios.get(`stats/all`);
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


    // get a particular exercise/stat
    const getExercise = (id: string) => {
        return exerciseData.filter((exercise: ExerciseObject) => exercise.id === Number(id))[0] || null;
    }

    const getStat = (id: string) => {
        return statsData.filter((stat: StatObject) => stat.id === Number(id))[0] || null;
    }


    return (
        <ApiContext.Provider value={{ exerciseData, statsData, loading, reload: fetchApiData, getExercise, getStat, search, setSearch }}>
            { children }
        </ApiContext.Provider>
    )
}

export const useApiContext = () => {
    const context = useContext(ApiContext);
    if (!context) {
      throw new Error("useApiContext must be used within a ApiContextProvider");
    }
    return context;
};

