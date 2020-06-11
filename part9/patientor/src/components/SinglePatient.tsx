import React, { useState } from 'react';
import { Patient } from '../types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';

type SinglePatientProps = {
  patients: { [id: string]: Patient };
};

const SinglePatient: React.FC<SinglePatientProps> = ({ patients }) => {
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default SinglePatient;
