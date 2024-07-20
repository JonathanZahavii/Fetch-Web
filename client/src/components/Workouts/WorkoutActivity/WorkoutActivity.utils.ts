export const getPrettyDuration = (durationMin: number) => {
  if (durationMin < 60) {
    return `${durationMin} minutes`
  } else {
    const hours = Math.floor(durationMin / 60)
    const minutes = durationMin % 60
    const hourText =
      hours > 0 ? `${hours} ${hours === 1 ? "Hour" : "Hours"}` : ""
    const minuteText = minutes > 0 ? `${minutes} Minutes` : ""
    return `${hourText} ${minuteText}`.trim()
  }
}
