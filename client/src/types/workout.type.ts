export type Workout = {
  id: string,
  type: WorkoutType
  durationMin: number
  datetime: Date
  calories: number
  isDone: boolean
}

export enum WorkoutType {
  Strength = "Strength",
  Cardio = "Cardio",
  Flexibility = "Flexibility",
  Cycling = "Cycling",
}
