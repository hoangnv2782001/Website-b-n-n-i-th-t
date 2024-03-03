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
import { changePassword } from "../../../service/userService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShowSnackbar } from "../../../redux/slices/app";

const ChangePassForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [showPassword1, setShowPassword1] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const NewPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 kí tự")
      .required("Vui lòng nhập đủ mật khẩu"),
    confirmPassword: Yup.string()
      .required("Vui lòng nhập đủ mật khẩu")
      .oneOf([Yup.ref("newPassword"), null], "mật khẩu không khớp"),
  });

  const defauleValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const methods = useForm({
    resolver: yupResolver(NewPasswordSchema),
    defauleValues,
  });

  const onSubmit = async (data) => {
    try {
      changePassword(data.newPassword, token).then((response) => {
        console.log("phan hoi", response);
        navigate("/profile");
        dispatch(
          ShowSnackbar({
            severity: "success",
            message: "Thay Doi Mat Khau Thanh Cong",
          })
        );
      }).catch((e)=>{
        console.log(e);
      });
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
          name="newPassword"
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
          label="Xác Nhận"
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
            bgcolor: "#FF0000",
            marginTop: "40px",

            "&:hover": {
              bgcolor: "#FF0000",
            },
          }}
        >
          Lưu
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default ChangePassForm;
