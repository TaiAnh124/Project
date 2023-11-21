import { Button, Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MainLayout from "../../components/layout/MainLayout";
import ConfirmDelete from "../../components/common/ConfirmDelete";
import { list, update } from "../../utils/api/topic";
import { findUser } from "../../utils/api/user";
import moment from "moment";
import { notify } from "../../utils/helpers/notify";

const ConfirmApprove = styled(ConfirmDelete)({});

function ManagementApproveSubTopic() {
  const [currentUser, setCurrentUser] = useState({});
  const [isOpenModal, setIsOpenMdal] = useState(false);
  const [listTopic, setListTopic] = useState([]);
  const [idTopicUpdate, setIdTopicUpdate] = useState("");

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
    {
      field: "description",
      headerName: "Mô tả",
      width: 150,
    },
    {
      field: "teacher",
      headerName: "Giáo viên HD",
      width: 150,
      valueGetter: (params) => {
        return params.value?.name;
      },
    },
    {
      field: "createdAt",
      headerName: "Ngày đăng kí",
      width: 150,
      valueGetter: (params) => {
        return moment(params.value?.name).format("DD-MM-YYYY");
      },
    },
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
              onClick={() => {
                setIsOpenMdal(true);
                setIdTopicUpdate(params.row._id);
              }}
            >
              Xác nhận
            </Button>
          </Box>
        );
      },
    },
  ];

  const getListTopic = async () => {
    try {
      const major = JSON.parse(localStorage.getItem("user")).major?._id;
      const res = await list({ approveByManagement: 0, major });
      setListTopic(res.data?.map((e) => ({ id: e._id, ...e })));
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async () => {
    try {
      await update(idTopicUpdate, { approveByManagement: 1 });
      await getListTopic();
      setIsOpenMdal(false);
      notify("success", "Phê duyệt đề tài thành công");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListTopic();
  }, [currentUser]);

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

  return (
    <MainLayout>
      <Button fullWidth size="large" variant="contained">
        Duyệt đăng kí đề tài
      </Button>
      <Box height={300} width={"100%"} mt={4}>
        <DataGrid rows={listTopic} columns={columns} />
      </Box>
      <ConfirmApprove
        open={isOpenModal}
        title={"Hộp thoại xác nhận"}
        content={"Bạn có chắc chắn muốn duyệt đề tài này không?"}
        handleClose={() => setIsOpenMdal(false)}
        handleOk={handleApprove}
      />
    </MainLayout>
  );
}

export default ManagementApproveSubTopic;
