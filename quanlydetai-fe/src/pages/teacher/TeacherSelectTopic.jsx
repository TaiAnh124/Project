import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import { findUser } from "../../utils/api/user";
import { list, update } from "../../utils/api/topic";
import { notify } from "../../utils/helpers/notify";
import { DataGrid } from "@mui/x-data-grid";

function TeacherSelectTopic() {
  const [currentUser, setCurrentUser] = useState({});
  const [listTopic, setListTopic] = useState([]);

  const columns = [
    {
      field: "id",
      headerName: "Mã đề tài",
      width: 150,
    },
    { field: "title", headerName: "Tên đề tài", width: 150 },
    { field: "description", headerName: "Mô tả", width: 150 },

    {
      field: "",
      headerName: "Hành động",
      width: 250,
      renderCell: (params) => {
        return (
          <Box display={"flex"} gap={2} alignItems={"center"}>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleSelectTopic(params.row._id)}
            >
              Đăng kí
            </Button>
          </Box>
        );
      },
    },
  ];

  const handleSelectTopic = async (id) => {
    try {
      await update(id, { teacher: currentUser?._id });
      notify("success", "Chọn đề tài thành công");
      getListTopic();
    } catch (error) {
      console.log(error);
    }
  };

  const getListTopic = async () => {
    try {
      const res = await list({
        major: currentUser?.major?._id,
        approveByManagement: 1,
        teacher: undefined,
      });
      setListTopic(res?.data?.map((e) => ({ id: e._id, ...e })));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const id = JSON.parse(localStorage.getItem("user"))._id;
        const res = await findUser(id);
        setCurrentUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    currentUser && getListTopic();
  }, [currentUser]);

  return (
    <MainLayout>
      <Button fullWidth size="large" variant="contained">
        Chọn đề tài hướng dẫn
      </Button>
      {currentUser?.major ? (
        <Box height={"70vh"} width={"100%"} mt={4}>
          <DataGrid rows={listTopic} columns={columns} hideFooter={true} />
        </Box>
      ) : (
        <Box
          mt={4}
          display={"flex"}
          alignItems={"center"}
          gap={2}
          justifyContent={"center"}
          sx={{ cursor: "pointer" }}
        >
          <Typography variant="subtitle2">
            Bạn phải cập nhật thông tin chuyên ngành trước khi đăng kí đề tài
          </Typography>
          <Button variant="contained" size="small" href="/teacher-info">
            Cập nhật
          </Button>
        </Box>
      )}
    </MainLayout>
  );
}

export default TeacherSelectTopic;
