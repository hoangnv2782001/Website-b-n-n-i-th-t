import { Stack, Typography } from "@mui/material";
import React from "react";
import VerifyForm from "../../components/ui/Form/VerifyForm";

/**
 * component verify form
 */
const Verify = () => {
  return (
    <>
      {/* header */}
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Xác Nhân OTP</Typography>

        {/* verify form */}

        <VerifyForm />
      </Stack>
    </>
  );
};

export default Verify;
