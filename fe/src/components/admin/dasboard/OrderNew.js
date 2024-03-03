import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, IconButton } from "@mui/material";
import { Eye } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import {formatNumber} from '../../../utils/formatNumber'
export default function OrderNew({ orders }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: "#fff" }}>
      <Table size="small">
        <TableHead sx={{ p: "10px 0px" }}>
          <TableRow>
            <TableCell>Mã</TableCell>

            <TableCell>Ngày Tạo</TableCell>
            <TableCell>Tổng Tiền</TableCell>
            <TableCell>Hình Thức Thanh Toán</TableCell>
            <TableCell>Trạng Thái</TableCell>
            <TableCell>Chi Tiết</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} sx={{ borderBottom: "1.5px solid #000" }}>
              <TableCell>{order?.code}</TableCell>

              <TableCell>{order?.createAt}</TableCell>
              <TableCell>{formatNumber(order?.amount)}Đ</TableCell>

              <TableCell>{order?.paymentType}</TableCell>
              <TableCell>{order?.orderStatus}</TableCell>

              <TableCell>
                <IconButton
                  onClick={() => {
                    navigate(`/admin/order/detail/${order.id}`);
                  }}
                >
                  <Eye />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href={"/admin/order"} sx={{ mt: 5 }}>
        Xem Thêm
      </Link>
    </Box>
  );
}
