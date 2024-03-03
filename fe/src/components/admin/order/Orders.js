import {
  Autocomplete,
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
  TextField,
  Typography,
} from "@mui/material";
import { Eye, Plus } from "phosphor-react";
import { faker } from "@faker-js/faker";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Delete, SearchOutlined, Update } from "@mui/icons-material";

import { GetAllOrders } from "../../../redux/slices/order";
import LoadingScreen from "../../ui/LoadingScreen";
import { searchOrders } from "../../../service/orderService";
import { Search, StyledInputBase } from "../../ui/SearchBar";

import {formatNumber} from '../../../utils/formatNumber'

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(null);

  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(true);

  const [query] = useSearchParams();

  const param = query.get("code");

  const [status, setStatus] = useState("all");
  const dispatch = useDispatch();

  const columns = [
    { id: "code", name: "Mã" },
    { id: "createAt", name: "Ngày Tạo" },
    { id: "amount", name: "Tổng Tiền" },
    { id: "paymentType", name: "Hình Thức Thanh Toán" },
    { id: "orderStatus", name: "Trang Thái" },
    { id: "action", name: "Chức Năng" },
    // { id: "action", name: "Chức năng" },
  ];

  const {token} = useSelector(state=>state.auth)
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
    searchOrders(status, param ? param : "",token)
      .then((response) => {
        console.log("admin cate", response);
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("admin cate", error);
        setOrders([]);
        setLoading(false);
      });
  }, [param, status]);

  // useEffect(() => {
  //   dispatch(GetAllProducts());
  //   // rowchange(products);
  // }, []);

  if (loading) return <LoadingScreen />;

  return (
    <Box sx={{ textAlign: "start", marginTop: 5 }}>
      <Stack
        sx={{ marginBottom: 2 }}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={0.5}>
          <Search>
            {/* <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper> */}
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
          </Search>
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/admin/order/all?code=${code}`);
            }}
            startIcon={<SearchOutlined sx={{ color: "#fff" }} />}
          >
            Tìm Kiếm
          </Button>
        </Stack>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={STATUS}
          getOptionLabel={(item) => item.name}
          onChange={(e, newValue) => {
            setStatus(newValue?.id ? newValue.id : "all");
          }}
          sx={{ width: "300px"}}
          renderInput={(params) => <TextField {...params} label="Trạng Thái" />}
        />
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
              {orders &&
                orders
                  .slice(page * rowperpage, page * rowperpage + rowperpage)
                  .map((row, i) => {
                    return (
                      <TableRow key={i}>
                        {columns &&
                          columns.map((column, i) => {
                            if (column.id === "action")
                              return (
                                <TableCell key={"value"}>
                                  <IconButton
                                    onClick={() =>
                                      navigate(`/admin/order/detail/${row.id}`)
                                    }
                                  >
                                    <Eye />
                                  </IconButton>
                                </TableCell>
                              );
                            else {
                              let value = row[column.id];

                              if(column.id === 'amount')
                              return <TableCell>{formatNumber(value)}Đ</TableCell>;

                              return <TableCell>{value}</TableCell>;
                            }
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
          count={orders.length}
          component="div"
          onPageChange={handlechangepage}
          onRowsPerPageChange={handleRowsPerPage}
        ></TablePagination>
      </Paper>
    </Box>
  );
};

const STATUS = [
  {
    id: "SUBMITTED",
    name: "Chờ Xử Lí",
  },
  { id: "COMPLETED", name: "Đã Hoàn Thành" },
];
export default Orders;
