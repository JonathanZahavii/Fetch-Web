import { Fade, Grid } from '@mui/material';
import { TrainerImg } from './style';
import { MaleTrainer, FemaleTrainer } from '@/assets';

export const TrainersImages = () => {
  return (
    <>
      <Grid item xs={4} width={'fit-content'}>
        <Fade in timeout={1000}>
          <TrainerImg src={MaleTrainer} align='left' />
        </Fade>
      </Grid>
      <Grid item xs={4} width={'fit-content'}>
        <Fade in timeout={1000}>
          <TrainerImg src={FemaleTrainer} align='right' />
        </Fade>
      </Grid>
    </>
  );
};
