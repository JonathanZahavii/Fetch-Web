import { Router } from 'express';
import workoutRoutes from './workout.routes'

const router = Router();

router.use('/workout', workoutRoutes)

export default router;