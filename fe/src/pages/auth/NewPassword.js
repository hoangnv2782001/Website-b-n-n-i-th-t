import { Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import NewPasswordForm from "../../components/ui/Form/NewPasswordForm"

/**
 * new passwrd component
 * @returns comppônent
 */
const NewPassword = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h3">Thay đổi mật khẩu</Typography>

        <Typography sx={{ color: "text.secondary", mb: 5 }}>
         Vui lòng nhập mật khẩu mới của bạn
        </Typography>

        {/* form */}

        <NewPasswordForm/>

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
         Đăng Nhập
        </Typography>
      </Stack>
    </>
  );
};

export default NewPassword;
