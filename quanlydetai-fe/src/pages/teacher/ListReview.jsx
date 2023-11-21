import {
  Button,
  Box,
  styled,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainLayout from "../../components/layout/MainLayout";
import ModalUpdate from "../../components/common/ModalUpdate";
import SearchTopic from "../../components/common/SearchTopic";

const rows = [
  {
    id: "025981",
    teacher: "Ronaldo",
    title: "Đề tài 1",
    date: "13/11/2023",
  },
  {
    id: "962682",
    teacher: "Messi",
    title: "Đề tài 2",
    date: "13/11/2023",
  },
];

const ModalReview = styled(ModalUpdate)({});

function ListReview() {
  const [isOpenModal, setIsOpenMdal] = useState(false);
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
    { field: "date", headerName: "Thời gian phản biện", width: 150 },
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
              onClick={() => setIsOpenMdal(true)}
            >
              Xem đánh giá
            </Button>
          </Box>
        );
      },
    },
  ];
  return (
    <MainLayout type="teacher">
      <Button fullWidth size="large" variant="contained">
        Xem đánh giá
      </Button>
      <Box mt={4}>
        <SearchTopic />
      </Box>
      <Box height={300} width={"100%"} mt={4}>
        <DataGrid rows={rows} columns={columns} />
      </Box>
      <ModalReview
        open={isOpenModal}
        handleOk={() => setIsOpenMdal(false)}
        title={"Đánh giá phản biện"}
        showCancel={false}
        titleOk={"Đóng"}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="subtitle2" mb={2}>
              Nội dung phản biện:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="subtitle2" mb={2}>
              Very good
            </Typography>
          </Grid>
        </Grid>
      </ModalReview>
    </MainLayout>
  );
}

export default ListReview;
