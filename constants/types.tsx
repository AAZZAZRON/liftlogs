export type SetObject = {
    reps: number,
    weight: number,
    notes: string,
}

export type EntryObject = {
    id: number,
    date: Date,
    exercise_id: number,
    text: string,
    sets: SetObject[],
}

export type ExerciseObject = {
    id: number,
    name: string,
    logs: EntryObject[],
}