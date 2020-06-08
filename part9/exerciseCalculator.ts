interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: String;
  target: number;
  average: number;
}

const processArguments = (args: Array<string>) => {
  if (args.length < 4) throw new Error('too few arguments');

  if (!isNaN(Number(args[2]))) {
    args.slice(3).forEach((element) => {
      if (!isNaN(Number(element))) {
        return;
      } else {
        throw new Error('invalid argument passed');
      }
    });
  }

  return {
    target: Number(args[2]),
    dailyExercise: args.slice(3).map((element) => Number(element)),
  };
};

const calculateExercises = (
  dailyExercise: Array<number>,
  target: number
): Result => {
  const periodLength = dailyExercise.length;
  const trainingDays = dailyExercise.filter((hours) => hours !== 0).length;
  const average =
    dailyExercise.reduce((first, second) => first + second) / periodLength;
  const success = average >= target;
  const rating = calculateRating(average, target);
  const ratingDescription = getRatingDescription(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const calculateRating = (average: number, target: number): number => {
  if (average === target) {
    return 2;
  } else if (average < target) {
    return 1;
  } else {
    return 3;
  }
};

const getRatingDescription = (rating: number): String => {
  if (rating === 1) {
    return 'you can do better';
  } else if (rating === 2) {
    return 'not too bad but could be better';
  } else if (rating === 3) {
    return 'good job!';
  } else {
    throw new Error('invalid rating value');
  }
};

const { target, dailyExercise } = processArguments(process.argv);

console.log(calculateExercises(dailyExercise, target));
