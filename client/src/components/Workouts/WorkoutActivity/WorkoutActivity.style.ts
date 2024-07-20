import { theme } from "@/configs"
import { SxProps } from "@mui/material"

const outerBox: SxProps = {
  flexGrow: 1,
  display: "flex",
  padding: "1rem",
  backgroundColor: theme.palette.secondary.dark,
  borderRadius: "8px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
  boxSizing: "border-box",
  overflowY: "auto",
  flexDirection: "column",
  height: "100%",
  maxWidth: "500px",
  margin: "0 auto",
}

const titleBox: SxProps = {
  display: "flex",
  alignItems: "center",
  mb: "5%",
  pb: 1,
  borderBottom: `2px solid ${theme.palette.primary.contrastText}`,
}

const title: SxProps = {
  variant: "h3",
  color: "primary.contrastText",
  sx: { textAlign: "left" },
}

const workoutIconBox: SxProps = {
  ml: "auto",
}

const doneButton: SxProps = {
  variant: "contained",
  color: "secondary",
}

const doneButtonBox: SxProps = { mt: "auto", alignSelf: "flex-end" }

const workoutActivityField: SxProps = {
  variant: "h4",
  color: "primary.contrastText",
  sx: { textAlign: "left", width: "100%", mb: 1 },
}

export default {
  outerBox,
  titleBox,
  title,
  workoutIconBox,
  doneButtonBox,
  doneButton,
  workoutActivityField,
}
