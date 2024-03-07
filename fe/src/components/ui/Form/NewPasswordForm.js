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
  Button,
} from "@mui/material";
import { RHFTextField } from "../../ui/TextField";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { NewPassword } from "../../../redux/slices/auth";

const NewPasswordForm = () => {
  const [showPassword, setShowPassword] = useState();
  const [showPassword1, setShowPassword1] = useState();
  const navigate = useNavigate();

  const NewPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 kí tự")
      .required("Vui lòng nhập đủ mật khẩu"),
    confirmPassword: Yup.string()
      .required("Vui lòng nhập đủ mật khẩu")
      .oneOf([Yup.ref("password"), null], "mật khẩu không khớp"),
  });

  const [param] = useSearchParams();

  const token = param.get("code");

  const dispatch = useDispatch();

  const defauleValues = {
    password: "",
    confirmPassword: "",
  };

  const methods = useForm({
    resolver: yupResolver(NewPasswordSchema),
    defauleValues,
  });

  const onSubmit = async (data) => {
    try {
      dispatch(NewPassword({ ...data, token }, navigate));
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
    formState: { errors },
  } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField
          name="password"
          label="Mật khẩu"
          type={showPassword ? "text" : "password"}
          InputProps={{
            // Emojin
            endAdornment: (
              <InputAdornment>
                <IconButton
                  onClick={() => {
                    setShowPassword((state) => !state);
                  }}
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label="Xác nhận"
          type={showPassword1 ? "text" : "password"}
          InputProps={{
            // Emojin
            endAdornment: (
              <InputAdornment>
                <IconButton
                  onClick={() => {
                    setShowPassword1((state) => !state);
                  }}
                >
                  {showPassword1 ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

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
          Xác nhận
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default NewPasswordForm;
