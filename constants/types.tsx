export type SetObject = {
    reps: number,
    weight: number,
    units: string,
    notes: string,
}

export type EntryObject = {
    id: number,
    date: Date,
    exercise_id: number,
    notes: string,
    sets: SetObject[],
}

export type ExerciseObject = {
    id: number,
    name: string,
    logs: EntryObject[],
}

