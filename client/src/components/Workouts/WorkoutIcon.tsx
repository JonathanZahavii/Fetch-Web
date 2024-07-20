import { WorkoutType } from '@/types/workout.type';
import {
  AccessibilityNew,
  DirectionsBike,
  DirectionsRun,
  FitnessCenter,
} from '@mui/icons-material';
import { SxProps } from '@mui/material';
import theme from '@/Theme';

const WorkoutIcon = ({ type }: { type: WorkoutType }) => {
  const workoutIcon: SxProps = {
    style: {
      color: theme.palette.primary.contrastText,
      fontSize: '3rem',
    },
  };

  const workoutIconMap = {
    [WorkoutType.Cycling]: <DirectionsBike {...workoutIcon} />,
    [WorkoutType.Strength]: <FitnessCenter {...workoutIcon} />,
    [WorkoutType.Cardio]: <DirectionsRun {...workoutIcon} />,
    [WorkoutType.Flexibility]: <AccessibilityNew {...workoutIcon} />,
  };
  return workoutIconMap[type];
};

export default WorkoutIcon;
