import { Container, Typography, Grid } from "@mui/material";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import getAuthToken from "../../Token/getAuthToken";

const AllBank = () => {
  const [bankDetails, setBankDetails] = useState([]);
  const token = getAuthToken();

  useEffect(() => {
    fetch(`${import.meta.env.REACT_APP_API_URL}/banklist/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok, status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setBankDetails(data);
      })
      .catch((error) => {
        // 
      });
  }, []);

  return (
    <Box>
      <Header />
      <Container sx={{ mt: { xs: 12, md: 2 } }}>
        <Box my={3}>
          <Box>
            {bankDetails?.length > 0 && (
              <Typography
                sx={{
                  color: "var(--secondary-color)",
                  fontSize: 20,
                  fontWeight: "500",
                  mb: 2,
                }}
              >
                All Bank List
              </Typography>
            )}

            <Box>
              <Grid container spacing={2}>
                {bankDetails?.map((item, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Box
                      sx={{
                        border: "1px solid var(--gray)",
                        p: 2,
                        borderRadius: 1,
                        fontSize: 14,
                        span: {
                          color: "var(--primary-color)",
                        },
                      }}
                    >
                      <Box>
                        Bank Name: <span>{item?.bankname}</span>
                      </Box>
                      <Box>
                        Account Name: <span>{item?.accountname}</span>
                      </Box>
                      <Box>
                        Account Number: <span>{item?.accountnumber}</span>
                      </Box>
                      <Box>
                        Branch Name: <span>{item?.branch}</span>
                      </Box>
                      <Box>
                        Routing Number: <span>{item?.routingno}</span>
                      </Box>
                      <Box
                        sx={{
                          img: {
                            height: "60px",
                          },
                        }}
                      >
                        <img src={item?.logo} alt="Bank Log" />
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AllBank;
