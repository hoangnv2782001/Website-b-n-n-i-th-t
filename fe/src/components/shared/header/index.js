import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";

import Logo from "../../../assets/logo.jpg";
import { Button, Stack } from "@mui/material";
import { AccountCircleOutlined, ShoppingBag } from "@mui/icons-material";
import { ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignOut, User } from "phosphor-react";
import { Logout } from "../../../redux/slices/auth";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "4px",
  backgroundColor: alpha(theme.palette.common.black, 0.15),
 
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 20,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(10),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  zIndex:1000
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
 
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  const navigate = useNavigate();

  const { quantity } = useSelector((state) => state.cart);

  const { name } = useSelector((state) => state.user);

  const { isLoggedIn } = useSelector((state) => state.auth);

  const [link, setLink] = React.useState("auth/login");



  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isLoggedIn) setLink("/profile");
    else setLink("/auth/login");
  }, [isLoggedIn]);

  const [param, setParam] = useState("");

  // menu handle

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if (isLoggedIn) {
      setAnchorEl(event.currentTarget);
      console.log("open menu");
    }
  };
  const handleClose = () => {
    console.log("close menu");
    if (isLoggedIn) {
      setAnchorEl(null);
    }
  };

  const handleSearch = () => {
    console.log("click search");
    if (param) {
      navigate(`/search?keyword=${param}`);
      setParam("")
    }
  };
  return (
    <Box sx={{ backgroundColor: "#000" }}>
      <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
        <Toolbar sx={{ p: 5 }}>
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/home");
            }}
          >
            {" "}
            <img src={Logo} alt="dfghjk" />
          </Box>

          <Search>
            <SearchIconWrapper sx={{ cursor: "pointer" }} onClick={handleSearch}>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={param}
              onChange={(event) => {
                console.log("event ", event);
                setParam(event.target.value);
              }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />

          <Stack direction={"row"} alignItems={"center"} spacing={3}>
            <Box
              zIndex={1301}
              onMouseOver={handleClick}
              onMouseOut={handleClose}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  navigate(link);
                  // navigate(link);
                }}
                id="basic-btn"
                aria-controls={name && open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={name && open ? "true" : undefined}
                startIcon={<AccountCircleOutlined />}
              >
                {name ? name : "Đăng Nhập"}
              </Button>

              {/* menu */}
              <Menu
                MenuListProps={{
                  "aria-labelledby": "basic-btn",
                  //  onMouseLeave: handleClose
                }}
                onMouseOver={(e) => {
                  console.log("ngan chan sư kien", e);
                  if (e?.target?.className?.includes("MuiBackdrop-root"))
                    e.stopPropagation();
                }}
                id={"basic-menu"}
                aria-labelledby="basic-btn"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Stack
                  spacing={1}
                  px={1}
                  // onMouseEnter={() => setMouseHover(true)}
                  // onMouseLeave={() => setMouseHover(false)}

                  // onMouseLeave={handleClose}
                >
                  {Profile_Menu.map((element, index) => {
                    return (
                      <MenuItem
                        onClick={() => {
                          // handleClick();
                        }}
                      >
                        <Stack
                          onClick={() => {
                            if (index === 1) {
                              dispatch(Logout(navigate));
                            } else {
                              navigate("/profile");
                            }
                          }}
                          direction="row"
                          sx={{ width: 100 }}
                          alignItems={"center"}
                          justifyContent="space-between"
                        >
                          <Typography>{element.title}</Typography>
                          {element.icon}
                        </Stack>
                      </MenuItem>
                    );
                  })}
                </Stack>
              </Menu>
              {/* menu */}
            </Box>

            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              onClick={() => {
                navigate("/cart");
              }}
            >
              <Badge badgeContent={quantity} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const Profile_Menu = [
  {
    title: "Tài Khoản",
    icon: <User />,
  },
  {
    title: "Đăng Xuất",
    icon: <SignOut />,
  },
];
