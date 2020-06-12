import React, { useState, useEffect } from 'react';
import { Patient, Entry } from '../types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Diagnosis } from '../types';
import { Icon } from 'semantic-ui-react';
import { assertNever } from '../types';

const EntryListing: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div>
      <p>
        <strong>{entry.date}</strong> <Icon name='doctor' size='large' />
      </p>
      <p>{entry.description}</p>
    </div>
  );
};

const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div>
      <p>
        <strong>{entry.date}</strong> <Icon name='doctor' size='large' />
      </p>
      <p>{entry.description}</p>
    </div>
  );
};

const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div>
      <p>
        <strong>{entry.date}</strong> <Icon name='heart' size='large' />
      </p>
      <p>{entry.description}</p>
    </div>
  );
};

const SinglePatient: React.FC = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnosis, setDiagnosis] = useState<string[]>([]);

  const { id } = useParams<{ id: string }>();
  axios.get(`${apiBaseUrl}/patients/${id}`).then((returnedPatient) => {
    const patient = returnedPatient.data[0];
    setPatient(patient);
  });

  if (!patient) {
    return <div>loading...</div>;
  }

  const getDiagnosisData = async (diagnosisCodes: string[]) => {
    const { data: diagnosisData } = await axios.get<Diagnosis[]>(
      `${apiBaseUrl}/diagnosis`
    );
    let diagnosisCodesWithDescription: string[] = [];

    diagnosisCodes.forEach((code) => {
      const matchedDiagnosis = diagnosisData.find(
        (diagnosis) => diagnosis.code === code
      ) as Diagnosis;
      diagnosisCodesWithDescription.push(
        `${matchedDiagnosis.code} ${matchedDiagnosis.name}`
      );
    });
    setDiagnosis(diagnosisCodesWithDescription);
  };

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>

      <h3>entries</h3>
      {patient.entries.map((entry) => (
        <div key={entry.id}>
          {entry.date} {entry.description}
          {entry.diagnosisCodes !== undefined ? (
            <ul>
              {getDiagnosisData(entry.diagnosisCodes) &&
                diagnosis.map((codeDescription) => <li>{codeDescription}</li>)}
            </ul>
          ) : null}
          <EntryListing entry={entry} />
        </div>
      ))}
    </div>
  );
};

export default SinglePatient;
