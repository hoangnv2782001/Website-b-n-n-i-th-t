import React from "react";
import FormProvider from "../../ui/Form/FormProvider";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Eye, EyeSlash } from "phosphor-react";
import {
  Alert,
  IconButton,
  InputAdornment,
  Stack,
  Link,
  Button,
} from "@mui/material";
import { RHFTextField } from "../../ui/TextField";
import { useDispatch } from "react-redux";
import { ForgotPassword } from "../../../redux/slices/auth";
import { useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Vui lòng nhập đủ email")
      .email("Email không đúng định dạng"),
  });

  const navigate = useNavigate();

  const defauleValues = {
    email: "hoangnv@gmail.com",
  };

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defauleValues,
  });

  const onSubmit = async (data) => {
    try {
      dispatch(ForgotPassword(data, navigate));
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField name="email" label="Email address" />
        <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        sx={{
          bgcolor: "text.primary",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",

          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
        }}
      >
        Reset
      </Button>
      </Stack>
    </FormProvider>
  );
};

export default ResetPasswordForm;
