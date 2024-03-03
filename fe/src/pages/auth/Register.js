import { Link, Stack, Typography } from "@mui/material";
import React from "react";


import RegisterForm from "../../components/ui/Form/RegisterForm";



const Register = () => {
  return (
    <>
      {/* header */}
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Đăng Ký</Typography>
        
        {/* register form */}

        <RegisterForm/>

        {/* <Typography
          component="div"
          sx={{
            textAlign: "center",
            mt: 3,
            typography: "caption",
            color: "text.secondary",
          }}
        > */}
          {/* {"By signining up, I agree to. "}
          <Link underline="always" color="text.primary">
            Term of service
          </Link>
          {" and "}
          <Link underline="always" color="text.primary">
            Privacy policy
          </Link> */}
        {/* </Typography> */}
      </Stack>
    </>
  );
};

export default Register;
