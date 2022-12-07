import React from 'react';
import { Field } from 'formik';

interface InputProps {
  className?: string;
  type: string;
  name: string;
  autoCapitalize?: string;
  autoCorrect: string;
  autoComplete: string;
  placeholder: string;
  valid: boolean | undefined;
  error: string | false | undefined;
}

const FilteredPropsInputField = ({
  className,
  valid,
  error,
  ...props
}: InputProps) => {
  return <Field className={className} {...props} />;
};

export default FilteredPropsInputField;
