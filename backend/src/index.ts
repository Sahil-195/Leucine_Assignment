import express from "express";
import dotenv from 'dotenv';
import { connect } from './config/dataSource'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route';
import softwareRoutes from './routes/software.route';
import requestRoutes from './routes/request.route';
import cors from 'cors';



dotenv.config();

const app = express();

const PORT = process.env.PORT;

const allowedOrigins = process.env.FRONTEND_URL;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins?.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/software', softwareRoutes);
app.use('/api/requests', requestRoutes);

app.listen(PORT, () => {
    console.log(`server is listening at http://localhost:${PORT}`);
    connect();
});