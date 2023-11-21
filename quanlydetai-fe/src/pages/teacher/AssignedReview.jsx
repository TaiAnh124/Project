import { Button, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainLayout from "../../components/layout/MainLayout";
import { list } from "../../utils/api/topic";
import { findUser } from "../../utils/api/user";

function AssignedReview() {
  const [currentUser, setCurrentUser] = useState({});
  const [listTopic, setListTopic] = useState([]);

  useEffect(() => {
    const getListTopic = async () => {
      try {
        const res = await list({
          teacherReview: currentUser?._id,
        });
        setListTopic(res?.data?.map((e) => ({ id: e._id, ...e })));
      } catch (error) {}
    };

    currentUser && getListTopic();
  }, [currentUser]);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const id = JSON.parse(localStorage.getItem("user"))._id;
        const res = await findUser(id);
        setCurrentUser(res.data);
      } catch (error) {}
    };
    getCurrentUser();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Mã đề tài",
      width: 150,
      valueGetter: (params) => {
        return params.value;
      },
    },
    { field: "title", headerName: "Tiêu đề", width: 150 },
    { field: "description", headerName: "Mô tả", width: 150 },
    {
      field: "student",
      headerName: "Sinh viên thực hiện",
      width: 150,
      valueGetter: (params) => {
        return params.value?.name;
      },
    },
    {
      field: "teacher",
      headerName: "Giảng viên hướng dẫn",
      width: 150,
      valueGetter: (params) => {
        return params.value?.name;
      },
    },
    { field: "dayReivew", headerName: "Ngày phản biện", width: 150 },
  ];
  return (
    <MainLayout type="teacher">
      <Button fullWidth size="large" variant="contained">
        Đề tài được phân công phản biện
      </Button>
      <Box height={300} width={"100%"} mt={4}>
        <DataGrid rows={listTopic} columns={columns} />
      </Box>
    </MainLayout>
  );
}

export default AssignedReview;
