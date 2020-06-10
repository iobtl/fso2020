import { NewPatient, Gender } from './types';
const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseStringParam(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseStringParam(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseStringParam(object.occupation),
  };

  return newPatient;
};

const parseStringParam = (param: any): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing parameter: ${param}`);
  }

  return param;
};

const parseDateOfBirth = (date: any): string => {
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

const isString = (text: any): text is string => {
  return typeof text === 'string';
};

const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

export default toNewPatient;
