import { Patient, SensitivePatient } from '../types';
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

const addPatient = () => {
  return null;
};

export default { getAll, getAllSensitive, addPatient };
