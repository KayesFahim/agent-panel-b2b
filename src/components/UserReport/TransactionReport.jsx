import { Box, Button, Grid, Typography , Menu,
  MenuItem,
  TextField,
  CircularProgress,
  FormControl,
  InputLabel,
  Select, } from "@mui/material";
import commaNumber from "comma-number";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";

import NoData from "../../Common/NoData";
import getAuthToken from "../../Token/getAuthToken";
import Loader from "../../Common/Loader";

import SingleTrantable from "../CommonTable/SingleTrantable";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { exportToCSV } from "../../Common/exportUtils";
import DownloadIcon from '@mui/icons-material/Download';


const TransactionReport = () => {
  const token = getAuthToken();

  const [allData, setAllData] = useState(null);
  const [filterData, setFilterData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    {
      Header: "Type",
      accessor: "trxtype",
      Cell: (row) => {
        return (
          <Typography
            sx={{ fontSize: "12px", textAlign: "center" }}
            className={`${row.value?.toLowerCase()?.split(" ")?.join("-")}-btn`}
          >
            {row.value || "Status"}
          </Typography>
        );
      },
    },
    // {
    //   Header: 'Amount',
    //   accessor: 'amount',
    //   Cell: (row) => {
    //     return <Box>{commaNumber(Number.parseInt(row?.value) || 0)} PKR</Box>;
    //   },
    // },

    //add debit created based on positive or negative number
    {
      Header: "Debit",
      accessor: "debit",
      Cell: ({ row }) => {
        const amount = Number.parseInt(row.original.amount) || 0;
        return (
          <Box>
            {
              amount < 0 ? commaNumber(Math.abs(amount)) + " PKR" : "0 PKR" // Display "0 PKR" for non-negative values
            }
          </Box>
        );
      },
    },
    {
      Header: "Credit",
      accessor: "credit",
      Cell: ({ row }) => {
        const amount = Number.parseInt(row.original.amount) || 0;
        return (
          <Box>
            {
              amount > 0 ? commaNumber(amount) + " PKR" : "0 PKR" // Display "0 PKR" for non-positive values
            }
          </Box>
        );
      },
    },

    ///
    {
      Header: "TransactionId",
      accessor: "refId",
      Cell: (row) => {
        return <Box>{row?.value}</Box>;
      },
    },
    {
      Header: "Date",
      accessor: "created_at",
      Cell: (row) =>
        `${
          row.valuet !== "" || "undefined" || null
            ? format(new Date(row.value?.split("Z")[0]), "dd MMM yy hh:mm")
            : "Birth Date"
        }`,
    },
    {
      Header: "Remarks",
      accessor: "remarks",
      Cell: (row) =>
        row.value === "" || row.value === null ? "N/A" : row.value,
    },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);

   const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = columns.map((col) => col.Header);
    const tableRows = [];
  
    filterData.forEach((item) => {
      const rowData = columns.map((col) => {
        if (col.accessor === "debit" || col.accessor === "credit") {
          const amount = Number.parseInt(item.amount) || 0;
          if (col.accessor === "debit") {
            return amount < 0 ? commaNumber(Math.abs(amount)) + " PKR" : "0 PKR";
          }
          if (col.accessor === "credit") {
            return amount > 0 ? commaNumber(amount) + " PKR" : "0 PKR";
          }
        } else if (col.accessor === "created_at") {
          return format(new Date(item[col.accessor]?.split("Z")[0]), "dd MMM yy hh:mm");
        }
        return item[col.accessor] || "N/A";
      });
      tableRows.push(rowData);
    });
  
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Sales Data", 14, 15);
    doc.save("sales-data.pdf");
  };
  
  const handleDownloadExcel = () => {
    exportToCSV("sales-data", filterData, columns);
  };
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_API_URL}/agent/report/ledger`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllData(response.data);
        setFilterData(response?.data?.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching or error
      }
    };

    fetchData();
  }, [token]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Loader
          visible={true}
          height="200"
          width="500"
          color="var(--primary-color)"
          borderColor="var(--gray)"
          barColor="var(--primary-color)"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </Box>
    );
  }

  const statusfilter = (value) => {
    const filteredTransactions = allData?.data?.filter(
      (transaction) => transaction.trxtype === value
    );
    setFilterData(filteredTransactions);
  };

  return (
    <Box>
      <Header />
      <Box sx={{ mt: { xs: 11, md: 2 }, px: { xs: 1, md: 2 } }}>
        <Typography
          sx={{
            color: "var(--secondary-color)",
            fontSize: { xs: 18, sm: 18, md: "24px" },
            fontWeight: "500",
            mb: 2,
          }}
        >
          Transaction Reports
        </Typography>
        <Button
                size="small"
                sx={{
                  bgcolor: "var(--p1)",
                  color: "var(--white)",
                  textTransform: "capitalize",
                  ":hover": {
                    bgcolor: "var(--p1)",
                  },
                  pl: 2,
                  my: 1
                }}
                onClick={handleClick}
              >
                Download
                <DownloadIcon/>
              </Button>
              <Menu
                id="download-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                
              >
                <MenuItem sx={{ fontSize: "12px" }} onClick={handleDownloadPDF}>Download as PDF</MenuItem>
                <MenuItem sx={{ fontSize: "12px" }} onClick={handleDownloadExcel}>Download as Excel</MenuItem>
              </Menu>
        {/* {error ? <p>Error: {error?.message}</p> : null} */}

        {allData && (
          <Box>
            <Box mb={2}>
              <Grid container spacing={{ xs: 0.5, sm: 1, md: 1.5 }}>
                <Grid item xs={6} sm={3} md={2.3}>
                  <Box
                    sx={{
                      bgcolor: "var(--bgcolor)",
                      p: 1,
                      fontSize: 13,
                      color: "var(--primary-color)",
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      Deposit Amount:{" "}
                      {Number(allData?.depositAmount || 0).toFixed(2)}
                    </Box>
                    <Box>Deposit count: {allData?.depositCount || 0}</Box>
                    <Box textAlign="end" mt={-1.8}>
                      <Button
                        size="small"
                        onClick={() => statusfilter("deposit")}
                        sx={{
                          bgcolor: "var(--primary-color)",
                          color: "var(--white)",
                          "&:hover": {
                            bgcolor: "var(--primary-color)",
                            color: "var(--white)",
                          },
                        }}
                      >
                        View
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3} md={2.3}>
                  <Box
                    sx={{
                      bgcolor: "var(--bgcolor)",
                      p: 1,
                      fontSize: 13,
                      color: "var(--primary-color)",
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      Refund Amount:{" "}
                      {Number(allData?.refundAmount || 0).toFixed(2)}
                    </Box>
                    <Box>Refund count: {allData?.refundCount || 0}</Box>
                    <Box textAlign="end" mt={-1.8}>
                      <Button
                        size="small"
                        onClick={() => statusfilter("refund")}
                        sx={{
                          bgcolor: "var(--primary-color)",
                          color: "var(--white)",
                          "&:hover": {
                            bgcolor: "var(--primary-color)",
                            color: "var(--white)",
                          },
                        }}
                      >
                        View
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3} md={2.3}>
                  <Box
                    sx={{
                      bgcolor: "var(--bgcolor)",
                      p: 1,
                      fontSize: 13,
                      color: "var(--primary-color)",
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      Reissue Amount:{" "}
                      {Number(allData?.reissueAmount || 0).toFixed(2)}
                    </Box>
                    <Box>Reissue count: {allData?.reissueCount || 0}</Box>
                    <Box textAlign="end" mt={-1.8}>
                      <Button
                        size="small"
                        onClick={() => statusfilter("reissue")}
                        sx={{
                          bgcolor: "var(--primary-color)",
                          color: "var(--white)",
                          "&:hover": {
                            bgcolor: "var(--primary-color)",
                            color: "var(--white)",
                          },
                        }}
                      >
                        View
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3} md={2.3}>
                  <Box
                    sx={{
                      bgcolor: "var(--bgcolor)",
                      p: 1,
                      fontSize: 13,
                      color: "var(--primary-color)",
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      Ticket Amount:{" "}
                      {Number(allData?.ticketAmount || 0).toFixed(2)}
                    </Box>
                    <Box>Ticket count: {allData?.ticketCount || 0}</Box>
                    <Box textAlign="end" mt={-1.8}>
                      <Button
                        size="small"
                        onClick={() => statusfilter("ticket")}
                        sx={{
                          bgcolor: "var(--primary-color)",
                          color: "var(--white)",
                          "&:hover": {
                            bgcolor: "var(--primary-color)",
                            color: "var(--white)",
                          },
                        }}
                      >
                        View
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3} md={2.3}>
                  <Box
                    sx={{
                      bgcolor: "var(--bgcolor)",
                      p: 1,
                      fontSize: 13,
                      color: "var(--primary-color)",
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      Void Amount:{" "}
                      {Number(allData?.voidAmount || 0).toFixed(2)}
                    </Box>
                    <Box>Void count: {allData?.voidCount || 0}</Box>
                    <Box textAlign="end" mt={-1.8}>
                      <Button
                        size="small"
                        onClick={() => statusfilter("void")}
                        sx={{
                          bgcolor: "var(--primary-color)",
                          color: "var(--white)",
                          "&:hover": {
                            bgcolor: "var(--primary-color)",
                            color: "var(--white)",
                          },
                        }}
                      >
                        View
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <SingleTrantable
                columns={columns}
                data={filterData}
                pageList={10}
                textAlign="center"
              />
            </Box>
          </Box>
        )}

        {filterData?.length <= 0 && <NoData />}
      </Box>
    </Box>
  );
};

export default TransactionReport;