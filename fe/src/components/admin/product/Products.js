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
import { MagnifyingGlass, Plus } from "phosphor-react";
import { faker } from "@faker-js/faker";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../ui/LoadingScreen";
import { Delete, SearchOutlined, Update } from "@mui/icons-material";
import { DeleteProduct, GetAllProducts } from "../../../redux/slices/product";
import { formatNumber } from "../../../utils/formatNumber";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../../components/ui/SearchBar";

import { searchProduct } from "../../../service/productService";
import { CloseDeleteDialog, ShowDeleteDialog } from "../../../redux/slices/app";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);

  const [keyword, setKeyword] = useState("");

  const [loading, setLoading] = useState(true);

  const [query] = useSearchParams();

  const param = query.get("keyword");

  const dispatch = useDispatch();

  const columns = [
    { id: "id", name: "Id", width: "10%" },
    { id: "name", name: "Tên", width: "30%" },
    { id: "img", name: "Hinh Ảnh", width: "20%" },
    { id: "category", name: "Danh Mục", width: "10%" },
    { id: "quantity", name: "Số Lượng", width: "10%" },
    { id: "price", name: "Giá", width: "10%" },
    { id: "action", name: "Chức Năng", width: "10%" },
  ];

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
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    searchProduct(param ? param : "")
      .then((response) => {
        console.log("admin cate", response);
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("admin cate", error);
        setProducts([]);
        setLoading(false);
      });
  }, [param, isDelete]);

  // const handleDelete = () => {
  //   dispatch(DeleteProduct(id));
  //   setIsDelete(!isDelete);

  //   // dispatch(DeleteCart(item));
  //   dispatch(CloseDeleteDialog());
  // };

  // const openDeleteDialog = () => {
  //   console.log("open dialog");
  //   dispatch(
  //     ShowDeleteDialog({
  //       title: "Xoá Sản Phẩm",
  //       message: "Bạn Có Muón Xoá Sản Phẩm Đang Chọn",
  //       handleSubmit: handleDelete,
  //       handleCancel: closeDelete,
  //     })
  //   );
  // };

  const closeDelete = () => {
    dispatch(CloseDeleteDialog());
  };

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
                setKeyword(e.target.value);
              }}
            />
          </Search>
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/admin/product/all?keyword=${keyword}`);
            }}
            startIcon={<SearchOutlined sx={{ color: "#fff" }} />}
          >
            Tìm Kiếm
          </Button>
        </Stack>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/admin/product/new");
          }}
        >
          <Plus />
          Thêm Mới
        </Button>
      </Stack>

      <Paper sx={{ width: "100%" }} elevation={2}>
        <TableContainer sx={{ height: "100%" }}>
          <Table stickyHeader>
            <TableHead sx={{ backgroundColor: "#c6c5c9" }}>
              <TableRow>
                {columns.map((column) => {
                  return (
                    <TableCell sx={{ width: column.width }} key={column.id}>
                      {column.name}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {products &&
                products
                  .slice(page * rowperpage, page * rowperpage + rowperpage)
                  .map((row, i) => {
                    return (
                      <TableRow key={i}>
                        {columns &&
                          columns.map((column, i) => {
                            if (column.id === "action")
                              return (
                                <TableCell key={"value"}>
                                  <Stack
                                    direction={"row"}
                                    alignItems={"center"}
                                    spacing={0.5}
                                  >
                                    <IconButton
                                      onClick={() => {
                                        console.log("open dialog");
                                        const handleDelete = () => {
                                          dispatch(DeleteProduct(row.id));
                                          setIsDelete(!isDelete);

                                          // dispatch(DeleteCart(item));
                                          dispatch(CloseDeleteDialog());
                                        };
                                        dispatch(
                                          ShowDeleteDialog({
                                            title: "Xoá Sản Phẩm",
                                            message:
                                              "Bạn Có Muón Xoá Sản Phẩm Đang Chọn",
                                            handleSubmit: handleDelete,
                                            handleCancel: closeDelete,
                                          })
                                        );
                                      }}
                                    >
                                      <Delete />
                                    </IconButton>
                                    <IconButton
                                      onClick={() => {
                                        navigate(
                                          `/admin/product/update/${row.id}`
                                        );
                                      }}
                                    >
                                      <Update />
                                    </IconButton>
                                  </Stack>
                                </TableCell>
                              );
                            else {
                              let value = row[column.id];
                              if (column.id === "img")
                                return (
                                  <TableCell key={value}>
                                    <img
                                      src={value}
                                      alt={"img"}
                                      style={{
                                        height: "160px",
                                        width: "160px",
                                      }}
                                    />
                                  </TableCell>
                                );
                              else if (column.id === "price")
                                return (
                                  <TableCell key={value}>
                                    {formatNumber(value)}Đ
                                  </TableCell>
                                );

                              return <TableCell key={value}>{value}</TableCell>;
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
          count={products.length}
          component="div"
          onPageChange={handlechangepage}
          onRowsPerPageChange={handleRowsPerPage}
        ></TablePagination>
      </Paper>
    </Box>
  );
};

export default Products;
