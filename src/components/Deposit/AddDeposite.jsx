import { Container, Typography } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import CashTab from "./AddDepositTabs/CashTab";
import Header from "../Header/Header";
import PayWithBkash from "../Bkash/PayWithBkash";

const AddDeposite = () => {
  const [value, setValue] = React.useState("cash");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Header />
      <Box sx={{ bgcolor: "#FFFFFF", mt: { xs: 12, md: 2 } }}>
        <Container>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: { xs: 20, sm: 24 },
              color: "#222222",
              mb: { xs: 1, sm: "18px" },
            }}
          >
            Add Deposit
          </Typography>
        </Container>
      </Box>
      <Box sx={{ bgcolor: "#EEF2F5", height: "100vh", pt: 2 }}>
        <Container sx={{ mt: { xs: 2, md: 2 } }}>
          <Box sx={{ width: "100%" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  width: "100%",
                  height: { md: "fit-content", sm: "100%", xs: "100%" },
                  display: "block",
                  justifyContent: {
                    xs: "space-between",
                  },
                  alignItems: "center",
                  opacity: "1",
                  "& .MuiTabs-flexContainer": {
                    flexWrap: "wrap",
                    gap: "23px",
                    marginBottom: "39px",
                  },
                  ".MuiTabs-root": {
                    minHeight: "fit-content",
                  },
                  "& button": {
                    opacity: "1",
                    background: "#fff",
                    color: "var(--secondary-color)",
                    // border: "1px solid var(--secondary-color)",
                    width: "fit-content",
                    minHeight: "fit-content",
                    padding: "10px 20px",
                    fontSize: "12px",
                    borderRadius: "4px",
                  },
                  "& button.Mui-selected": {
                    background: "var(--primary-color)",
                    // border: "1px solid var(--priamry-color)",
                    color: "var(--white) !important",
                  },
                }}
              >
                <TabList
                  onChange={handleChange}
                  TabIndicatorProps={{
                    style: { display: "none" },
                  }}
                >
                  <Tab label="Cash" value="cash" />
                  <Tab label="Bank Transfer" value="banktransfer" />
                  <Tab label="Bkash" value="bkash" />
                </TabList>
              </Box>

              <TabPanel value="cash" style={{ padding: "0px" }}>
                <CashTab />
              </TabPanel>
              <TabPanel value="banktransfer" style={{ padding: "0" }}>
                <CashTab value="banktransfer" />
              </TabPanel>
              <TabPanel value="bkash" style={{ padding: "0" }}>
                {/* <CashTab value="bkash" /> */}
                <PayWithBkash />
              </TabPanel>
            </TabContext>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AddDeposite;
