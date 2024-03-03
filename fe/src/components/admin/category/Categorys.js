import {
  Box,
  Button,
  IconButton,
  Input,
  InputBase,
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
import {
  DeleteCategory,
  GetAllCategorys,
} from "../../../redux/slices/category";
import {
  AccountCircleOutlined,
  Delete,
  SearchOffRounded,
  SearchOutlined,
  Update,
} from "@mui/icons-material";

import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../../components/ui/SearchBar";
import { searchCategory } from "../../../service/categoryService";
import LoadingScreen from "../../ui/LoadingScreen";
import { CloseDeleteDialog, ShowDeleteDialog } from "../../../redux/slices/app";

const Categorys = () => {
  const navigate = useNavigate();
  const [categorys, setCategorys] = useState(null);

  const [keyword, setKeyword] = useState("");

  const [loading, setLoading] = useState(true);

  const [query] = useSearchParams();

  const param = query.get("keyword");

  const dispatch = useDispatch();
  const columns = [
    { id: "id", name: "Id" },
    { id: "name", name: "Tên" },
    { id: "img", name: "Ảnh" },
    { id: "description", name: "Chú Thích" },
    { id: "action", name: "Chức Năng" },
    // { id: "action", name: "Chức năng" },
  ];

  const { token } = useSelector((state) => state.auth);

  const createMarkup = (description) => {
    return { __html: description };
  };

  const handlechangepage = (event, newpage) => {
    pagechange(newpage);
  };
  const handleRowsPerPage = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };

  const [isDelete, setIsDelete] = useState(false);

  // const [rows, rowchange] = useState([]);
  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);

  useEffect(() => {
    searchCategory(param ? param : "", token)
      .then((response) => {
        console.log("admin cate", response);
        setCategorys(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("admin cate", error);
        setCategorys([]);
        setLoading(false);
      });
  }, [param, isDelete]);

  // useEffect(() => {
  //   dispatch(GetAllCategorys());
  //   // rowchange(categorys);
  // }, []);

  const closeDelete = () => {
    dispatch(CloseDeleteDialog());
  };

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
            startIcon={<SearchOutlined sx={{ color: "#fff" }} />}
            variant="contained"
            onClick={() => {
              navigate(`/admin/category/all?keyword=${keyword}`);
            }}
          >
            Tìm Kiếm
          </Button>
        </Stack>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/admin/category/new");
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
                  return <TableCell key={column.id}>{column.name}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {categorys &&
                categorys
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
                                    spacing={2}
                                  >
                                    <IconButton
                                      onClick={() => {
                                        console.log("open dialog");
                                        const handleDelete = () => {
                                          dispatch(DeleteCategory(row.id));
                                          setIsDelete(!isDelete);

                                          // dispatch(DeleteCart(item));
                                          dispatch(CloseDeleteDialog());
                                        };
                                        dispatch(
                                          ShowDeleteDialog({
                                            title: "Xoá Danh Mục",
                                            message:
                                              "Bạn Có Muón Xoá Danh Mục Đang Chọn",
                                            handleSubmit: handleDelete,
                                            handleCancel: closeDelete,
                                          })
                                        );
                                      }}
                                    >
                                      <Delete />
                                    </IconButton>
                                    <IconButton
                                      onClick={() =>
                                        navigate(
                                          `/admin/category/update/${row.id}`
                                        )
                                      }
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
                              else if (column.id === "description") {
                                return (
                                  <TableCell
                                    key={value}
                                    dangerouslySetInnerHTML={createMarkup(
                                      value
                                    )}
                                  ></TableCell>
                                );
                              }

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
          count={categorys.length}
          component="div"
          onPageChange={handlechangepage}
          onRowsPerPageChange={handleRowsPerPage}
        ></TablePagination>
      </Paper>
    </Box>
  );
};

export default Categorys;
