import React from "react";
import FormProvider from "../../ui/Form/FormProvider";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Eye, EyeSlash } from "phosphor-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { AddCategory } from "../../../redux/slices/category";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const NewCategoryForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [img, setImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const {token} = useSelector(state=>state.auth)
  const CategorySchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên"),

    // description: Yup.string().required("Vui lòng nhập đủ mật khẩu"),
    // img: Yup.mixed()
    //   .test(
    //     "fileType",
    //     "Vui long chi chon hinh anh",
    //     (file) =>
    //       file && ["image/png", "image/jpg", "image/jpeg"].includes(file[0].type)
    //   )
    //   .test(
    //     "fileSize",
    //     "vui long chon hinh anh",
    //     (file) => true
    //   ),
  });

  const defauleValues = {
    name: "",
    description: "",
    // img: null,
  };

  const methods = useForm({
    resolver: yupResolver(CategorySchema),
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
    console.log("duu lieu defghjk", { ...data, img,value });
    try {
      dispatch(AddCategory({ ...data, img,description : value }, navigate));
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
    uploadImage(event.target.files[0],token)
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
        {/* <RHFTextField name="description" multiline rows={4} label="Ghi Chú" /> */}

       

        {!isLoading && !img ? (
          <RHFTextField
            name="img"
            type={"file"}
            onChange={handleFile}
            inputProps={{
              accept: ".jpg, .jpeg, .png",
            }}
          />
        ) : isLoading ? (
          <CircularProgress />
        ) : (
          img && (
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
          )
        )}

        <ReactQuill  theme="snow" value={value} onChange={setValue} className="w-full h-14" />;
       
      </Stack>

      <Button
          
          size="medium"
          type="submit"
          sx={{
            backgroundColor: "#FF6C40",
            marginTop:"40px",
            color: "#000",
            "&:hover": {
              bgcolor: "#FF8F6D",
            },
          }}
        >
          Submit
        </Button>
    </FormProvider>
  );
};

export default NewCategoryForm;
