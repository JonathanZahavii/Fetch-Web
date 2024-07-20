import { Button, SxProps, TextField, Typography, styled } from '@mui/material';

export const StepTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));

export const StepSubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

export const FormButton = styled(Button)<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  color: theme.palette.info.main,
  border: `1px solid ${isSelected ? theme.palette.info.main : 'unset'}`,
  backgroundColor: isSelected ? theme.palette.secondary.main : theme.palette.primary.light,
  height: '30px',
  p: 2,
  width: '100%',
  '&:hover': {
    borderColor: theme.palette.info.main,
    backgroundColor: theme.palette.primary.contrastText,
  },
}));

export const FormTextField = styled(TextField)(({ theme }) => ({
  color: theme.palette.info.main,
  backgroundColor: theme.palette.primary.light,
  height: '30px',
  p: 2,
  borderRadius: '4px',
}));

export default {
  textField: {
    '& .MuiInputBase-root': {
      height: '30px',
      color: 'info.main',
      fontSize: '13px',
    },
  },
} as Record<string, SxProps>;
