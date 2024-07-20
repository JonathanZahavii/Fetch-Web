import Router from '@/router/router';
import { CssBaseline, Stack, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import theme from './Theme';
import useGetRootQueryClient from './hooks/useGetrRootQueryClient';

function App() {
  const queryClient = useGetRootQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
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
    </QueryClientProvider>
  );
}

export default App;
