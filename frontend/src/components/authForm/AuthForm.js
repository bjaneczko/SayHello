import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FormContainer,
  FormLabel,
  FormInput,
  Submit,
  InputWrapper,
  ErrorContainer,
  ToggleButton,
} from "./AuthForm.styled";

const signupValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Your name is too short")
    .required("Please enter your name"),
  email: Yup.string()
    .email("E-mail is not valid!")
    .required("Please enter your email"),
  password: Yup.string()
    .min(6, "Password has to be longer than 6 characters!")
    .required("Please enter your password"),
});

const signinValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail is not valid!")
    .required("Please enter your email"),
  password: Yup.string()
    .min(6, "Password has to be longer than 6 characters!")
    .required("Please enter your password"),
});


const AuthForm = () => {
  const [isNew, setIsNew] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (name, email, password) => {

      let data;
      await axios.post(`/api/user/${isNew ? '': 'login'}`, {
        name: name,
        email: email,
        password: password
      })
      .then(function (response) {
        data = response.data;
        localStorage.setItem("userInfo", JSON.stringify(data));
        if(!isNew) {
          navigate("/chats");
        } else {
          setIsNew(false)
        }
      })
      .catch(function (error) {
        alert(error.response.data.message);
      });

  };

  const toggleIsNew = () => {
    setIsNew((current) => !current);
  };

  return (
    <FormContainer>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={isNew ? signupValidationSchema : signinValidationSchema}
        onSubmit={(values, actions) => {
          const name = values.name;
          const email = values.email;
          const password = values.password;
          submitHandler(name, email, password);

          const timeOut = setTimeout(() => {
            actions.setSubmitting(false);

            clearTimeout(timeOut);
          }, 1000);
        }}
      >
        {({ errors, touched, handleSubmit, isSubmitting, isValid }) => {
          return (
            <>
              <Form name="contact" method="post" onSubmit={handleSubmit}>
                {isNew && (<><InputWrapper>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormInput
                    type="text"
                    name="name"
                    autoCorrect="off"
                    autoComplete="name"
                    placeholder="Type your name"
                    valid={isNew && touched.name && !errors.name}
                    error={touched.name && errors.name}
                  />
                </InputWrapper>
                <ErrorContainer>
                  {errors.name && touched.name && <p>{errors.name}</p>}
                </ErrorContainer></>)}
                <InputWrapper>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormInput
                    type="email"
                    name="email"
                    autoCapitalize="off"
                    autoCorrect="off"
                    autoComplete="email"
                    placeholder="Type your email"
                    valid={touched.email && !errors.email}
                    error={touched.email && errors.email}
                  />
                </InputWrapper>
                <ErrorContainer>
                  <ErrorMessage name="email">
                    {(msg) => <p>{msg}</p>}
                  </ErrorMessage>
                </ErrorContainer>

                <InputWrapper>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormInput
                    type="password"
                    name="password"
                    autoCorrect="off"
                    autoComplete="name"
                    placeholder="Type your password"
                    valid={touched.password && !errors.password}
                    error={touched.password && errors.password}
                  />
                </InputWrapper>
                <ErrorContainer>
                  {errors.password && touched.password && (
                    <p>{errors.password}</p>
                  )}
                </ErrorContainer>

                <Submit type="submit" disabled={!isValid || isSubmitting}>
                  {!isNew ? `Sign in` : `Sign up`}
                </Submit>
              </Form>
            </>
          );
        }}
      </Formik>

      <p>
        {!isNew ? `Haven't got account?` : `Already got an account?`}

        <ToggleButton onClick={toggleIsNew}>
          {isNew ? `Sign in` : `Sign up`}
        </ToggleButton>
      </p>
    </FormContainer>
  );
};

export default AuthForm;
