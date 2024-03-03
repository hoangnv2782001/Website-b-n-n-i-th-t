import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Plus } from "phosphor-react";
import { faker } from "@faker-js/faker";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../ui/LoadingScreen";
import { Delete, Update } from "@mui/icons-material";
import { getAllUsers } from "../../../service/userService";

import {formatNumber} from '../../../utils/formatNumber'

const Products = () => {
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const columns = [
    { id: "name", name: "Tên" },
    { id: "email", name: "Email" },
    { id: "createAt", name: "Ngày Tạo" },
    { id: "enable", name: "Trạng Thái" },
    { id: "quantity", name: "Số Đơn Hàng" },
    { id: "amount", name: "Tổng Tiền Thanh Toán" },
  ];

  const [users, setUsers] = useState(null);

  const [loading, setLoading] = useState(true);

  const handlechangepage = (event, newpage) => {
    pagechange(newpage);
  };
  const handleRowsPerPage = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };

  // const [rows, rowchange] = useState([]);
  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);

  useEffect(() => {
    getAllUsers(token)
      .then((response) => {
        console.log("all user", response);
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("all u", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <Box sx={{ textAlign: "start", marginTop: 5 }}>
      <Stack
        sx={{ marginBottom: 2 }}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="h4">Danh Sách Khách Hàng</Typography>
      </Stack>

      <Paper sx={{ width: "100%" }} elevation={2}>
        <TableContainer sx={{ height: "100%" }}>
          <Table stickyHeader>
            <TableHead sx={{ backgroundColor: "#c6c5c9" }}>
              <TableRow>
                {columns.map((column) => {
                  return <TableCell key={column.id}>{column.name}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users
                  .slice(page * rowperpage, page * rowperpage + rowperpage)
                  .map((row, i) => {
                    return (
                      <TableRow key={i}>
                        {columns &&
                          columns.map((column, i) => {
                            let value = row[column.id];
                            if (column.id === "enable") {
                              return <TableCell key={value}>{!value ? "Chưa Kích Hoạt" : "Đã Kích Hoạt"}</TableCell>;
                            } else if(column.id === "amount"){
                              return <TableCell key={value}>{formatNumber(value)}Đ</TableCell>;

                            }
                            else
                              return <TableCell key={value}>{value}</TableCell>;
                          })}
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          rowsPerPage={rowperpage}
          page={page}
          count={users.length}
          component="div"
          onPageChange={handlechangepage}
          onRowsPerPageChange={handleRowsPerPage}
        ></TablePagination>
      </Paper>
    </Box>
  );
};

export default Products;
