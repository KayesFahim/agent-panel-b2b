import {
  Box, Button, Grid, Stack, Typography, Menu, MenuItem, TextField,
  CircularProgress,
  FormControl,
  InputLabel,
  Select
} from "@mui/material";
import commaNumber from "comma-number";
import { format } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { useNavigate, useParams } from "react-router-dom";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import axios from "axios";
import CustomSearchInput from "./../../../Common/CustomSearchInput";
import Loader from "../../../Common/Loader";
import ApiCustomTable from "./../../CommonTable/ApiCustomTable";
import FilterSelect from "./../../../Common/FilterSelect";
import Header from "./../../Header/Header";
import NoData from "../../../Common/NoData";
import getAuthToken from "../../../Token/getAuthToken";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { exportToCSV } from "../../../Common/exportUtils";
import DownloadIcon from '@mui/icons-material/Download';

const AllBookingStatus = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default to 10 rows per page
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const params = useParams();
  const bookingStatus = params?.status;
  const token = getAuthToken();
  const navigate = useNavigate();

  // Handle a page change.
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
      Header: "Booking ID",
      accessor: "bookingId",
      Cell: (row) => {
        return (
          <button
            style={{
              background: "var(--primary-color)",
              borderRadius: "5px",
              padding: "2px 10px",
              width: "120px",
              cursor: "pointer",
              border: "none",
              color: "var(--white)",
            }}
            onClick={() => sendToQueuesDetails(row?.row?.original)}
          >
            {row?.row?.original.bookingId}
          </button>
        );
      },
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: (row) => {
        return (
          <Box className={`${row.value?.toLowerCase()}-btn`}>
            {row?.value === "Hold" ? "On Hold" : row?.value}
          </Box>
        );
      },
    },
    // {
    //   Header: 'Company Name',
    //   accessor: 'companyname',
    //   Cell: (row) => {
    //     return <Box>{row?.value || 'N/A'}</Box>;
    //   },
    // },
    {
      Header: "Trip type",
      accessor: "triptype",
      Cell: (row) => {
        return <Box>{row?.value || "N/A"}</Box>;
      },
    },
    {
      Header: "PNR",
      accessor: "pnr",
      Cell: (row) => {
        return <Box>{row?.value || "N/A"}</Box>;
      },
    },
    {
      Header: "Carrier",
      accessor: "carrier_name",
      Cell: (row) => {
        return <Box>{row.value || "Carrier"}</Box>;
      },
    },
    {
      Header: "From-To",
      accessor: "depfrom",
      Cell: (row) => {
        return (
          <Box>
            {row?.row?.original.depfrom} - {row?.row?.original.arrto}
          </Box>
        );
      },
    },

    {
      Header: "Depart Date",
      accessor: "flightdate",
      Cell: (row) => {
        return (
          <Box>
            {row?.value !== "" || "undefined" || null
              ? format(new Date(row?.value?.split("Z")[0]), "dd MMM yy")
              : "Fly Date"}
          </Box>
        );
      },
    },
    {
      Header: "Booking Date",
      accessor: "created_at",
      Cell: (row) => {
        return (
          <Box>
            {row?.value !== "" || "undefined" || null
              ? format(new Date(row?.value?.split("Z")[0]), "dd MMM yy hh:mm a")
              : "Fly Date"}
          </Box>
        );
      },
    },

    {
      Header: "Passenger Name",
      accessor: "name",
      Cell: (row) => {
        return <Box>{row?.value || "N/A"}</Box>;
      },
    },
    {
      Header: "Net Fare",
      accessor: "netfare",
      Cell: (row) => {
        return <Box>{commaNumber(row?.value || 0) || "N/A"}</Box>;
      },
    },
    {
      Header: "Gross Fare",
      accessor: "grossfare",
      Cell: (row) => {
        return <Box>{commaNumber(row?.value || 0) || "N/A"}</Box>;
      },
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

  // -------------------------

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = columns.map((col) => col.Header);
    const tableRows = [];

    data?.data.forEach((item) => {
      const rowData = columns.map((col) => {
        const value = item[col.accessor];
        if (col.accessor === "flightdate" || col.accessor === "created_at") {
          return format(new Date(value?.split("Z")[0]), "dd MMM yy");
        }
        return value || "N/A";
      });
      tableRows.push(rowData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Booking Data", 14, 15);
    doc.save("booking-data.pdf");
  };

  const handleDownloadExcel = () => {
    exportToCSV("booking-data", data?.data || [], columns);
  };

  const url = `${import.meta.env.REACT_APP_API_URL}/agent/booking?page=${searchWord?.status || searchWord?.filterText ? 1 : currentPage
    }&status=${bookingStatus || "Hold"}&filter=${searchWord?.filterText
    }&limit=${rowsPerPage}`;

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
  }, [refetch, searchWord?.status, searchWord.filterText, bookingStatus, token, rowsPerPage]);

  const sendToQueuesDetails = (data) => {
    navigate(
      `/agent/bookingdetails/${data?.uid}/${data.bookingId}/${data?.triptype}`,
      {
        state: {
          data: data,
          pnr: data?.pnr,
          queues: "queues",
        },
      }
    );
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page on rows change
    setRefetch(!refetch);
  };


  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }
  return (
    <Box>
      <Header />

      <Box
        sx={{
          mt: { xs: 10, md: 2 },
          p: { xs: 1, md: 2 },
        }}
      >
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
              <Typography
                noWrap
                sx={{
                  fontSize: { xs: 14, md: 18 },
                  color: "var(-primary-color)",
                }}
              >
                Booking Management
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
                <DownloadIcon />
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
            <Grid item xs={12} sm={12} md={4}>
              <Stack spacing={2} direction="row" alignItems="center">
                <CustomSearchInput
                  name="filterText"
                  value={searchWord.filterText}
                  placeholder="PNR/ID"
                  onChange={handleChange}
                  sx={{
                    flexGrow: 1,
                    "& .MuiInputBase-root": {
                      bgcolor: "#f0f0f0",
                      borderRadius: 1,
                      px: 2,
                    },
                  }}
                />
                <Button
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
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ mb: { xs: 2, sm: 2 }, display: "flex", justifyContent: { md: "flex-end" } }}>
              <FormControl

                variant="outlined"
                sx={{ width: "200px", mt: 1, height: "36px", }} // Reduce mt and set a custom height
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





        <Box>
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
            <ApiCustomTable
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
              textAlign="start"
            />
          )}
          {data?.data?.length <= 0 && <NoData />}
        </Box>
      </Box>
    </Box>
  );
};

export default AllBookingStatus;
