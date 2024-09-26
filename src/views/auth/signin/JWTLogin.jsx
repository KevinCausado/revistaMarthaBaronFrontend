import React from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { UseAuth } from 'contexts/ConfigContext';

const JWTLogin = () => {
  const { signup } = UseAuth();

  return (
    <Formik
      initialValues={{
        usuario: 'ragnargladiatore@gmail.com',
        contrasena: 'Wewefu5600*',
        submit: null
      }}
      onSubmit={async(values) => {
        console.log('Datos Formulario', values);
        await signup(values);
      }}
      validationSchema={Yup.object().shape({
        usuario: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        contrasena: Yup.string().max(255).required('Password is required')
      })}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              className="form-control"
              label="Email Address / Username"
              name="usuario"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.usuario}
            />
            {touched.usuario && errors.usuario && <small className="text-danger form-text">{errors.usuario}</small>}
          </div>
          <div className="form-group mb-4">
            <input
              className="form-control"
              label="Password"
              name="contrasena"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.contrasena}
            />
            {touched.contrasena && errors.contrasena && <small className="text-danger form-text">{errors.contrasena}</small>}
          </div>

          <div className="custom-control custom-checkbox  text-start mb-4 mt-2">
            <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">
              Save credentials.
            </label>
          </div>

          {errors.submit && (
            <Col sm={12}>
              <Alert>{errors.submit}</Alert>
            </Col>
          )}

          <Row>
            <Col mt={2}>
              <Button className="btn-block mb-4" color="primary" disabled={isSubmitting} size="large" type="submit" variant="primary">
                Signin
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;
