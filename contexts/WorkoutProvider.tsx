import { createContext, useState, useContext } from "react";

interface WorkoutContextType {
    workoutId: number;
    setWorkoutId: Function;
}

const WorkoutContext = createContext<WorkoutContextType | null>(null);


export const WorkoutContextProvider = ({ children }: any) => {
    const [workoutId, setWorkoutId] = useState(-1);

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
