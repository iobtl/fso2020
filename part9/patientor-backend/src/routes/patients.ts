import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';
import { toNewEntry } from '../utils';
import { Patient } from '../types';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patientService.getAllSensitive());
});

router.get('/:id', (request, response) => {
  const allPatients: Patient[] = patientService.getAll();
  const patient: Patient[] = allPatients.filter(
    (patient) => patient.id === request.params.id
  );

  response.json(patient);
});

router.post('/', (request, response) => {
  const body = request.body;
  const newPatient = toNewPatient(body);

  const addedPatient = patientService.addPatient(newPatient);

  response.json(addedPatient);
});

router.post('/:id/entries', (request, response) => {
  const body = request.body;
  const newEntry = toNewEntry(body);

  const updatedPatient = patientService.addEntry(request.params.id, newEntry);

  response.json(updatedPatient);
});

export default router;
