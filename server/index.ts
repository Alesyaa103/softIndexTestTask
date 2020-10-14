import express from 'express';
import cors from 'cors';
import env from './env';
import router from './src/router';
import './src/helpers/mongooseConect';
import errorHandlerMiddleware from './src/middlewares/errorHandler';

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use('/api', router);
app.use(errorHandlerMiddleware);

app.listen(env.app.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${env.app.port}!`);
});
