import { Patient, SensitivePatient, NewPatient } from '../types';
import patientData from '../../data/patients';

const getAll = (): Patient[] => {
  return patientData;
};

const getAllSensitive = (): SensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (newPatient: NewPatient) => {
  const patient: Patient = {
    ...newPatient,
    id: String(patientData.length + 1),
  };

  patientData.push(patient);

  return newPatient;
};

export default { getAll, getAllSensitive, addPatient };
