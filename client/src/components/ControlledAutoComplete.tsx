/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface ControlledTextFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  errors: FieldErrors<any>;
  locationSelector: string[];
}

const ControlledTextField: React.FC<ControlledTextFieldProps> = ({
  control,
  name,
  label,
  errors,
  locationSelector,
}) => {
  const getHelperText = () => {
    const error = errors[name];
    if (error) {
      if (typeof error.message === 'string') {
        return error.message;
      }
    }
    return undefined;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { invalid } }) => (
        <Autocomplete
          options={locationSelector}
          value={value || ''}
          onChange={(_, data) => onChange(data)}
          fullWidth
          sx={{ margin: '0.5vw' }}
          renderInput={params => (
            <TextField
              {...params}
              label={label}
              error={invalid}
              helperText={getHelperText()}
              required
            />
          )}
        />
      )}
    />
  );
};

export default ControlledTextField;
