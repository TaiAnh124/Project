import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import { DataGrid } from "@mui/x-data-grid";
import { findUser } from "../../utils/api/user";
import { findTopicOfStudent, list, update } from "../../utils/api/topic";
import { notify } from "../../utils/helpers/notify";
import { findPeriodByMajor } from "../../utils/api/period";
import moment from "moment";

function SubTopic() {
  const [currentUser, setCurrentUser] = useState({});
  const [listTopic, setListTopic] = useState([]);
  const [currentTopic, setCurrentTopic] = useState({});
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [text, setText] = useState("");

  const columns = [
    {
      field: "id",
      headerName: "STT",
      width: 50,
      valueGetter: (params) => {
        return params.value;
      },
    },
    { field: "title", headerName: "Tên đè tài", width: 150 },
    { field: "description", headerName: "Mô tả", width: 200 },
    {
      field: "teacher",
      headerName: "Giáo viên hướng dẫn",
      width: 150,
      valueGetter: (params) => {
        return params.value?.name;
      },
    },
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
              onClick={() => handleSubTopic(params.row.id)}
            >
              Đăng kí
            </Button>
          </Box>
        );
      },
    },
  ];

  const handleSubTopic = async (id) => {
    try {
      if (currentTopic) {
        notify(
          "warn",
          "Bạn đã đăng kí đề tài, vui lòng vào quản lý đề tài để xem chi tiết"
        );
      } else {
        await update(id, { student: currentUser?._id });
        notify("success", "Cập nhật thành công");
        await getListTopic();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getListTopic = async () => {
    try {
      const res = await list({
        major: currentUser?.major?._id,
        approveByManagement: 1,
        student: undefined,
        teacher: "notNull",
      });
      setListTopic(res.data?.map((e) => ({ id: e._id, ...e })));
    } catch (error) {}
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
    const getCurrentTopic = async () => {
      try {
        const res = await findTopicOfStudent(currentUser?._id);
        setCurrentTopic(res.data);
      } catch (error) {}
    };
    currentUser && getCurrentTopic();
    currentUser && getListTopic();
  }, [currentUser]);

  useEffect(() => {
    const getPeriod = async () => {
      try {
        const res = await findPeriodByMajor(currentUser?.major?._id);
        setCurrentPeriod(res.data);
      } catch (error) {}
    };
    currentUser && getPeriod();
  }, [currentUser]);

  useEffect(() => {
    const getStatus = () => {
      const today = moment();
      const timeOpen = moment(currentPeriod?.timeOpen, "DD/MM/YYYY");
      const timeClose = moment(currentPeriod?.timeClose, "DD/MM/YYYY");

      console.log({ today, timeOpen });

      if (today.isBefore(timeOpen)) {
        setText("Chưa đến thời gian đăng kí đề tài. Vui lòng vào lại sau !");
      }

      if (today.isAfter(timeClose)) {
        setText(
          "Đã hết thời gian đăng kí đề tài. Vui lòng liên hệ với admin để nhận được trợ giúp!"
        );
      }
    };
    currentPeriod?.timeOpen && getStatus();
  }, [currentPeriod]);

  return (
    <MainLayout type="student">
      <Button fullWidth size="large" variant="contained">
        Đăng kí đề tài
      </Button>

      {!currentUser?.major ? (
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
          <Button variant="contained" size="small" href="/student-info">
            Cập nhật
          </Button>
        </Box>
      ) : currentPeriod ? (
        text ? (
          <>
            <Typography variant="subtitle2" mt={4}>
              {text}
            </Typography>
            <Typography variant="subtitle2" mt={2}>
              Thời gian đăng kí đề tài: {currentPeriod.timeOpen} -{" "}
              {currentPeriod.timeClose}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="subtitle2" color={"error"} mt={4}>
              *Lưu ý: Sinh viên muốn đề xuất đề tài vui lòng liên hệ với GVHD
            </Typography>
            <Box height={300} width={"100%"} mt={2}>
              <DataGrid rows={listTopic} columns={columns} hideFooter={true} />
            </Box>
          </>
        )
      ) : (
        <>
          <Typography variant="subtitle2" mt={2}>
            Chưa có lịch về đăng kí chuyên ngành. Vui lòng đợi thêm thông báo từ
            hệ thống.
          </Typography>
        </>
      )}
    </MainLayout>
  );
}

export default SubTopic;
