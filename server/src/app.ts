import express from "express";
import routes from "./routes";
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Connect to MongoDB
console.log(process.env.DB_URL)
mongoose.connect(process.env.DB_URL as string);
const db = mongoose.connection 
db.on('error', error => {console.error(error)})
db.once('open', ()=> console.log('connected to mongodb!!'))

// Middleware
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Swagger Config
// const specs = swaggerJsdoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Router Config
app.use("/api/v1", routes);

export default app;
