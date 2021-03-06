import express from 'express';
import cors from 'cors';
import patientRouter from './routes/patients';
import diagnosisRouter from './routes/diagnosis';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3003;

app.get('/api/ping', (_request, response) => {
  response.send('pong');
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnosis', diagnosisRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
