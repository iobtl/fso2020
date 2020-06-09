import express from 'express';
const app = express();
import calculateBmi from './bmiCalculator';

app.get('/hello', (_request, response) => {
  response.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) => {
  if (
    !isNaN(Number(request.query.height)) &&
    !isNaN(Number(request.query.weight))
  ) {
    const height = Number(request.query.height);
    const weight = Number(request.query.weight);
    response.json({
      weight,
      height,
      bmi: calculateBmi(height, weight),
    });
  } else {
    response.json({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
