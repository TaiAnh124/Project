import { Box } from "@mui/material";
import React from "react";

function Logo() {
  return (
    <Box
      component={"img"}
      src={"/img/header.jpg"}
      width={"100%"}
      sx={{ objectFit: "cover" }}
    />
  );
}

export default Logo;
