import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { authanticate } from './middlewares/auth.middleware';
import routes from './routes';
import commentRoutes from './routes/commentRoutes';
import postRoutes from './routes/postRoutes';
import userRoutes from './routes/userRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './swagger/swaggerOptions'; // Path to your Swagger options

import logger from './utils/logger.util';
dotenv.config();

const app = express();

// Configure CORS to allow requests from http://localhost:5173 with credentials
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
logger.info(process.env.DB_URL);
mongoose.connect(process.env.DB_URL as string);
const db = mongoose.connection;
db.on('error', error => {
  console.error(error);
});
db.once('open', () => logger.info('connected to mongodb!!'));

// Middleware
app.use(express.json());

// Routes
app.use('/api/posts', authanticate, postRoutes);
app.use('/api/comments', authanticate, commentRoutes);
app.use('/api/auth', userRoutes);

// Swagger Config
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// Router Config
app.use('/api/v1', routes);

export default app;
