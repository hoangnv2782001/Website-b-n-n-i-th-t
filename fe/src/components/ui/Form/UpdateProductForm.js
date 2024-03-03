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
  Autocomplete,
  TextField,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { RHFTextField } from "../../ui/TextField";
import { useDispatch } from "react-redux";
import { AddProduct, UpdateProduct } from "../../../redux/slices/product";
import RHFAutocomplete from "../TextField/RHFAutocomplete";
import { useEffect } from "react";
const UpdateProductForm = ({ singleProduct, categorys }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState(singleProduct.description);

  const [img, setImg] = useState(singleProduct.img);
  const [isLoading, setIsLoading] = useState(false);
  const ProductSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên"),
    price: Yup.number()
      .required("Vui lòng nhap Gia")
      .min(1, "Vui long nhap lon hon 0"),
    quantity: Yup.number()
      .required("Vui lòng nhập so luong")
      .min(1, "Vui long nhap lon hon 0"),
    mass: Yup.number()
      .required("Vui lòng nhập khoi luong")
      .min(1, "Vui long nhap lon hon 0"),

    // description: Yup.string().required("Vui lòng nhập mo ta"),
    category: Yup.number().required("Vui lòng chon danh muc"),
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
    price: 0,
    quantity: 0,
    mass: 0,
    description: "",
    category: 0,

    // img: null,
  };

  const methods = useForm({
    resolver: yupResolver(ProductSchema),
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
    console.log("duu lieu defghjk", { ...data, img });
    try {
      dispatch(
        UpdateProduct(
          { ...data, img, id: singleProduct.id, description: value },
          navigate
        )
      );
      // navigate("/admin/product/all");
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
      <Stack
        sx={{ width: "100%" }}
        alignItems={"flex-start"}
        direction={"row"}
        spacing={5}
      >
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <Stack
          spacing={3}
          sx={{ width: "100%" }}
          justifyContent={"space-evenly"}
        >
          <RHFTextField
            name="name"
            defaultValue={singleProduct.name}
            label="Tên San pham"
          />
          <RHFTextField
            name="price"
            defaultValue={singleProduct.price}
            label="Gia"
          />
          <RHFTextField
            name="quantity"
            defaultValue={singleProduct.quantity}
            label="So luong"
          />
          <RHFTextField
            name="mass"
            defaultValue={singleProduct.mass}
            label="Khoi luong"
          />
        </Stack>
        <Stack
          spacing={5}
          sx={{ width: "100%" }}
          justifyContent={"space-evenly"}
        >
          {/* <RHFTextField
            name="description"
            defaultValue={singleProduct.description}
            multiline
            rows={4}
            label="Ghi Chú"
          /> */}

          <RHFAutocomplete
            name="category"
            label="Danh Muc"
            defaultValue={singleProduct.category}
            category={categorys}
            options={categorys.map((option) => option.name)}
            ChipProps={{ size: "medium" }}
          />
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
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="w-full h-14"
          />
        </Stack>
      </Stack>
      <Button
        size="medium"
        type="submit"
        sx={{
          bgcolor: "#FF6C40",
          color: "#000",
          "&:hover": {
            bgcolor: "#FF8F6D",
          },
          marginTop: 5,
        }}
      >
        Submit
      </Button>
    </FormProvider>
  );
};

export default UpdateProductForm;
