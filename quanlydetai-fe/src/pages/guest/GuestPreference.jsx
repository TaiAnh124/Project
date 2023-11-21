import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MainLayout from "../../components/layout/MainLayout";
import { list } from "../../utils/api/topic";

const columns = [
  {
    field: "id",
    headerName: "STT",
    width: 50,
    valueGetter: (params) => {
      return params.value;
    },
  },
  {
    field: "student",
    headerName: "Người thực hiên",
    width: 200,
    valueGetter: (params) => {
      return params.value?.name;
    },
  },
  {
    field: "teacher",
    headerName: "Giáo viên hướng dẫn",
    width: 150,
    valueGetter: (params) => {
      return params.value?.name;
    },
  },
  {
    field: "title",
    headerName: "Tên đề tài",
    width: 150,
  },
  {
    field: "description",
    headerName: "Mô tả đề tài",
    width: 150,
  },
];

function GuestPreference() {
  const [listTopic, setListTopic] = useState([]);
  useEffect(() => {
    const getListTopic = async () => {
      try {
        const res = await list({
          student: "notNull",
          teacher: "notNull",
          approveByManagement: 1,
        });
        setListTopic(res?.data?.map((e) => ({ id: e?._id, ...e })));
      } catch (error) {
        console.log(error);
      }
    };
    getListTopic();
  }, []);
  return (
    <MainLayout>
      <Button fullWidth size="large" variant="contained">
        Tài liệu tham khảo
      </Button>
      <Box height={300} width={"100%"} mt={4}>
        <DataGrid rows={listTopic} columns={columns} />
      </Box>
    </MainLayout>
  );
}

export default GuestPreference;
