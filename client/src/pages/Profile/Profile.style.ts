import theme from '@/Theme';
import { SxProps } from '@mui/material';

const outerBox: SxProps = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.secondary.dark,
};

export default { outerBox };
