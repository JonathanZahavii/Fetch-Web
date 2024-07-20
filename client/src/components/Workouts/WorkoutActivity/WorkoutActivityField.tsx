import { Typography } from "@mui/material"
import Styles from "./WorkoutActivity.style"

type Props = { label?: string; value: string }

const WorkoutActivityField = ({ label, value }: Props) => (
  <Typography {...Styles.workoutActivityField}>
    {label && <strong>{label}: </strong>} {value}
  </Typography>
)

export default WorkoutActivityField
