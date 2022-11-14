import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

import {
  FormContainer,
  FormLabel,
  FormInput,
  Submit,
  InputWrapper,
  ErrorContainer,
  ToggleButton,
  TestUserButton,
} from "./AuthForm.styled";

const validationSchema = Yup.object().shape({
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

const AuthForm = () => {
  const [isNew, setIsNew] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const toggleIsNew = () => {
    setIsNew((current) => !current);
  };
  return (
    <FormContainer>
      <Formik
        initialValues={{
          name: name,
          email: email,
          password: password,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          setName(values.name);
          setEmail(values.email);
          setPassword(values.password);

          console.log(name, email, password);

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
                <InputWrapper>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormInput
                    type="text"
                    name="name"
                    autoCorrect="off"
                    autoComplete="name"
                    placeholder="Type your name"
                    valid={touched.name && !errors.name}
                    error={touched.name && errors.name}
                  />
                </InputWrapper>
                <ErrorContainer>
                  {errors.name && touched.name && <p>{errors.name}</p>}
                </ErrorContainer>

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
                    placeholder="Type your email"
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
