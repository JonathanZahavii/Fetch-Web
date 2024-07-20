import { Grid } from '@mui/material';
import { Form } from './Form';
import { FormWrapper } from './style';
import { WithTrainersImages } from '../HOC';

export const PreferenceQuestionnaire: React.FC = WithTrainersImages(() => {
  return (
    <Grid container height={'100%'} justifyContent={'space-evenly'} position={'relative'}>
      <FormWrapper xs={4} direction={'column'} zIndex={1}>
        <Form />
      </FormWrapper>
    </Grid>
  );
});
