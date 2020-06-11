import React, { useState } from 'react';
import { Patient } from '../types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';

const SinglePatient: React.FC = () => {
  const [patient, setPatient] = useState<Patient>()
  const { id } = useParams<{ id: string }>();
  console.log(id)
  axios.get(`${apiBaseUrl}/patients/${id}`).then(returnedPatient => {
    setPatient(returnedPatient.data)
  })

  if (!patient) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default SinglePatient;
