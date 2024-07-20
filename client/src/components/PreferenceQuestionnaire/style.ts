import { Grid, styled } from '@mui/material';

export const FormWrapper = styled(Grid)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  backgroundColor: theme.palette.secondary.dark,
  borderRadius: '15px 15px 0 0',
  width: '30%',
  minWidth: '400px',
  height: '70%',
}));
