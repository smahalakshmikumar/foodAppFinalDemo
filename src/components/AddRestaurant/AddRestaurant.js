import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import { postData } from "../../api/api";

/**
 *  To add new restaurant
 * @returns AddRestaurant component
 */
const AddRestaurant = () => {
  const [loginUser, setLoginUser] = useState(false);
  const history = useHistory();
  return (
    <Formik
      initialValues={{
        hotelName: "",
        type: "",
        genre: "",
        rating: "",
        resImage:
          "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/bkb5aev54lummmjgrpl5",
      }}
      validationSchema={Yup.object().shape({
        hotelName: Yup.string().required("hotel name is required"),
        type: Yup.string().required("type is required"),
        genre: Yup.string().required("genre  is required"),
        rating: Yup.string().required("rating is required"),
      })}
      onSubmit={(fields) => {
        console.log(fields);
        try {
          postData("Restaurant", fields)
            .then((response) => {
              history.push("/restaurants");
            });
        } catch (error) {
          console.log(error.message);
        }
      }}
      render={({ errors, touched }) => (
        <Form className="form">
          {loginUser && (
            <SweetAlert
              show={loginUser}
              title="New User,Please Sign Up!"
              onConfirm={() => setLoginUser(false)}
            ></SweetAlert>
          )}
          <div class="container">
            <div class="row">
              <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card card-signin my-5">
                  <div class="card-body">
                    <h5 class="card-title text-center">Add New Restaurant</h5>
                    <div class="form-label-group">
                      <label htmlFor="hotelName">Restaurant Name</label>
                      <Field
                        name="hotelName"
                        type="text"
                        className={
                          "form-control" +
                          (errors.hotelName && touched.hotelName
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="hotelName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div class="form-label-group">
                      <label htmlFor="type">type</label>
                      <Field
                        name="type"
                        type="text"
                        className={
                          "form-control" +
                          (errors.type && touched.type ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="type"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div class="form-label-group">
                      <label htmlFor="type">genre</label>
                      <Field
                        name="genre"
                        type="text"
                        className={
                          "form-control" +
                          (errors.genre && touched.genre ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="genre"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div class="form-label-group">
                      <label htmlFor="rating">rating</label>
                      <Field
                        name="rating"
                        type="text"
                        className={
                          "form-control" +
                          (errors.rating && touched.rating ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="rating"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <button
                      class="btn btn-lg btn-primary btn-block text-uppercase"
                      type="submit"
                      style={{ margin: "10px" }}
                    >
                      Submit
                    </button>
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
export default React.memo(AddRestaurant);
