import { Link, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import ResetPasswordForm from "../../components/ui/Form/ResetPasswordForm";
const ResetPassword = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h3">Quên mật khẩu</Typography>

        <Typography sx={{ color: "text.secondary", mb: 5 }}>
          {" "}
          Vui lòng nhập email bạn đã đăng kí và xác nhận thay đổi qua email
        </Typography>
        {/* form */}

        <ResetPasswordForm/>
        <Typography
          to="/auth/login"
          component={RouterLink}
          variant="subtitle2"
          color="inherit"
          sx={{
            alignItems: "center",
            mt: 3,
            mx: "auto",
            display: "inline-flex",
          }}
        >
          <CaretLeft />
         Đăng nhập
        </Typography>
      </Stack>
    </>
  );
};

export default ResetPassword;
