import React from "react";
import MainLayout from "../../components/layout/MainLayout";
import { Button, Box, Grid, Paper, Typography } from "@mui/material";

function StudentCodeTopic() {
  return (
    <MainLayout type={"student"}>
      <Button fullWidth size="large" variant="contained">
        Mã số đề tài
      </Button>
      <Box mt={4}>
        <Button variant="contained">Mã đề tài chưa được cấp</Button>
        <Paper elevation={2}>
          <Box p={4}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2">Họ và tên:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="subtitle2">
                      Nguyễn Quang Hải
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1} mt={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2">Khoa:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="subtitle2">Chất lượng cao</Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1} mt={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2">Tên đề tài:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="subtitle2">Đề tài mẫu 1</Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1} mt={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2">Lý do:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="subtitle2"></Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2">Mã số:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="subtitle2">CT160585</Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1} mt={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2">Lớp:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="subtitle2">CLCIT</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </MainLayout>
  );
}

export default StudentCodeTopic;
