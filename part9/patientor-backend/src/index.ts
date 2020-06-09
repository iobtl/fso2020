import express from 'express';
import cors from 'cors';
import patientRouter from './routes/patients';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3003;

app.get('/api/ping', (_request, response) => {
  console.log('someone pinged here');
  response.send('pong');
});

app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
