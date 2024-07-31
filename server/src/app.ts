import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import routes from "./routes";
import swaggerOptions from "./swagger/swaggerOptions";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import connectDB from './database';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';

const app: Express = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Swagger Config
const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Router Config
app.use("/api/v1", routes);

export default app;
