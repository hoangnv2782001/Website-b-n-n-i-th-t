import PropTypes from "prop-types";

import { useFormContext, Controller } from "react-hook-form";

import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from "react";

RHFAutocomplete.prototype = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
};
export default function RHFAutocomplete({ name, label, helperText, ...other }) {
  const { control, setValue } = useFormContext();
  useEffect(() => {
    if (other.defaultValue) {
      setValue(
        name,
        other.category.find((e) => e.name === other.defaultValue)?.id,
        { shouldValidate: true }
      );
    }
  }, [other.defaultValue]);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Autocomplete
            {...field}
            fullWidth
            error={!!error}
            onChange={(event, newValue) => {
              console.log("test", newValue);
              setValue(
                name,
                newValue?.id,
                { shouldValidate: true }
              );
            }}
            value={
              typeof field.value === "number" && field.value === 0
                ? ""
                : field.value
            }
            helperText={error ? error.message : helperText}
            {...other}
            renderInput={(params) => {
              return (
                <TextField
                  label={label}
                  error={!!error}
                  helperText={error ? error.message : helperText}
                  {...params}
                />
              );
            }}
          />
        );
      }}
    />
  );
}
