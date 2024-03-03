import { Alert, Button, CircularProgress, Stack } from "@mui/material";
import React from "react";
import { RHFTextField } from "../TextField";
import FormProvider from "./FormProvider";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateOrder } from "../../../redux/slices/order";
import RHFAutocomplete from "../TextField/RHFAutocomplete";
import { payment } from "../../../service/paymentService";

const CheckOutForm = ({ name, address, phone, ...other }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, amount } = useSelector((state) => state.cart);

  const { token } = useSelector((state) => state.auth);
  const CheckOutSchema = Yup.object().shape({
    receiver: Yup.string().required("Vui lòng nhập tên người nhận"),
    address: Yup.string().required("Vui lòng nhập địa chỉ người nhận"),
    phone: Yup.string()
      .required("Vui lòng nhập sdt người nhận")
      .length(10, "SDT không chính xác")
      .matches(/^\d+$/, "Chuỗi phải chứa toàn số"),

    paymentType: Yup.string().required("Vui Long Chon Phuong Thuc Thanh Toan"),
  });

  const defauleValues = {
    receiver: "",
    address: "",
    phone: "",
    // img: null,
  };

  const methods = useForm({
    resolver: yupResolver(CheckOutSchema),
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
    console.log("duu lieu checkout", data);
    try {
      if (!data?.note) data.note = "";
      if (data.paymentType === "OCD") dispatch(CreateOrder(data, navigate));
      else {
        payment({ ...data, cartId: id, amount },token)
          .then((response) => {
            console.log("payment", response);
            window.location.href = response.data;
          })
          .catch((error) => {
            console.log("payment error", error);
          });
      }
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
      <Stack sx={{ width: "100%" }} alignItems={"center"} spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField defaultValue={name} name="receiver" label="Tên " />
        <RHFTextField defaultValue={address} name="address" label="Địa chỉ" />

        <RHFTextField defaultValue={phone} name="phone" label="SDT" />

        <RHFAutocomplete
          name="paymentType"
          label="Phương thức thanh toán"
          options={[
            { id: "OCD", name: "Thanh toán sau khi nhận hàng" },
            { id: "Online", name: "Thanh toán qua VNPay" },
          ]}
          getOptionLabel={(option) => option.name}
          ChipProps={{ size: "medium" }}
        />

        <RHFTextField name="note" multiline rows={4} label="Ghi chú" />

        <Button
          size="medium"
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

export default CheckOutForm;
