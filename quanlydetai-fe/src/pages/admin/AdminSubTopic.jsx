import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import { findUser } from "../../utils/api/user";
import { create } from "../../utils/api/topic";
import { notify } from "../../utils/helpers/notify";
import SelectMajor from "../../components/common/SelectMajor";

function AdminSubTopic() {
  const [currentUser, setCurrentUser] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [major, setMajor] = useState("");

  const handleClear = () => {
    setTitle("");
    setDescription("");
  };

  const handleCreateTopic = async (e) => {
    try {
      e.preventDefault();
      await create({
        title,
        description,
        approveByManagement: 1,
        major,
        owner: currentUser?._id,
      });
      notify("success", "Thêm đề tài thành công");
      handleClear();
    } catch (error) {
      console.log(error);
    }
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

  return (
    <MainLayout>
      <Button fullWidth size="large" variant="contained">
        Đăng kí đề tài
      </Button>

      <Box p={4} component={"form"} onSubmit={handleCreateTopic}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Typography variant="subtitle2">Chuyên ngành:</Typography>
          </Grid>
          <Grid item xs={10}>
            <SelectMajor value={major} setValue={setMajor} />
          </Grid>
        </Grid>
        <Grid container spacing={1} mt={1}>
          <Grid item xs={2}>
            <Typography variant="subtitle2">Tên đề tài:</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              fullWidth
              size="small"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} mt={1}>
          <Grid item xs={2}>
            <Typography variant="subtitle2">Mô tả đề tài:</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              multiline
              rows={3}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
        </Grid>

        <Box display={"flex"} justifyContent={"center"} gap={2} mt={2}>
          <Button variant="contained" type="submit">
            Đăng kí
          </Button>
        </Box>
      </Box>
    </MainLayout>
  );
}

export default AdminSubTopic;
