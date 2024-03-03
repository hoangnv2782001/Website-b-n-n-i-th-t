import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

const ProductDescrip = ({description}) => {

  const createMarkup = () => {
    return { __html: description };
  };
    return (
        <Box sx ={{marginTop : "30px", padding:"15px 15px", backgroundColor:"#fff"}}>
            <Stack spacing={2}>
              <Typography variant='h4'>Mô Tả Sản Phẩm</Typography>
              <Box sx={{marginTop : "20px"}}>
              <div dangerouslySetInnerHTML={createMarkup()}/>
               
              </Box>

            </Stack>
        </Box>
    );
}

export default ProductDescrip;
