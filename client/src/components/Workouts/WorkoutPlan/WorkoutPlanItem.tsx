import { Workout } from "@/types/workout.type"
import { Box, Typography } from "@mui/material"
import { format } from "date-fns"
import { Dispatch, SetStateAction } from "react"
import WorkoutIcon from "../WorkoutIcon"
import Styles from "./WorkoutPlan.style"

type Props = {
  workout: Workout
  setWorkout: Dispatch<SetStateAction<Workout | null>>
  index: number
}

const WorkoutPlanItem = ({ workout, setWorkout, index }: Props) => {
  const datetime = format(workout.datetime, "EEEE, HH:mm, dd/MM/yyyy")

  return (
    <Box
      sx={Styles.workoutPlanItemBox(workout.isDone)}
      key={index}
      onClick={() => setWorkout(workout)}
    >
      <Box sx={Styles.workoutPlanItemIconBox}>
        <WorkoutIcon type={workout.type} />
      </Box>

      <Box>
        <Typography {...Styles.workoutPlanItemField}>{datetime}</Typography>
        <Typography {...Styles.workoutPlanItemField}>{workout.type}</Typography>
      </Box>
    </Box>
  )
}

export default WorkoutPlanItem
