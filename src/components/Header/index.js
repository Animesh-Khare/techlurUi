import { Box, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" color="success" sx={{ color: "green" }}>
        Employee Management
      </Typography>
    </Box>
  );
};

export default Header;
