import { theme } from "@/configs"
import { SxProps, Theme } from "@mui/material"

const outerBox: SxProps = {
  flexGrow: 1,
  display: "flex",
  padding: "1rem",
  backgroundColor: theme.palette.primary.main,
  borderRadius: "8px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
  boxSizing: "border-box",
  overflowY: "auto",
  flexDirection: "column",
  height: "100%",
}

const titleBox: SxProps = {
  display: "flex",
  alignItems: "center",
  mb: "1%",
  pb: 1,
  borderBottom: `2px solid ${theme.palette.primary.contrastText}`,
}

const refreshIcon: SxProps = {
  fontSize: "large" as const,
  style: {
    color: theme.palette.primary.contrastText,
  },
}

const title: SxProps = {
  variant: "h3",
  color: "primary.contrastText",
  sx: { textAlign: "left" },
}

const refreshIconBox: SxProps = {
  ml: "auto",
}

const workoutList: SxProps = {
  flexGrow: 1,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
}

const workoutPlanItemBox = (isDone: boolean): SxProps<Theme> => ({
  display: "flex",
  alignItems: "center",
  border: `5px solid`,
  borderColor: theme.palette.primary.contrastText,
  borderTopColor: isDone
    ? theme.palette.success.main
    : theme.palette.error.main,
  margin: "1rem",
  boxSizing: "border-box",
  borderRadius: "8px",
  cursor: "pointer",
})

const workoutPlanItemField: SxProps = {
  variant: "h4",
  color: "primary.contrastText",
  sx: { textAlign: "left", width: "100%", mb: 1 },
}

const workoutIcon: SxProps = {
  style: {
    color: theme.palette.primary.contrastText,
    fontSize: "3rem",
  },
}

const workoutPlanItemIconBox: SxProps = {
  m: "1rem",
}

export default {
  outerBox,
  titleBox,
  refreshIcon,
  title,
  refreshIconBox,
  workoutList,
  workoutPlanItemBox,
  workoutPlanItemField,
  workoutIcon,
  workoutPlanItemIconBox,
}
