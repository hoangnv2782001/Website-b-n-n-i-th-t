import PropTypes from "prop-types";

import { useFormContext, Controller } from "react-hook-form";

import { TextField } from "@mui/material";
import { useEffect } from "react";

RHFTextField.prototype = {
  name: PropTypes.string,
  helperText: PropTypes.node,
};
export default function RHFTextField({ name, helperText, ...other }) {
  const { control, setValue } = useFormContext();
  useEffect(() => {
    if (other.defaultValue) {
      setValue(name, other.defaultValue, { shouldValidate: true });
    }
  }, [other.defaultValue]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          value={
            typeof field.value === "number" && field.value === 0
              ? ""
              : field.value
          }
          helperText={error ? error.message : helperText}
          {...other}
        />
      )}
    />
  );
}
