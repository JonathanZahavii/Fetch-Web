import { Box, Grid, Typography } from '@mui/material';
import { FormButton } from '../style';
import { ActivityLevel, PreferenceQuestionnaireFormFields } from '../../types';
import { useFormContext } from 'react-hook-form';
import { ActivityLevelDescription } from './consts';
import { PreferenceQuestionnaireFieldsNames } from '../../formFields';
import { useCallback } from 'react';
import { PreferenceFieldForm } from '../PreferenceFieldForm';

export const ActivityLevelForm: React.FC = () => {
  const { watch, setValue } = useFormContext<PreferenceQuestionnaireFormFields>();

  const isActivityLevelSelected = useCallback(
    (name: string) => watch(PreferenceQuestionnaireFieldsNames.ACTIVITY_LEVEL) === name,
    [watch]
  );

  const onActivityLevelChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget?.name;
    setValue(PreferenceQuestionnaireFieldsNames.ACTIVITY_LEVEL, value as ActivityLevel);
  };

  return (
    <PreferenceFieldForm
      title={'What is your activity level?'}
      fields={[
        {
          fieldTitle: 'Please choose the one that fits the most',
          field: (
            <Grid container gap={'1rem .6rem'}>
              {Object.entries(ActivityLevel).map(([key, value]) => (
                <Grid item key={key} xs={12}>
                  <FormButton
                    sx={{ p: 5, justifyContent: 'flex-start' }}
                    variant={'outlined'}
                    name={value}
                    isSelected={isActivityLevelSelected(value)}
                    onClick={onActivityLevelChange}
                  >
                    <Typography variant='h6' align='left'>
                      {value}
                      <br />
                      <Box color={'secondary.dark'} fontSize={10}>
                        {ActivityLevelDescription[value as ActivityLevel]}
                      </Box>
                    </Typography>
                  </FormButton>
                </Grid>
              ))}
            </Grid>
          ),
        },
      ]}
    />
  );
};
