import { Button, styled } from '@mui/material';

export const FormActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.info.main,
  color: theme.palette.primary.contrastText,
  width: 'fit-content',
  height: 'fit-content',
}));
