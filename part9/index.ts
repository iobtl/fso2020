import express from 'express';
const app = express();
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const PORT = 3003;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

app.get('/hello', (_request, response) => {
  response.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) => {
  const height = Number(request.query.height);
  const weight = Number(request.query.weight);
  if (!isNaN(height) && !isNaN(weight)) {
    response.json({
      weight,
      height,
      bmi: calculateBmi(height, weight),
    });
  } else {
    response.json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (request, response) => {
  console.log(request);
  const { daily_exercises, target } = request.body;

  // Incorrect parameters
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  daily_exercises.forEach((element: any) => {
    if (!isNaN(Number(element))) {
      return;
    } else {
      response.json({ error: 'malformatted parameters' });
    }
  });
  // Missing parameters
  if (!target || !daily_exercises) {
    response.json({ error: 'missing parameters' });
  }

  const exerciseResult = calculateExercises(daily_exercises, target);

  response.status(200).json(exerciseResult);
});
