import mongoose from 'mongoose';
import env from '../../../env';

mongoose.set('debug', true); // write all requests in console

const connectUrl = `mongodb+srv://${env.db.username}:${env.db.password}@${env.db.claster}.gthcw.mongodb.net/${env.db.dbName}?retryWrites=true&w=majority`;

mongoose.connect(connectUrl, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
},
(err) => {
  if (err) throw new Error('Connected with db is faild');
  // eslint-disable-next-line no-console
  console.log('connected');
});