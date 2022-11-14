import styled from "@emotion/styled";
import { css } from "@emotion/react";
import FilteredPropsInputField from "../InputField/FilteredPropsInputField";

export const FormContainer = styled.div`
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 30px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

export const FormLabel = styled.label`
  margin-top: 1rem;
`;

export const FormInput = styled(FilteredPropsInputField)`
  background-color: rgb(245, 248, 250);
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-style: normal;
  font-weight: 400;
  margin-top: 0.5rem;
  padding: 0.75rem 0.75rem;

  &:focus,
  &:active {
    box-shadow: none;
    outline: none;
  }

  ${({ error }) =>
    error &&
    css`
      border: 1px solid rgb(191, 49, 12);
      outline: none;

      &:focus,
      &:active {
        box-shadow: rgb(244, 129, 116) 0px 0px 2px 1px,
          rgb(251, 178, 174) 0px 0px 0px 3px;
        border: 1px solid rgb(191, 49, 12);
        outline: none;
      }
    `}
`;

export const ErrorContainer = styled.div`
  height: 10px;
  padding: 8px 6px 0;
  font-size: 0.8rem;
  color: rgb(120, 27, 0);
`;

export const Submit = styled.button`
  width: 100%;
  margin: 1.5rem 0;
  background-color: #0083b0;
  border-radius: 8px;
  border: none;
  text-align: center;
  font-size: 1rem;
  line-height: 1.5rem;
  color: white;
  padding: 0.7rem 1rem;

  &:active,
  &:focus,
  &:hover {
    cursor: pointer;
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
  border-bottom: 4px solid #0083b0;

  font-family: inherit;
  font-size: inherit;

  &:active,
  &:focus,
  &:hover {
    cursor: pointer;
  }
`;

export const TestUserButton = styled.button`
  padding-top: 20px;
  color: white;
  background: none;
  border: none;
  border-bottom: 2px solid white;
  font-family: inherit;
  font-size: inherit;

  &:active,
  &:focus,
  &:hover {
    cursor: pointer;
  }
`;
