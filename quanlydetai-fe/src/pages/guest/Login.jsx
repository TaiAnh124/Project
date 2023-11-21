import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import { login } from "../../utils/api/user";
import { notify } from "../../utils/helpers/notify";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await login({ username, password });
      localStorage.setItem("user", JSON.stringify(res?.data));
      navigate("/");
      window.location.reload();
    } catch (error) {
      notify("error", error?.response?.data?.message);
    }
  };
  return (
    <MainLayout>
      <Box display={"flex"} justifyContent={"center"}>
        <Paper elevation={3}>
          <Box minWidth={"20vw"} padding={2}>
            <Typography textAlign={"center"} variant="h5" fontWeight={"bold"}>
              Đăng nhập
            </Typography>
            <Stack gap={2} mt={4} component={"form"} onSubmit={handleLogin}>
              <TextField
                fullWidth
                size="small"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <TextField
                fullWidth
                size="small"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button fullWidth size="medium" variant="contained" type="submit">
                Login
              </Button>
              <Typography
                textAlign={"center"}
                sx={{ cursor: "pointer" }}
                variant="subtitle2"
              >
                Quên mật khẩu
              </Typography>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </MainLayout>
  );
}

export default Login;
