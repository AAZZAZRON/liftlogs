import { createContext, useState, useEffect, useContext } from "react";
import { ExerciseObject, StatObject } from "@/constants/types";
import axios from "axios";

interface ApiContextType {
    exerciseData: ExerciseObject[],
    statsData: StatObject[],
    loading: Boolean,
    reload: Function;
}

const HomeApiContext = createContext<ApiContextType | null>(null);

// Deal with all of the API calling in the background
export const HomeApiContetProvider = ({ children }: any) => {
    const [exerciseData, setExerciseData] = useState([]);
    const [statsData, setStatsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchExerciseData = async () => {
        const response = await axios.get(`http://10.0.0.211:5000/exercise/all`);
        if (response) console.log(response.data[0].logs)
        setExerciseData(await response.data);
    }

    const fetchStatsData = async () => {
        const response = await axios.get(`http://10.0.0.211:5000/stats/all`);
        setStatsData(await response.data);
    }

    const fetchApiData = async () => {
        setLoading(true);
        try {
            await fetchExerciseData();
            await fetchStatsData();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchApiData();
    }, []);

    return (
        <HomeApiContext.Provider value={{ exerciseData, statsData, loading, reload: fetchApiData }}>
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

