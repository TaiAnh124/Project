import React, { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { Button, Box, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ModalUpdate from "../../components/common/ModalUpdate";
import SearchTopic from "../../components/common/SearchTopic";

const rows = [
  {
    id: 1,
    teacher: "Ronaldo",
    code: "123",
    title: "Đề tài 1",
    date: "13/11/2023",
  },
  {
    id: 2,
    teacher: "Messi",
    code: "1234",
    title: "Đề tài 2",
    date: "13/11/2023",
  },
];

function ManagementApproveSubTopic() {
  const [isOpenModal, setIsOpenMdal] = useState(false);
  const [value, setValue] = useState("");

  const columns = [
    {
      field: "id",
      headerName: "STT",
      width: 50,
      valueGetter: (params) => {
        return params.value;
      },
    },
    { field: "title", headerName: "Tiêu đề", width: 150 },
    { field: "teacher", headerName: "Giáo viên HD", width: 150 },
    { field: "code", headerName: "Mã sinh viên", width: 150 },
    { field: "date", headerName: "Ngày đăng kí", width: 150 },
    {
      field: "",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <Box display={"flex"} gap={2} alignItems={"center"}>
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={() => {
                setIsOpenMdal(true);
                setValue(Math.floor(Math.random() * 1000000));
              }}
            >
              Xác nhận
            </Button>
          </Box>
        );
      },
    },
  ];
  return (
    <MainLayout>
      <Button fullWidth size="large" variant="contained">
        Cấp mã đề tài
      </Button>
      <Box mt={4}>
        <SearchTopic />
      </Box>
      <Box height={300} width={"100%"} mt={4}>
        <DataGrid rows={rows} columns={columns} />
      </Box>
      <ModalUpdate
        open={isOpenModal}
        title={"Cấp mã đề tài"}
        handleClose={() => setIsOpenMdal(false)}
      >
        <TextField fullWidth value={value} />
      </ModalUpdate>
    </MainLayout>
  );
}

export default ManagementApproveSubTopic;
