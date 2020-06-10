import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patientService.getAllSensitive());
});

router.post('/', (request, response) => {
  const body = request.body;
  const newPatient = toNewPatient(body);

  const addedPatient = patientService.addPatient(newPatient);

  response.json(addedPatient);
});

export default router;
