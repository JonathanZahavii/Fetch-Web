import Loader from "@/components/Loader"
import { Workout } from "@/types/workout.type"
import { Refresh } from "@mui/icons-material"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import Styles from "./WorkoutPlan.style"
import WorkoutPlanItem from "./WorkoutPlanItem"

type Props = {
  workouts: Workout[] | null
  setWorkout: Dispatch<SetStateAction<Workout | null>>
  fetchWorkouts: () => void
}

const WorkoutPlan = ({ workouts, setWorkout, fetchWorkouts }: Props) => {
  return (
    <Box sx={Styles.outerBox}>
      <Box sx={Styles.titleBox}>
        <Typography {...Styles.title}>Your Weekly Workout Plan</Typography>
        <Box sx={Styles.refreshIconBox}>
          <Tooltip title="Refresh workout plan">
            <IconButton onClick={fetchWorkouts}>
              <Refresh {...Styles.refreshIcon} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {!workouts ? (
        <Loader />
      ) : workouts.length == 0 ? (
        <Typography {...Styles.workoutPlanItemField}>
          Looks like no training this week...
        </Typography>
      ) : (
        <Box sx={Styles.workoutList}>
          {workouts.map((workout, index) => (
            <WorkoutPlanItem
              key={index}
              workout={workout}
              setWorkout={setWorkout}
              index={index}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default WorkoutPlan
