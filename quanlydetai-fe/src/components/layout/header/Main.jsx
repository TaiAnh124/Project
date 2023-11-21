import { Box, Button, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const Text = styled(Typography)({
  color: "white",
  textTransform: "uppercase",
  padding: "12px 10px",
  fontSize: "12px",
  fontWeight: "bold",
  cursor: "pointer",
  "&:hover": {
    color: "#88cafd",
  },
});

function Main() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const getCurrentUser = () => {
      const obj = localStorage.getItem("user");
      if (obj) {
        setUser(JSON.parse(obj));
      }
    };
    getCurrentUser();
  }, []);

  return (
    <Box
      width={"100%"}
      bgcolor={"#195691"}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <Box display={"flex"}>
        <Text>Giới thiệu</Text>
        <Text>Công khai</Text>
        <Text>Đơn vị</Text>
        <Text>Tuyển sinh</Text>
        <Text>Đào tạo</Text>
        <Text>Nghiên cứu</Text>
        <Text>Đối ngoại</Text>
        <Text>Người học</Text>
        <Text>Nội bộ</Text>
      </Box>
      {!user?.username ? (
        <Button size="small" href="/login">
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <PersonIcon sx={{ color: "white" }} />
            <Typography color={"white"} fontSize={12} fontWeight={"bold"}>
              Đăng nhập
            </Typography>
          </Box>
        </Button>
      ) : (
        <Box display={"flex"} alignItems={"center"}>
          <Text>({user?.username})</Text>
          <Button onClick={handleLogout}>
            <Typography fontSize={12} color={"white"} fontWeight={"bold"}>
              Đăng xuất
            </Typography>
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Main;
