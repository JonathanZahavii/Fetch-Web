import { useCallback } from 'react';
import { Grid, Typography } from '@mui/material';
import { FormButton, StepSubTitle, StepTitle } from '../style';
import { ListFieldOptionByType } from '../../formFields';

interface Props {
  title: string;
  subTitle: string;
  fieldName: keyof typeof ListFieldOptionByType;
  isItemSelected: (value: string) => boolean;
  onItemClick: (value: string) => void;
}

export const PreferencesListFieldForm: React.FC<Props> = (props) => {
  const { title, subTitle, fieldName } = props;

  const isItemSelected = useCallback((item: string) => props.isItemSelected(item), [props]);

  const onItemClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const item = event.currentTarget.name;
    props.onItemClick(item);
  };

  return (
    <Grid height={'100%'} container gap={'1rem .5rem'} direction={'column'} marginTop={2}>
      <StepTitle variant={'h5'}>{title}</StepTitle>
      <StepSubTitle variant={'h6'}>{subTitle}</StepSubTitle>
      <Grid item container direction={'row'} gap={'1rem .6rem'} maxHeight={'70%'} overflow={'auto'}>
        {Object.entries(ListFieldOptionByType[fieldName]).map(([key, value]) => (
          <Grid item key={key} xs={12}>
            <FormButton
              sx={{ p: 5, justifyContent: 'center' }}
              variant={'outlined'}
              name={value}
              isSelected={isItemSelected(value)}
              onClick={onItemClick}
            >
              <Typography variant='h6'>{value}</Typography>
            </FormButton>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
