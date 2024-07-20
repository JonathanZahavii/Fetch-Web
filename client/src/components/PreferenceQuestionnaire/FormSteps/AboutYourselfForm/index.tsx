import { Grid, Typography } from '@mui/material';
import style, { FormButton, FormTextField } from '../style';
import { useFormContext } from 'react-hook-form';
import { Gender, PreferenceQuestionnaireFormFields } from '../../types';
import { PreferenceQuestionnaireFieldsNames } from '../../formFields';
import { PreferenceFieldForm } from '../PreferenceFieldForm';

export const AboutYourselfForm: React.FC = () => {
  const { register, watch, setValue } = useFormContext<PreferenceQuestionnaireFormFields>();

  const isMale = watch(PreferenceQuestionnaireFieldsNames.GENDER) === Gender.MALE;

  const onGenderChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget?.name;
    setValue(PreferenceQuestionnaireFieldsNames.GENDER, value as Gender);
  };

  return (
    <PreferenceFieldForm
      title={'About Yourself'}
      fields={[
        {
          fieldTitle: 'Please select your gender',
          field: (
            <Grid item container direction={'row'} justifyContent={'space-between'}>
              <Grid item xs={5}>
                <FormButton isSelected={isMale} name={Gender.MALE} onClick={onGenderChange}>
                  <Typography variant='h6'>{'Male'}</Typography>
                </FormButton>
              </Grid>
              <Grid item xs={5}>
                <FormButton isSelected={!isMale} name={Gender.FEMALE} onClick={onGenderChange}>
                  <Typography variant='h6'>{'Female'}</Typography>
                </FormButton>
              </Grid>
            </Grid>
          ),
        },
        {
          fieldTitle: 'How old are you?',
          field: (
            <Grid item container>
              <Grid item xs={5}>
                <FormTextField
                  {...register(PreferenceQuestionnaireFieldsNames.AGE)}
                  variant={'outlined'}
                  sx={style.textField}
                  type={'number'}
                  InputProps={{ endAdornment: 'kg' }}
                />
              </Grid>
            </Grid>
          ),
        },
      ]}
    />
  );
};
