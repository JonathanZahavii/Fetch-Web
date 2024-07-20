import React from 'react';
import { StepSubTitle, StepTitle } from '../style';
import { Grid } from '@mui/material';

interface Props {
  title: string;
  fields: { fieldTitle: string; field: React.ReactNode }[];
}

export const PreferenceFieldForm: React.FC<Props> = ({ title, fields }) => {
  return (
    <Grid container height={'100%'} gap={'1rem .5rem'} direction={'column'} marginTop={2}>
      <StepTitle variant={'h5'}>{title}</StepTitle>
      <Grid item container gap={'1rem .5rem'}>
        {fields.map(({ fieldTitle, field }, index) => (
          <Grid item container key={`preferencesFormStepField-${index}`}>
            <StepSubTitle variant={'h6'} marginBottom={'1rem'}>
              {fieldTitle}
            </StepSubTitle>
            {field}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
