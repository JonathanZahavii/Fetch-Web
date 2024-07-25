import AppLogo from '@/assets/AppLogo.png';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/contexts/AuthContext';
import { getPagesRoutes } from '@/router/router.const';
import theme from '@/Theme';
import { Box, CircularProgress } from '@mui/material';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

function Router() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: (
        <ErrorBoundary FallbackComponent={() => <img src={AppLogo} />}>
          <AuthProvider>
            <Navbar />
            <Box
              sx={{
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                backgroundColor: theme.palette.secondary.dark,
              }}
            >
              <Outlet />
            </Box>
          </AuthProvider>
        </ErrorBoundary>
      ),
      children: getPagesRoutes(),
    },
  ]);

  return (
    <Suspense fallback={<CircularProgress />}>
      <RouterProvider router={routes} />
    </Suspense>
  );
}

export default Router;
