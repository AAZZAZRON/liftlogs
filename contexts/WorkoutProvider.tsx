import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

interface WorkoutContextType {
    workoutId: number;
    setWorkoutId: Function;
}

const WorkoutContext = createContext<WorkoutContextType | null>(null);

export const WorkoutContextProvider = ({ children }: any) => {
    const [workoutId, setWorkoutId] = useState(-1);

    const fetchWorkoutId = async () => {
        const response = await axios.get(`workouts/uncompleted`);
        if (response) {
            setWorkoutId(response.data.id);
        }
    }

    useEffect(() => {   
        fetchWorkoutId();
    }, []);

    return (
        <WorkoutContext.Provider value={{ workoutId, setWorkoutId }}>
            { children }
        </WorkoutContext.Provider>
    )
}

export const useWorkoutContext = () => {
    const context = useContext(WorkoutContext);
    if (!context) {
      throw new Error("useHomeApi must be used within a HomeApiProvider");
    }
    return context;
};
