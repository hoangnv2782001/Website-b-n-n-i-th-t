import { HomeMaxOutlined, NotAccessible } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

import image from "../../../assets/quan10.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetAllCategorys } from "../../../redux/slices/category";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { categorys } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(GetAllCategorys());
  }, [dispatch]);
  return (
    <Stack
      sx={{
        width: "230px",
        maxHeight: "100vh",
        position: "sticky",
        overflowY: "scroll",
        top: "16px",
        // paddingBottom: "117px",
        color: "rgb(56, 56, 61)",
        fontSize: "14px",
        lineHeight: "20px",
        borderTopLeftRadius: "4px",
        borderBottomLeftRadius: "4px",
      }}
    >
      <Stack
        sx={{
          position: "relative",

          margiBottom: "16px",
          padding: "12px 8px",

          backgroundColor: "rgb(255, 255, 255)",
          borderRadius: "8px",
        }}
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              sx={{ fontWeight: "bold" }}
            >
              Danh Muc
            </ListSubheader>
          }
        >
          {categorys &&
            categorys.map((category) => (
              <ListItemButton
                key={category.id}
                sx={{
                  padding: "7px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s ease 0s",
                  "&:hover": {
                    backgroundColor: "#E5E5E6",
                  },
                }}

                onClick={()=>{
                  navigate(`/category/${category.id}`)
                }}
              >
                <ListItemIcon
                  sx={{
                    flex: "0 0 32px",
                    height: "32px",
                    marginRight: "8px",
                    lineHeight: 0,
                  }}
                >
                  <img src={category.img} alt="sdfghjkl" />
                </ListItemIcon>
                <Typography sx={{ fontWeight: 400, fontSize: "14px" }} variant="body1">
                  {category.name}
                </Typography>
              </ListItemButton>
            ))}
        </List>
      </Stack>
    </Stack>
  );
};

export default Sidebar;
