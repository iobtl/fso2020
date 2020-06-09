import express from 'express';
import patientData from '../../data/patients';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_request, response) => {
  response.send(patientService.getAllSensitive());
});

export default router;
