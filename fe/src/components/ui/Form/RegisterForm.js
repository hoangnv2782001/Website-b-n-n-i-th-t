import React from "react";
import FormProvider from "../../ui/Form/FormProvider";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Eye, EyeSlash } from "phosphor-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Alert,
  IconButton,
  InputAdornment,
  Stack,
  Link,
  Button,
  Typography,
} from "@mui/material";
import { RHFTextField } from "../../ui/TextField/index";
import { useDispatch } from "react-redux";

import { Register } from "../../../redux/slices/auth";


/**
 * Register form component
 * @returns
 */
const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Shema validation fields in form
   */
  const RegisterSchema = Yup.object().shape({
   
    name: Yup.string().required("Vui lòng nhập đủ email"),
    email: Yup.string()
      .required("Vui lòng nhập đủ email")
      .email("Email không đúng định dạng"),
    password: Yup.string().min(6,"Mật khẩu phải có tối thiểu 6 kí tự").required("Vui lòng nhập mật khẩu"),
  });

  // default values of input form
  const defauleValues = {
   
    name: "",
    email: "hoangnv@gmail.com",
    password: "hoang123",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defauleValues,
  });

  /**
   * handle submit form register
   */
  const onSubmit = async (data) => {
    try {
      dispatch(Register(data,navigate))
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

     

        <RHFTextField name="name" label="Họ tên" />

        <RHFTextField name="email" label="Email" />

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
      </Stack>

      <Stack sx={{marginTop : 3 , marginBottom: 3}} direction="row" spacing={0.5}>
          <Typography variant="body2">Bạn đã có tài khoản?</Typography>
          <Link to="/auth/login" component={RouterLink} variant="subtitle2">
            Đăng Nhập
          </Link>
        </Stack>
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
        Đăng ký
      </Button>
    </FormProvider>
  );
};

export default RegisterForm;
