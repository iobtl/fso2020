import {
  NewPatient,
  Gender,
  Entry,
  NewHospitalEntry,
  NewHealthCheckEntry,
  NewOccupationalHealthcareEntry,
  NewEntry,
  EntryType,
  Diagnosis,
  HealthCheckRating,
  assertNever,
} from './types';
import { parse } from 'querystring';

const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseStringParam(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseStringParam(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseStringParam(object.occupation),
    entries: object.entries,
  };

  return newPatient;
};

export const toNewEntry = (object: any): NewEntry => {
  const baseEntry = {
    date: parseDate(object.date),
    specialist: parseStringParam(object.specialist),
    description: parseStringParam(object.description),
    diagnosisCodes: object.diagnosisCodes,
  };
  switch (object.type) {
    case 'Hospital':
      const hospitalEntry: NewHospitalEntry = {
        ...baseEntry,
        type: 'Hospital',
        discharge: parseDischarge(object.discharge),
      };
      return hospitalEntry;

    case 'HealthCheck':
      const healthCheckEntry: NewHealthCheckEntry = {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
      return healthCheckEntry;

    case 'OccupationalHealthcare':
      const occupationalHealthcareEntry: NewOccupationalHealthcareEntry = {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        sickLeave: parseSickLeave(object.sickLeave),
        employerName: parseStringParam(object.employerName),
      };

      return occupationalHealthcareEntry;
    default:
      return assertNever(object);
  }
};

const parseStringParam = (param: any): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing parameter: ${param}`);
  }

  return param;
};

const parseDate = (date: any): string => {
  if (!date || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }

  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }

  return gender;
};

const parseEntryType = (entry: any): EntryType => {
  if (!entry || !isEntry(entry)) {
    throw new Error(`Incorrect entry type: ${entry}`);
  }

  return entry;
};

const parseDischarge = (discharge: {
  date: any;
  criteria: any;
}): { date: string; criteria: string } => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error(`Incorrect discharge fields: ${discharge}`);
  }

  return discharge;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error(`Incorrect rating value: ${rating}`);
  }

  return rating;
};

const parseSickLeave = (
  sickLeave: any
): { startDate: string; endDate: string } => {
  // Remember: sickLeave is optional
  if (sickLeave || !isDate(sickLeave.startDate) || !isDate(sickLeave.endDate)) {
    throw new Error(`Incorrect date values: ${sickLeave}`);
  }

  return sickLeave;
};

const isString = (text: any): text is string => {
  return typeof text === 'string';
};

const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const isEntry = (entry: any): entry is EntryType => {
  return Object.values(EntryType).includes(entry);
};

const isDischarge = (discharge: any): boolean => {
  return (
    typeof discharge.date === 'string' && typeof discharge.criteria === 'string'
  );
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

export default toNewPatient;
