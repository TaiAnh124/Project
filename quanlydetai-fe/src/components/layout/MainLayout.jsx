import React, { useEffect, useState } from "react";
import { Container, Grid, Box } from "@mui/material";
import Header from "./header";
import Sidebar from "./sidebar/SideBar";
import {
  listAdminSideBar,
  listGuestSideBar,
  listManagementSideBar,
  listStudentSideBar,
  listTeacherSideBar,
} from "../../contstant/sidebar";
import Footer from "./footer";

function MainLayout({ children }) {
  const [listSidebar, setListSidebar] = useState([]);
  useEffect(() => {
    const getListSidebar = () => {
      const obj = localStorage.getItem("user");
      const type = JSON?.parse(obj)?.role;
      switch (type) {
        case 3:
          setListSidebar(listAdminSideBar);
          break;
        case 2:
          setListSidebar(listManagementSideBar);
          break;
        case 1:
          setListSidebar(listTeacherSideBar);
          break;
        case 0:
          setListSidebar(listStudentSideBar);
          break;
        default:
          setListSidebar(listGuestSideBar);
          break;
      }
    };
    getListSidebar();
  }, []);
  return (
    <Container>
      <Header />
      <Box py={4}>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Sidebar listSidebar={listSidebar} />
          </Grid>
          <Grid item xs={9}>
            {children}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Container>
  );
}

export default MainLayout;
