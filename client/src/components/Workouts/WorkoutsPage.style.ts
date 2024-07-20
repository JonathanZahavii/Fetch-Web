import { SxProps } from "@mui/material"

const outerBox: SxProps = {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  overflow: "auto",
  width: "100%",
  height: "100%",
  padding: "1rem",
}

const stack: SxProps = {
  direction: "row",
  alignItems: "center",
  justifyContent: "center",
  spacing: 30,
  sx: {
    width: "100%",
    height: "100%",
    padding: "1rem",
  },
}
export default { outerBox, stack }
