import React from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppLogo } from '../../../assets';
import dictionary from '../../../dictionary';
import { useMultiStepForm } from '../../../hooks';
import { FormActionButton } from './style';
import { PreferenceQuestionnaireFormFields } from '../types';
import { getFormDefaultValues } from '../formFields';
import { validationSchema } from '../validation';
import {
  AboutYourselfForm,
  ActivityLevelForm,
  DaysForm,
  GoalsForm,
  PhysicalDataForm,
  WorkoutDurationForm,
  WorkoutsForm,
} from '../FormSteps';

export const Form: React.FC = () => {
  const {
    multiStepForm: { nextBtn, doneBtn, backBtn },
  } = dictionary;
  const { currentStepIndex, isFirstStep, isLastStep, step, steps, next, back } = useMultiStepForm([
    <AboutYourselfForm />,
    <PhysicalDataForm />,
    <ActivityLevelForm />,
    <GoalsForm />,
    <DaysForm />,
    <WorkoutsForm />,
    <WorkoutDurationForm />,
  ]);
  const form = useForm<PreferenceQuestionnaireFormFields>({
    mode: 'onSubmit',
    defaultValues: getFormDefaultValues(),
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = form;

  const onSubmit = () => {
    // TODO: save preferences in server
  };

  return (
    <FormProvider {...form}>
      <form>
        <Grid container p={4} direction={'column'}>
          <Grid item container direction={'column'} alignItems={'center'}>
            <Grid item>
              <img src={AppLogo} width={100} height={'fit-content'} />
            </Grid>
          </Grid>
          <Grid item container direction={'column'} justifyContent={'flex-start'} marginTop={2}>
            <Typography variant='h6' color={'secondary.light'}>
              {`Step ${currentStepIndex + 1} / ${steps.length}`}
            </Typography>
            <Divider
              sx={{ height: '6px', backgroundColor: 'secondary.light' }}
              orientation={'horizontal'}
              variant={'fullWidth'}
            />
            <Grid
              item
              container
              gap={'1rem .5rem'}
              direction={'column'}
              sx={{ height: '300px' }}
              p={2}
              marginTop={2}
            >
              {step}
            </Grid>
          </Grid>
          <Grid item container alignSelf={'flex-end'} justifyContent={'space-between'}>
            <Grid item>
              {!isFirstStep && <FormActionButton onClick={back}>{backBtn}</FormActionButton>}
            </Grid>
            <Grid item>
              <FormActionButton onClick={isLastStep ? handleSubmit(onSubmit) : next}>
                {isLastStep ? doneBtn : nextBtn}
              </FormActionButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};
