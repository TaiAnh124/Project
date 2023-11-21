import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MainLayout from "../../components/layout/MainLayout";
import { getListTeacher } from "../../utils/api/user";

const columns = [
  {
    field: "id",
    headerName: "STT",
    width: 50,
    valueGetter: (params) => {
      return params.value;
    },
  },
  { field: "name", headerName: "Họ tên", width: 150 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "phone", headerName: "Số điện thoại", width: 150 },
  {
    field: "major",
    headerName: "Chuyên ngành",
    width: 150,
    valueGetter: (params) => {
      return params.value?.name;
    },
  },
  {
    field: "role",
    headerName: "Vai trò",
    width: 150,
    valueGetter: (params) => {
      const value = params?.value == 1 ? "Giảng viên" : "Trưởng bộ môn";
      return value;
    },
  },
];

function GuestContact() {
  const [listTeacher, setListTeacher] = useState([]);
  useEffect(() => {
    const fetchListTeacher = async () => {
      try {
        const res = await getListTeacher();
        setListTeacher(res?.data?.map((e) => ({ id: e._id, ...e })));
      } catch (error) {
        console.log(error);
      }
    };
    fetchListTeacher();
  }, []);
  return (
    <MainLayout>
      <Button fullWidth size="large" variant="contained">
        Thông tin liên hệ
      </Button>
      <Box height={300} width={"100%"} mt={4}>
        <DataGrid rows={listTeacher} columns={columns} />
      </Box>
    </MainLayout>
  );
}

export default GuestContact;
