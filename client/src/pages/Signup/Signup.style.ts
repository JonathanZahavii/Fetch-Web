import theme from '@/Theme';
import { TextFieldProps } from '@mui/material';
import { SxProps } from '@mui/system';

const outerBox: SxProps = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.secondary.dark,
};

const innerBox: SxProps = {
  padding: '1rem',
  backgroundColor: theme.palette.secondary.dark,
  borderRadius: '8px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
  boxSizing: 'border-box',
  overflowY: 'auto',
};

const baseField: SxProps = {
  backgroundColor: theme.palette.primary.contrastText,
  borderRadius: '4px',
};

const baseFieldProps: Omit<TextFieldProps, 'variant'> & { variant: 'outlined' } = {
  size: 'small',
  variant: 'outlined',
  required: true,
  fullWidth: true,
};

const baseLabel: SxProps = {
  color: theme.palette.primary.contrastText,
  textAlign: 'left',
};

export default { outerBox, innerBox, baseField, baseFieldProps, baseLabel };
