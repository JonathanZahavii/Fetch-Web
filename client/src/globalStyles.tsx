import { GlobalStyles } from '@mui/material';

export default (
  <GlobalStyles
    styles={{
      '*::-webkit-scrollbar': {
        width: '10px',
        height: '10px',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: '#4B36C7', // Customize as needed
        borderRadius: '10px',
        border: '2px solid #f1f1f1', // Adds space around the thumb
      },
      '*::-webkit-scrollbar-track': {
        backgroundColor: '#f1f1f1', // Customize as needed
        borderRadius: '10px',
      },
      '*::-webkit-scrollbar-button': {
        display: 'none', // Hides the scrollbar buttons (arrows)
      },
    }}
  />
);
