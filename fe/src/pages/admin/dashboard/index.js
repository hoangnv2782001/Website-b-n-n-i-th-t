import { Stack } from "@mui/material";
import React from "react";
import SideBar from "../../../components/admin/Sidebar";

import Content from "../../../components/admin/Content";
import { useSelector } from "react-redux";
import { DeleteDialog } from "../../../components/shared/dialog/DeleteDialog";

const Dashboard = () => {
  const deleteDialog = useSelector((state) => state.app.deleteDialog);

  return (
    <Stack direction="row" sx={{maxHeight:"100vh"}}>
      <SideBar />

      <Content />


      {deleteDialog.open && <DeleteDialog {...deleteDialog}/>}
    </Stack>
  );
};

export default Dashboard;
