import express from 'express';
import patientData from '../../data/patients';
import patientService from '../services/patientService';
import { Patient } from '../types';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patientService.getAllSensitive());
});

router.post('/', (request, response) => {
  const body = request.body;

  const newPatient = patientService.addPatient(body);

  response.json(newPatient);
});

export default router;
