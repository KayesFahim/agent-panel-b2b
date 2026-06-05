import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";

export const HeaderDrawer = () => {
  const [haveAccount, setHaveAccount] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Box>
      {/* //todo: Sign In form */}
      <Box>
        <form onSubmit={handleSubmit}></form>
      </Box>
      {/* //todo: Sign Up form */}
      <Box>
        <form onSubmit={handleSubmit}></form>
      </Box>
    </Box>
  );
};
