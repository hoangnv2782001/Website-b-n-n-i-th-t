import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box sx={{flex : "1 0 auto",marginTop:"32px", padding :"16px 12px", backgroundColor:"#fff"}}>
        <Grid container spacing={3}>
          {/* Column 1 */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6">
              Đại lý chính thức Nội thất Online
            </Typography>
            <Typography>
              Địa chỉ: Số 46, Đường Linh Đàm, Khu đô thị Bắc Linh Đàm, Hoàng Mai, Hà
              Nội.
            </Typography>
            <Typography>Điện thoại: 0243-540-2270 - Fax: 0243 540 2030</Typography>
            <Typography>Email: noithatduckhang@gmail.com</Typography>
          </Grid>
    
          {/* Column 2 */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Chi nhánh TP. Hồ Chí Minh</Typography>
            <Typography>
              Địa chỉ: 116 Nơ Trang Long, phường 14, Q. Bình Thạnh, TP.HCM
            </Typography>
            <Typography>Tel: (+84-28)35.101.012</Typography>
            <Typography>Fax: (+84-28) 629 44355</Typography>
            <Typography>E-mail: noithatonline123@gmail.com</Typography>
          </Grid>
    
          {/* Column 3 */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Kết nối với chúng tôi</Typography>
            {/* Add social media icons or links here */}
          </Grid>
    
          {/* Copyright */}
          <Grid item xs={12} sx={{marginTop:"20px"}}>
            <Typography variant="body2" align="center" color="textSecondary">
              Copyright © 2017 Nội thất Online. All Rights Reserved.
            </Typography>
          </Grid>
        </Grid>
    </Box>
  );
};

export default Footer;
