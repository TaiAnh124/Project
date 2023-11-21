import React from "react";
import { Button, Box, Typography } from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

function GuestInstruction() {
  return (
    <MainLayout>
      <Button fullWidth size="large" variant="contained">
        Hướng dẫn
      </Button>
      <Box
        mt={4}
        display={"flex"}
        alignItems={"center"}
        gap={2}
        justifyContent={"center"}
        sx={{ cursor: "pointer" }}
      >
        <PictureAsPdfOutlinedIcon />
        <Typography variant="subtitle2" sx={{ textDecoration: "underline" }}>
          Tài liệu hướng dẫn
        </Typography>
        <Button variant="contained" size="small">
          Download PDF
        </Button>
      </Box>
    </MainLayout>
  );
}

export default GuestInstruction;
