import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Registration.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getData, postData } from "../../api/api";
import SweetAlert from "react-bootstrap-sweetalert";

/**
 * Registration Page component
 * @returns Registration component
 */
const Registration = () => {
      const [isUserExists, setUserExists] = useState(false);
      const [RegisterSuccess, setRegisterSuccess] = useState(false);

      const history = useHistory();
      return (
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,

            role: "",
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required("First Name is required"),
            lastName: Yup.string().required("Last Name is required"),
            role: Yup.string().required("role is required"),
            email: Yup.string()
              .email("Email is invalid")
              .required("Email is required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Confirm Password is required"),
            acceptTerms: Yup.bool().oneOf([true], "Accept Ts & Cs is required"),
          })}
          onSubmit={(fields) => {
            console.log(fields);

            try {
              //fetch list of users and check if user exists
              getData("users").then((res) => {
                console.log(res.data);
                if (res.data.find((user) => user.email === fields.email)) {
                  setUserExists(true);
                } else {
                  postData("users", fields)
                    .then((response) => {
                      setRegisterSuccess(true);
                      history.push("/");
                    });
                }
              });
            } catch (error) {
              console.log(error.message);
            }
          }}
          render={({ errors, touched }) => (
            <Form className="form">
              {RegisterSuccess ? (
                <SweetAlert
                  show={RegisterSuccess}
                  title="Successfully Registered"
                  onConfirm={() => setRegisterSuccess(false)}
                ></SweetAlert>
              ) : isUserExists ? (
                <SweetAlert
                  show={isUserExists}
                  title="User Already Exists,Please Log in"
                  onConfirm={() => setUserExists(false)}
                ></SweetAlert>
              ) : null}
              <div class="container">
                <div class="row">
                  <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div class="card card-signin my-5">
                      <div class="card-body">
                        <h5 class="card-title text-center">Sign Up</h5>
                        <div class="form-label-group">
                          <label htmlFor="firstName">First Name</label>
                          <Field
                            name="firstName"
                            type="text"
                            className={
                              "form-control" +
                              (errors.firstName && touched.firstName
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        <div class="form-label-group">
                          <label htmlFor="lastName">Last Name</label>
                          <Field
                            name="lastName"
                            type="text"
                            className={
                              "form-control" +
                              (errors.lastName && touched.lastName
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        <div class="form-label-group">
                          <label htmlFor="email">Email</label>
                          <Field
                            name="email"
                            type="text"
                            className={
                              "form-control" +
                              (errors.email && touched.email ? " is-invalid" : "")
                            }
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        <div class="form-label-group">
                          <label htmlFor="password">Password</label>
                          <Field
                            name="password"
                            type="password"
                            className={
                              "form-control" +
                              (errors.password && touched.password
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        <div class="form-label-group">
                          <label htmlFor="confirmPassword">Confirm Password</label>
                          <Field
                            name="confirmPassword"
                            type="password"
                            className={
                              "form-control" +
                              (errors.confirmPassword && touched.confirmPassword
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        <div class="form-label-group">
                          <label htmlFor="role">Role</label>
                          <Field
                            id="role"
                            name="role"
                            type="text"
                            className={
                              "form-control" +
                              (errors.role && touched.role ? " is-invalid" : "")
                            }
                          ></Field>
                          <ErrorMessage
                            name="role"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        <div class="custom-control custom-checkbox mb-3">
                          <Field
                            type="checkbox"
                            name="acceptTerms"
                            id="acceptTerms"
                            className={
                              "form-check-input " +
                              (errors.acceptTerms && touched.acceptTerms
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <label htmlFor="acceptTerms" className="form-check-label">
                            Accept Terms & Conditions
                          </label>
                          <ErrorMessage
                            name="acceptTerms"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        <div className="form-group">
                          <button type="submit" className="btn btn-primary mr-2">
                            Register
                          </button>
                          <button type="reset" className="btn btn-secondary">
                            Reset
                          </button>
                        </div>
                        <p className="my-1">
                          Already have an account? <Link to="/">Sign In</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        />
      );
};
export default React.memo(Registration);
