import { styled } from '@mui/material';

export const TrainerImg = styled('img')<{ align: 'left' | 'right' }>(({ align }) => ({
  position: 'absolute',
  width: '20%',
  right: align === 'right' ? 0 : 'unset',
  left: align === 'left' ? 0 : 'unset',
  bottom: 0,
}));
