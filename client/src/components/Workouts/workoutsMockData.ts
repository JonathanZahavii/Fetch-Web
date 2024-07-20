import { Workout, WorkoutType } from "@/types/workout.type"

export const workoutsMockData: Workout[] = [
  {
    id: "1",
    type: WorkoutType.Strength,
    datetime: new Date("2021-10-10T10:00:00"),
    durationMin: 60,
    calories: 300,
    isDone: true,
  },
  {
    id: "2",
    type: WorkoutType.Cardio,
    datetime: new Date("2021-10-10T12:00:00"),
    durationMin: 30,
    calories: 200,
    isDone: true,
  },
  {
    id: "3",
    type: WorkoutType.Flexibility,
    datetime: new Date("2021-10-10T14:00:00"),
    durationMin: 45,
    calories: 150,
    isDone: false,
  },
  {
    id: "4",
    type: WorkoutType.Cycling,
    datetime: new Date("2021-10-10T16:00:00"),
    durationMin: 90,
    calories: 400,
    isDone: false,
  },
  {
    id: "5",
    type: WorkoutType.Strength,
    datetime: new Date("2021-10-10T18:00:00"),
    durationMin: 60,
    calories: 300,
    isDone: false,
  },
  {
    id: "6",
    type: WorkoutType.Cardio,
    datetime: new Date("2021-10-10T20:00:00"),
    durationMin: 30,
    calories: 200,
    isDone: false,
  },
];
