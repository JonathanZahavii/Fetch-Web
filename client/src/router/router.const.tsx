import { Home } from '@/components/Home';
import Unauthorized from '@/components/Unauthorized';
import WorkoutsPage from '@/components/Workouts/WorkoutsPage';
import Signup from '@/pages/Signup/Signup';
import Login from '@components/Login';
import { RouteObject } from 'react-router-dom';
import { protectedRoute } from './ProtectedRoute';

export const HOME_URL = '/';
export const LOGIN_URL = '/login';
export const UNAUTHORIZED_URL = '/unauthorized';
export const WORKOUTS_URL = '/workouts';
export const SIGNUP_URL = '/signup';
export const BASE_PATH = '/localhost:5173';

const routes = [
  { path: LOGIN_URL, element: <Login />, id: 'Login' },
  { path: SIGNUP_URL, element: <Signup />, id: 'Signup' },
  { path: UNAUTHORIZED_URL, element: <Unauthorized />, id: 'Unauthorized' },
  {
    path: HOME_URL,
    element: <Home />,
    id: 'Home',
  },
  {
    path: WORKOUTS_URL,
    element: protectedRoute(<WorkoutsPage />),
    id: 'Workouts',
  },
];

export const getPagesRoutes = (): RouteObject[] => {
  return [...routes];
};
