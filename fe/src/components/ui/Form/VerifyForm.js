import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import FormProvider from "../../ui/Form/FormProvider";
import { Button, Stack } from "@mui/material";
import RHFCodes from "../../ui/TextField/RHFCodes";
import { useDispatch, useSelector } from "react-redux";

import { VerifyEmail } from "../../../redux/slices/auth";
import { useNavigate, useSearchParams } from "react-router-dom";


const VerifyForm = () => {
  const dispatch = useDispatch();
  const [param]  = useSearchParams();

  const navigate = useNavigate()


  const email = param.get("email")
 
  const VerifyCodeShema = Yup.object().shape({
    code1: Yup.string().required("Code is required"),
    code2: Yup.string().required("Code is required"),
    code3: Yup.string().required("Code is required"),
    code4: Yup.string().required("Code is required"),
    code5: Yup.string().required("Code is required"),
    code6: Yup.string().required("Code is required"),
  });

  const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(VerifyCodeShema),
    defaultValues,
  });

  const { handleSubmit, formState } = methods;

  const onSubmit = async (data) => {
   

    try {
    
      dispatch(VerifyEmail({
        otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
        email
        },navigate))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* verify input */}
        <RHFCodes
          keyName={"code"}
          inputs={["code1", "code2", "code3", "code4", "code5", "code6"]}
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
          Xác Thực
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default VerifyForm;
