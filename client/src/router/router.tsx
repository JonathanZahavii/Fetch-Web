import AppLogo from '@/assets/AppLogo.png';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/contexts/AuthContext';
import { getPagesRoutes } from '@/router/router.const';
import { Box, CircularProgress } from '@mui/material';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

function Router() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: (
        <ErrorBoundary
          FallbackComponent={() => <Box component="img" src={AppLogo} sx={{ width: '20vw' }} />}
        >
          <AuthProvider>
            <Navbar />
            <Outlet />
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
