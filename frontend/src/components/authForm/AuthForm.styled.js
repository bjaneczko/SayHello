import styled from "@emotion/styled";
import { css } from "@emotion/react";
import FilteredPropsInputField from "../InputField/FilteredPropsInputField";

export const FormContainer = styled.div`
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #0e1d29;
  border-radius: 1rem;
  border: 5px solid #1c2a34;
  color: white;
`;

export const InputWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FormLabel = styled.label`
  font-size: 18px;
  font-weight: 600;
  margin-left: 1rem;
`;

export const FormInput = styled(FilteredPropsInputField)`
  background-color: rgb(245, 248, 250);
  border: 1px solid transparent;
  border-radius: 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-style: normal;
  font-weight: 400;
  padding: 0.75rem 1rem;

  &:focus,
  &:active {
    box-shadow: none;
    outline: none;
  }

  ${({ error }) =>
    error &&
    css`
      border: 4px solid rgb(191, 49, 12);
      outline: none;

      &:focus,
      &:active {
        border: 1px solid rgb(191, 49, 12);
        outline: none;
      }
    `}
`;

export const ErrorContainer = styled.div`
  padding: 0.6rem 1rem 1rem;
  font-size: 1rem;
  font-weight: 600;

  color: rgb(120, 27, 0);
`;

export const Submit = styled.button`
  width: 100%;
  margin: 1rem 0;
  background-color: #705df2;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1.5rem;
  color: white;
  padding: 0.7rem 1rem;

  &:active,
  &:focus,
  &:hover {
    cursor: pointer;
    background-color: #4e41a9;
  }

  &:disabled {
    cursor: pointer;
    background-color: rgb(163, 168, 173);
    box-shadow: none;
    color: rgb(255, 255, 255) !important;

    &:hover,
    &:focus {
      cursor: not-allowed;
    }
  }
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  border-bottom: 3px solid #705df2;
  font-family: inherit;
  font-size: inherit;
  color: #705df2;

  &:active,
  &:focus,
  &:hover {
    cursor: pointer;
  }
`;
