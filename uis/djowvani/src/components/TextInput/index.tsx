import React from "react";
import styled from "styled-components";
import { Control, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

import { solidWhite, formErrorColor } from "@/styles/abstracts/_variables";

const StyledTextField = styled(TextField)`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "14rem")};
  min-height: ${({ multiline }) => (multiline ? "128px" : "80px")};

  /* FIX FOR SAFARI */
  input:not(input:-webkit-autofill)::-webkit-contacts-auto-fill-button {
    background-color: ${solidWhite};
  }

  .MuiFormHelperText-root {
    color: red;
  }

  *[class^="Mui"] {
    cursor: none !important;
  }

  .MuiFormLabel-root {
    color: ${solidWhite};
  }
  .MuiFormLabel-root.Mui-focused {
    color: ${solidWhite};
  }
  .MuiInputBase-input {
    color: ${solidWhite};
  }
  .MuiFormHelperText-root {
    color: ${formErrorColor};
  }

  .MuiInputBase-root {
    &::before {
      border-bottom: 1px solid ${solidWhite} !important;
    }
    &::after {
      border-bottom: 2px solid ${solidWhite} !important;
    }
  }
`;

interface ITextInput {
  control: Control<any, any>;
  id: string;
  isRequired?: boolean;
  hasError?: boolean;
  label: string;
  helperText?: string;
  onBlurCallback?: (e: any) => void;
  onChangeCallback?: (e: any) => void;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  aria?: string;
}

const TextInput: React.FC<ITextInput> = ({
  control,
  id,
  isRequired,
  hasError,
  label,
  helperText,
  onBlurCallback = () => {},
  onChangeCallback = () => {},
  fullWidth,
  multiline,
  rows,
  aria,
}) => {
  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => (
        <StyledTextField
          {...field}
          id={id}
          aria-label={`${aria} input field`}
          variant="standard"
          required={isRequired}
          error={hasError}
          label={label}
          helperText={helperText}
          fullWidth={fullWidth}
          multiline={multiline}
          minRows={rows}
          onBlur={(e) => {
            field.onBlur();
            onBlurCallback(e.target.value);
          }}
          onChange={(e) => {
            field.onChange(e.target.value);
            onChangeCallback(e.target.value);
          }}
        />
      )}
    />
  );
};

export default TextInput;
