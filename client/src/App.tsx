import Router from '@/router/router';
import { CssBaseline, Stack, ThemeProvider } from '@mui/material';
import globalStyles from './globalStyles';
import './App.css';
import theme from './Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {globalStyles}
      <CssBaseline>
        <Stack
          sx={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Router />
        </Stack>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
