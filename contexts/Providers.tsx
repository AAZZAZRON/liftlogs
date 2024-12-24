import { createContext, useState, Dispatch, SetStateAction } from "react";

interface WorkoutContextType {
    workoutId: number;
    setWorkoutId: Dispatch<SetStateAction<number>>;
}

export const WorkoutContext = createContext<WorkoutContextType | null>(null);


export const WorkoutContextProvider = ({ children }: any) => {
    const [workoutId, setWorkoutId] = useState(-1);

    return (
        <WorkoutContext.Provider value={{ workoutId, setWorkoutId }}>
            { children }
        </WorkoutContext.Provider>
    )
}