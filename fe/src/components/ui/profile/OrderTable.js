import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { formatNumber } from "../../../utils/formatNumber";
import { IconButton } from "@mui/material";
import { Details } from "@mui/icons-material";
import { Eye } from "phosphor-react";
import { useNavigate } from "react-router-dom";

export default function OrderTable({ orders }) {
  console.log("table", orders);

  const navigate = useNavigate();

  return (
    <>
      <Table size="small">
        <TableHead sx={{ p: "10px 0px" }}>
          <TableRow>
            <TableCell>Ngày Đặt</TableCell>

            <TableCell>Số lượng</TableCell>

            <TableCell>Tình Trạng</TableCell>
            <TableCell>Tổng Tiền</TableCell>
            <TableCell>Chi Tiết</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow
              key={orders.id}
              sx={{ padding: "5px 0px", borderBottom: "1px solid #000" }}
            >
              <TableCell>{row.createAt}</TableCell>
              <TableCell>{row.quantity}</TableCell>

              <TableCell>{row.orderStatus}</TableCell>

              <TableCell>{formatNumber(row.amount)}Đ</TableCell>

              <TableCell>
                <IconButton
                  onClick={() => {
                    navigate(`/profile/order-detail/${row.id}`);
                  }}
                >
                  <Eye />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
