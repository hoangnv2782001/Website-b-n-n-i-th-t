import React from "react";

import FormProvider from "../../ui/Form/FormProvider";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Eye, EyeSlash } from "phosphor-react";
import { Link as RouterLink } from "react-router-dom";
import { uploadImage } from "../../../service/uploadImage";
import {
  Alert,
  IconButton,
  InputAdornment,
  Stack,
  Link,
  Button,
  Typography,
  CircularProgress,
  Input,
} from "@mui/material";
import { RHFTextField } from "../../ui/TextField";
import { useDispatch } from "react-redux";
const Gallery = () => {
  const dispatch = useDispatch();

  const [img, setImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const ImageSchema = Yup.object().shape({
    img: Yup.mixed().required("Vui long chon anh"),
  });

  const defauleValues = {
    img: "",
  };

  const methods = useForm({
    resolver: yupResolver(ImageSchema),
    defauleValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  /**
   * handle login
   * @param {Object} data :
   */
  const onSubmit = async (data) => {
    console.log("duu lieu defghjk", data);
    try {
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  const handleFile = (event) => {
    setIsLoading(true);
    uploadImage(event.target.files[0])
      .then((response) => {
        console.log(response);
        setImg(response.data.img);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const deleteImg = (event) => {
    setIsLoading(false);
    setImg("");
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ width: "60%" }} alignItems={"center"} spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField name="name" label="Tên Danh Mục" />
        <RHFTextField name="description" multiline rows={4} label="Ghi Chú" />
        <RHFTextField name="img" label="Tên Danh Mục" />

        {/* {!isLoading && !img ? (
          <RHFTextField
            name="img"
            type={"file"}
            onChange={handleFile}
            inputProps={{
              accept: ".jpg, .jpeg, .png",
            }}
          />
        ) : !img ? (
          <CircularProgress />
        ) : (
          <Stack
            sx={{ width: "100%" }}
            direction={"row"}
            spacing={2}
            justifyContent={"flex-start"}
          >
            <img
              src={img}
              alt="Preview"
              style={{ height: "64px", width: "64px" }}
            ></img>
            <Button
              onClick={deleteImg}
              sx={{ height: "50%" }}
              variant="contained"
              type="button"
            >
              Xoa anh
            </Button>
           
          </Stack>
        )} */}
        <Button
          fullWidth
          size="large"
          type="submit"
          sx={{
            bgcolor: "#FF6C40",
            color: "#000",
            "&:hover": {
              bgcolor: "#FF8F6D",
            },
          }}
        >
          Submit
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default Gallery;
