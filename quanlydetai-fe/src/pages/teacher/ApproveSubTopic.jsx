import { Button, Box, styled } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainLayout from "../../components/layout/MainLayout";
import ConfirmDelete from "../../components/common/ConfirmDelete";

const rows = [
  {
    id: 1,
    teacher: "Ronaldo",
    title: "Đề tài 1",
    date: "13/11/2023",
  },
  {
    id: 2,
    teacher: "Messi",
    title: "Đề tài 2",
    date: "13/11/2023",
  },
];

const ConfirmApprove = styled(ConfirmDelete)({});

function ApproveSubTopic() {
  const [isOpenModal, setIsOpenMdal] = useState(false);
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
    { field: "date", headerName: "Ngày đăng kí", width: 150 },
    {
      field: "",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <Box display={"flex"} gap={2} alignItems={"center"}>
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={() => setIsOpenMdal(true)}
            >
              Xác nhận
            </Button>
            <Button variant="contained" size="small">
              Chi tiết
            </Button>
          </Box>
        );
      },
    },
  ];
  return (
    <MainLayout type="teacher">
      <Button fullWidth size="large" variant="contained">
        Duyệt đăng kí đề tài
      </Button>
      <Box height={300} width={"100%"} mt={4}>
        <DataGrid rows={rows} columns={columns} />
      </Box>
      <ConfirmApprove
        open={isOpenModal}
        title={"Hộp thoại xác nhận"}
        content={"Bạn có chắc chắn muốn duyệt đề tài này không?"}
        handleClose={() => setIsOpenMdal(false)}
      />
    </MainLayout>
  );
}

export default ApproveSubTopic;
