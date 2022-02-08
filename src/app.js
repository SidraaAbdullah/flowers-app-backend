import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './middlewares';
import { APP_PORT, DB_URL } from '../config';
import {
  authRoutes,
  categoryRoutes,
  productRoutes,
  adminRoutes,
  userRoutes,
  orderRoutes,
  driverRoutes,
} from './routes';

const app = express();

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log('DB Connection Error = ', err));

//middlewares
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

//routes middleware
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', adminRoutes);
app.use('/api', userRoutes);
app.use('/api', orderRoutes);
app.use('/api/driver', driverRoutes);

app.use(errorHandler);
const server = app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}.`));
var io = require('socket.io')(server);
// next line is the money
app.set('socketio', io);
