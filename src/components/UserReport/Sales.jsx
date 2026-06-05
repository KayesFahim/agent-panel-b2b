import { Box, Button, Grid, Stack, Typography , Menu,
  MenuItem,
  TextField,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,} from "@mui/material";
import commaNumber from "comma-number";
import { format } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import CustomTable from "../CommonTable/CustomTable";
import NoData from "../../Common/NoData";
import getAuthToken from "../../Token/getAuthToken";
import Loader from "../../Common/Loader";
import CustomSearchInput from "../../Common/CustomSearchInput";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { exportToCSV } from "../../Common/exportUtils";
import DownloadIcon from '@mui/icons-material/Download';


const Sales = () => {
  const token = getAuthToken();

  //   const [allData, setAllData] = useState(null);
  //   const [filterData, setFilterData] = useState([]);
  //   const [error, setError] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true);
   // State for the dropdown menu
   const [rowsPerPage, setRowsPerPage] = useState(10); // Default to 10 rows per page
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [searchWord, setSearchWord] = useState({
    filterText: "",
    pnr: "",
    airline: "",
    status: "",
    mobileStatus: "",
  });

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

    //
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
      Header: "Details",
      accessor: "details",
      Cell: (row) =>
        row.value === "" || row.value === null ? "N/A" : row.value,
    },
    {
      Header: "Remarks",
      accessor: "remarks",
      Cell: (row) =>
        row.value === "" || row.value === null ? "N/A" : row.value,
    },
  ];

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage + 1);
    setLoading(true);
    setRefetch(!refetch);
    setLoading(false);
    window.scrollTo(0, 0);
  };

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setSearchWord((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleReset = () => {
    setSearchWord({ filterText: "", status: "" });
    setRefetch(!refetch);
  };

  const handleSearch = async () => {
    setLoading(true);
    setRefetch(!refetch);
    setCurrentPage(1);
    setLoading(false);
  };
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = columns.map((col) => col.Header);
    const tableRows = [];
  
    data?.data.forEach((item) => {
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
    exportToCSV("sales-data", data?.data || [], columns);
  };
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const url = `${import.meta.env.REACT_APP_API_URL}/agent/report/sales?page=${
    searchWord?.status || searchWord?.filterText ? 1 : currentPage
  }&status=${searchWord?.status}&filter=${searchWord?.filterText}&limit=${rowsPerPage}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedData = response.data;
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refetch, searchWord?.status, searchWord?.filterText, token, url, rowsPerPage]);
  
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page on rows change
    setRefetch(!refetch);
  };

  return (
    <Box>
      
      <Header />
      
      <Box sx={{ mt: { xs: 11, md: 2 }, px: { xs: 1, md: 2 } }}>
        <Box
          sx={{
            bgcolor: "var(--white)",
            mb: 1,
          }}
        >
          <Typography
            sx={{
              color: "var(--secondary-color)",
              fontSize: { xs: 18, sm: 18, md: "24px" },
              fontWeight: "500",
              mb: 2,
            }}
          >
            Sales Reports
          </Typography>
          <Box
          sx={{
            bgcolor: "var(--white)",
            mb: 1,
          }}
        >
        <Grid
            container
            spacing={{ xs: 1, md: 2 }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item>
              
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
            </Grid>
            <Grid item xs={12}  sm={12} md={4}>
            <Stack spacing={2} direction="row" alignItems="flex-start" justifyContent="flex-start">
              {/* <CustomSearchInput
                name="filterText"
                value={searchWord.filterText}
                placeholder="Search With PNR"
                onChange={handleChange}
                sx={{
                  flexGrow: 1,
                  "& .MuiInputBase-root": {
                    bgcolor: "#f0f0f0",
                    borderRadius: 1,
                    px: 2,
                  },
                }}
              /> */}
              {/* <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={handleReset}
                sx={{
                  borderColor: "#d32f2f",
                  color: "#d32f2f",
                  "&:hover": { bgcolor: "#f9ebee", borderColor: "#c62828" },
                }}
              >
                Reset
              </Button> */}
            </Stack>
          </Grid>
          <Grid item xs={12}  sm={12} md={4} sx={{mb:{xs:2, sm:2},display:"flex",justifyContent:{md:"flex-end"}}}>
            <FormControl
              
              variant="outlined"
              sx={{width:"200px", mt: 1, height: "36px", }} // Reduce mt and set a custom height
            >
              <InputLabel sx={{ lineHeight: "36px" }}>Rows per Page</InputLabel>
              <Select
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                label="Rows per Page"
                sx={{
                  height: "36px",
                  lineHeight: "36px",
                  bgcolor: "#f0f0f0",
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          </Grid> 
        </Box> 
        </Box>
        
        {loading ? (
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
        ) : (
          <Box>
            {data?.data && (
              <Box>
                {/* <Box mb={2}>
              <Grid container spacing={{ xs: 0.5, sm: 1, md: 1.5 }}>
                <Grid item xs={6} sm={3} md={2.3}>
                  <Box
                    sx={{
                      bgcolor: "var(--bgcolor)",
                      p: 1,
                      fontSize: 13,
                      color: 'var(--primary-color)',
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      Deposit Amount:{' '}
                      {allData?.depositAmount === null
                        ? 0
                        : allData?.depositAmount?.toFixed(2) || 0}
                    </Box>
                    <Box>Deposit count: {allData?.depositCount || 0}</Box>
                    <Box textAlign="end" mt={-1.8}>
                      <Button
                        size="small"
                        onClick={() => statusfilter('deposit')}
                        sx={{
                          bgcolor: 'var(--primary-color)',
                          color: 'var(--white)',
                          '&:hover': {
                            bgcolor: 'var(--primary-color)',
                            color: 'var(--white)',
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
                      bgcolor: 'var(--bgcolor)',
                      p: 1,
                      fontSize: 13,
                      color: 'var(--primary-color)',
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      Refund Amount:{' '}
                      {allData?.refundAmount === null
                        ? 0
                        : allData?.refundAmount?.toFixed(2) || 0}
                    </Box>
                    <Box>Refund count: {allData?.refundCount || 0}</Box>
                    <Box textAlign="end" mt={-1.8}>
                      <Button
                        size="small"
                        onClick={() => statusfilter('refund')}
                        sx={{
                          bgcolor: 'var(--primary-color)',
                          color: 'var(--white)',
                          '&:hover': {
                            bgcolor: 'var(--primary-color)',
                            color: 'var(--white)',
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
                      bgcolor: 'var(--bgcolor)',
                      p: 1,
                      fontSize: 13,
                      color: 'var(--primary-color)',
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      Reissue Amount:{' '}
                      {allData?.reissueAmount === null
                        ? 0
                        : allData?.reissueAmount?.toFixed(2) || 0}
                    </Box>
                    <Box>Reissue count: {allData?.reissueCount || 0}</Box>
                    <Box textAlign="end" mt={-1.8}>
                      <Button
                        size="small"
                        onClick={() => statusfilter('reissue')}
                        sx={{
                          bgcolor: 'var(--primary-color)',
                          color: 'var(--white)',
                          '&:hover': {
                            bgcolor: 'var(--primary-color)',
                            color: 'var(--white)',
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
                      bgcolor: 'var(--bgcolor)',
                      p: 1,
                      fontSize: 13,
                      color: 'var(--primary-color)',
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      Ticket Amount:{' '}
                      {allData?.ticketAmount === null
                        ? 0
                        : allData?.ticketAmount?.toFixed(2) || 0}
                    </Box>
                    <Box>Ticket count: {allData?.ticketCount || 0}</Box>
                    <Box textAlign="end" mt={-1.8}>
                      <Button
                        size="small"
                        onClick={() => statusfilter('ticket')}
                        sx={{
                          bgcolor: 'var(--primary-color)',
                          color: 'var(--white)',
                          '&:hover': {
                            bgcolor: 'var(--primary-color)',
                            color: 'var(--white)',
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
                      bgcolor: 'var(--bgcolor)',
                      p: 1,
                      fontSize: 13,
                      color: 'var(--primary-color)',
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      Void Amount:{' '}
                      {allData?.voidAmount === null
                        ? 0
                        : allData?.voidAmount?.toFixed(2) || 0}
                    </Box>
                    <Box>Void count: {allData?.voidCount || 0}</Box>
                    <Box textAlign="end" mt={-1.8}>
                      <Button
                        size="small"
                        onClick={() => statusfilter('void')}
                        sx={{
                          bgcolor: 'var(--primary-color)',
                          color: 'var(--white)',
                          '&:hover': {
                            bgcolor: 'var(--primary-color)',
                            color: 'var(--white)',
                          },
                        }}
                      >
                        View
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box> */}
                <Box>
                  <CustomTable
                   columns={columns}
                   data={(data && data?.data) || []}
                   totalLength={data && data?.totaldata}
                   loading={loading}
                   pageIndex={currentPage - 1}
                   gotoPage={handlePageChange}
                   canPreviousPage={currentPage > 1}
                   previousPage={() => handlePageChange(currentPage - 1)}
                   canNextPage={currentPage}
                   nextPage={() => handlePageChange(currentPage)}
                   pageList={rowsPerPage}
                   textAlign="center"
                  />
                </Box>
              </Box>
            )}

            {data?.data?.length <= 0 && <NoData />}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Sales;
