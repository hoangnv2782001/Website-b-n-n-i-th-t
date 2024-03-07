import React from "react";
import FormProvider from "../../ui/Form/FormProvider";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Eye, EyeSlash } from "phosphor-react";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";
import {
  Alert,
  IconButton,
  InputAdornment,
  Stack,
  Link,
  Button,
  Typography,
} from "@mui/material";
import { RHFTextField } from "../../ui/TextField";

import { useDispatch } from "react-redux";

import {Login} from '../../../redux/slices/auth'

const LoginForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState();

  const [param] = useSearchParams()

  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Vui lòng nhập đủ email")
      .email("Email không đúng định dạng"),
    password: Yup.string().min(6,"Mật khẩu phải có tối thiểu 6 kí tự").required("Vui lòng nhập đủ mật khẩu"),
  });

  const defauleValues = {
    email: "hoangnv@gmail.com",
    password: "hoang123",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defauleValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;




  /**
   * handle login 
   * @param {Object} data : du liệu login : email vs password
   */
  const onSubmit = async (data) => {
    try {
      console.log("du lieu ",data)
      
      const next = param.get("next");

      console.log(
        "next",next
      )
      dispatch(Login(data,navigate,next))
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

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

      <Stack alignItems={"flex-end"} direction="row" justifyContent={"space-between"} sx={{ my: 2 }}>
      <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">Bạn chưa có tài khoản?</Typography>
          <Link to="/auth/register" component={RouterLink} variant="subtitle2">
            Đăng ký
          </Link>
        </Stack>
        <Link
          to="/auth/reset-password"
          component={RouterLink}
          variant="body2"
          color="inherit"
          underline="always"
        >
          Quên mật khẩu
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
        Đăng Nhập
      </Button>
    </FormProvider>
  );
};

export default LoginForm;
