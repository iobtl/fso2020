import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form, ErrorMessage } from 'formik';

import { TextField, SelectField, GenderOption } from './FormField';
import { NewEntry, Entry, EntryType, NewHospitalEntry } from '../types';
import { DiagnosisSelection } from '../AddPatientModal/FormField';

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */

interface Props {
  onSubmit: (values: NewHospitalEntry) => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{
        date: '',
        description: '',
        specialist: '',
        diagnosisCodes: [''],
        type: 'Hospital',
        discharge: { date: '', criteria: '' },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if (!values.discharge) {
          errors.discharge = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className='form ui'>
            <Field
              label='Date'
              placeholder='Date'
              name='date'
              component={TextField}
            />
            <Field
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            <Field
              label='Specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />
            <Field
              label='DiagnosisCodes'
              placeholder='DiagnosisCodes'
              name='diagnosisCodes'
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated='left' width={5}>
                <Button type='button' onClick={onCancel} color='red'>
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Button
                  type='submit'
                  floated='right'
                  color='green'
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPatientForm;
