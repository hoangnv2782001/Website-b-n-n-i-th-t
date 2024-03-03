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
import { UpdateUser } from "../../../redux/slices/user";

/**
 * Profile form component
 * @returns
 */
const ProfileForm = ({ user }) => {
  console.log("profile user", user);
  const [showPassword, setShowPassword] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Shema validation fields in form
   */
  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên "),
    address: Yup.string(),
    phone: Yup.string()
      .length(10, "SDT không chính xác")
      .matches(/^\d+$/, "Chuỗi phải chứa toàn số"),
  });

  // default values of input form
  const defauleValues = {
    name: "",
    address: "",
    phone: "",
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defauleValues,
  });

  /**
   * handle submit form register
   */
  const onSubmit = async (data) => {
    console.log("user update", data);
    if (data.address === undefined) data.address = "";
    if (data.phone === undefined) data.phone = "";

    data.id = user.id
    console.log("user update", data);
    try {
      dispatch(UpdateUser(data))
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

        <RHFTextField name="name" defaultValue={user.name} label="Họ tên" />

        <RHFTextField
          name="address"
          defaultValue={user.address}
          label="Địa Chỉ"
        />

        <RHFTextField name="phone" defaultValue={user.phone} label="SDT" />
      </Stack>

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
    </FormProvider>
  );
};

export default ProfileForm;
