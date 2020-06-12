import {
  Patient,
  SensitivePatient,
  NewPatient,
  NewEntry,
  Entry,
} from '../types';
import patientData from '../../data/patients';

const getAll = (): Patient[] => {
  return patientData.map((patient) => ({ ...patient }));
};

const getAllSensitive = (): SensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries: [],
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

const addEntry = (id: string, newEntry: NewEntry) => {
  const entry: Entry = {
    ...newEntry,
    id: Math.random().toString(36).substring(7),
  };

  const patient = patientData.find((patient) => patient.id === id);

  patient?.entries.push(entry);

  return patient;
};

export default { getAll, getAllSensitive, addPatient, addEntry };
