import { useFormContext } from 'react-hook-form';
import { PreferenceQuestionnaireFormFields } from '../../types';
import style, { FormTextField } from '../style';
import { Grid } from '@mui/material';
import { PreferenceQuestionnaireFieldsNames } from '../../formFields';
import { PreferenceFieldForm } from '../PreferenceFieldForm';

export const PhysicalDataForm: React.FC = () => {
  const { register } = useFormContext<PreferenceQuestionnaireFormFields>();

  return (
    <PreferenceFieldForm
      title={'Your Physical Data'}
      fields={[
        {
          fieldTitle: 'What is your current weight?',
          field: (
            <Grid container>
              <Grid item xs={5}>
                <FormTextField
                  {...register(PreferenceQuestionnaireFieldsNames.WEIGHT)}
                  variant={'outlined'}
                  sx={style.textField}
                  type={'number'}
                  InputProps={{ endAdornment: 'kg' }}
                />
              </Grid>
            </Grid>
          ),
        },
        {
          fieldTitle: 'What is your target weight?',
          field: (
            <Grid container>
              <Grid item xs={5}>
                <FormTextField
                  {...register(PreferenceQuestionnaireFieldsNames.TARGET_WEIGHT)}
                  variant={'outlined'}
                  sx={style.textField}
                  type={'number'}
                  InputProps={{ endAdornment: 'kg' }}
                />
              </Grid>
            </Grid>
          ),
        },
        {
          fieldTitle: 'How tall are you?',
          field: (
            <Grid container>
              <Grid item xs={5}>
                <FormTextField
                  {...register(PreferenceQuestionnaireFieldsNames.HEIGHT)}
                  variant={'outlined'}
                  sx={style.textField}
                  type={'number'}
                  InputProps={{ endAdornment: 'cm' }}
                />
              </Grid>
            </Grid>
          ),
        },
      ]}
    />
  );
};
