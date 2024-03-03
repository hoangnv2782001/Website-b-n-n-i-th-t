import { Box, Divider, Stack, Typography } from "@mui/material";
import CheckOutForm from "../../components/ui/Form/CheckOutForm";
import { useSelector } from "react-redux";
import {formatNumber} from '../../utils/formatNumber'
const CheckoutPage = () => {
  const { quantity, amount, cartItems } = useSelector((state) => state.cart);

  const user = useSelector((state) => state.user);
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 100px)",
        width: "100%",
        minWidth: "1280px",
        maxWidth: "1440px",
        padding: "24px 24px 8px",
        marginRight: "auto",
        marginLeft: "auto",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: "10px" }} component={"div"}>
        Đặt Hàng
      </Typography>

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        flexWrap={"nowrap"}
        p={"0px 15px"}
      >
        <Box
          sx={{
            width: "700px",
            backgroundColor: "#fff",
            padding: "20px",
            marginRight: "40px",
          }}
        >
          <Box sx={{ marginBottom: "15px" }}>
            <Typography variant="h6" sx={{ fontWeight: "650" }}>Thông tin đặt hàng</Typography>
          </Box>
          {user && <CheckOutForm {...user}/>}
        </Box>

        <Box
          flex={"1 0 auto"}
          sx={{ backgroundColor: "#FFF", padding: "20px" }}
        >
          <Box sx={{ marginBottom: "15px" }}>
            <Typography variant="h6" sx={{ fontWeight: "650" }}>Đơn hàng của bạn</Typography>
            <Typography>{quantity} sản phẩm</Typography>
          </Box>
          <Divider />
          {cartItems &&
            cartItems.map((item) => (
              <Stack
                key={item.id}
                direction={"row"}
                justifyContent={"space-between"}
                sx={{ paddingTop: "12px", paddingBottom: "12px" }}
              >
                <Stack direction={"row"} alignItems={"flex-start"}>
                  <Typography sx={{ width: "40px", maxHeight: "100px" }}>
                    x{item.quantity}
                  </Typography>
                  <Typography>{item.productName}</Typography>
                </Stack>

                <Typography>{formatNumber(item.amount)}Đ</Typography>

                <Divider />
              </Stack>
            ))}

          <Stack sx={{ paddingTop: "12px", paddingBottom: "12px" }} spacing={2}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography  sx={{ maxHeight: "100px" }}>Tạm Tính</Typography>
              <Typography sx={{ fontWeight: "650" }}>{formatNumber(amount)}Đ</Typography>
            </Stack>

            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography >Tổng Tiền</Typography>
              <Typography variant="h5" sx={{fontWeight: "650", maxHeight: "100px",color :"#FF424E" }}>{formatNumber(amount)}Đ</Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default CheckoutPage;
