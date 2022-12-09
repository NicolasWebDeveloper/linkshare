import express from 'express';
import morgan from 'morgan';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import userRoute from './routes/userRoute.mjs';
import linkRoute from './routes/linkRoute.mjs';
import viewRoute from './routes/viewRoute.mjs';

import errorHandler from './controllers/errorController.mjs';
import AppError from './utils/appError.mjs';

const app = express();

app.use(express.json());
app.use(express.static(`public`));
app.use(cookieParser());
app.set('view engine', 'pug');
app.use(xss());
app.use(mongoSanitize());
app.use(helmet());

if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}

app.use('/api/v1/users', userRoute);
app.use('/api/v1/links', linkRoute);
app.use('/', viewRoute);

//Fallback route
app.use((req, res, next) => {
  next(new AppError('Page not found', 404));
});

//Error Handler
app.use(errorHandler);

export default app;
