import React, { useCallback, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Modal,
  Stack,
  Menu,
  MenuItem,
  TextField,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import { useEffect } from "react";
import commaNumber from "comma-number";
import { format } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./../../Common/Loader";
import CustomSearchInput from "./../../Common/CustomSearchInput";
import FilterSelect from "./../../Common/FilterSelect";
import ApiCustomTable from "./../../components/CommonTable/ApiCustomTable";
import Header from "../../components/Header/Header";
import NoData from "../../Common/NoData";
import getAuthToken from "../../Token/getAuthToken";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { exportToCSV } from "../../Common/exportUtils";
import DownloadIcon from "@mui/icons-material/Download";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none !important",
  boxShadow: 24,
  p: { xs: 2, md: 4 },
  borderRadius: "10px",
  outline: "none !important",
};

const PaymentManagement = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default to 10 rows per page
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const token = getAuthToken();

  // Handle a page change.
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchWord, setSearchWord] = useState({
    filterText: "",
    pnr: "",
    airline: "",
    status: "",
    mobileStatus: "",
  });

  const statusData = [
    { name: "Approved", value: "Approved" },
    { name: "Rejected", value: "Rejected" },
    { name: "Pending", value: "Pending" },
  ];
  const viewImage = (imageUrl) => {
    setSelectedImage(null);
    setIsModalOpen(true);
    setLoading(true); // Set loading state to true

    fetch(imageUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.blob();
      })
      .then((blob) => {
        const objectURL = URL.createObjectURL(blob);
        setSelectedImage(objectURL); // Set selectedImage to the object URL once image is loaded
        setLoading(false); // Set loading state to false after image is loaded
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
        setLoading(false); // Set loading state to false in case of error
        // Handle error state if needed
      });
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const columns = [
    {
      Header: "Deposit Id",
      accessor: "depositId",
      Cell: (row) => {
        return (
          <Box
            sx={{
              background: "var(--bgcolor)",
              borderRadius: "5px",
              padding: "2px 10px",
              color: "var(--secondary-color)",
            }}
          >
            {row.value}
          </Box>
        );
      },
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: (row) => {
        return (
          <Box className={`${row.value?.toLowerCase()}-btn`}>{row.value}</Box>
        );
      },
    },
    {
      Header: "Type",
      accessor: "paymentway",
      Cell: (row) => {
        return <Box>{row?.value || "N/A"}</Box>;
      },
    },
    {
      Header: "Sender Acc",
      accessor: "receiver",
      Cell: (row) => {
        return <Box>{row?.value || "N/A"}</Box>;
      },
    },
    {
      Header: "Receiver",
      accessor: "sender",
      Cell: (row) => {
        return <Box>{row?.value || "N/A"}</Box>;
      },
    },
    {
      Header: "Amount",
      accessor: "amount",
      Cell: (row) => {
        return <Box>{commaNumber(row.value || 0) + " PKR"}</Box>;
      },
    },

    {
      Header: "Date",
      accessor: "created_at",
      Cell: (row) => {
        return (
          <Box>
            {row?.row?.original?.created_at !== "" || "undefined" || null
              ? format(
                new Date(row?.row?.original?.created_at?.split("Z")[0]),
                "dd MMM yy hh:mm a"
              )
              : "Fly Date"}
          </Box>
        );
      },
    },
    {
      Header: "Attachment",
      accessor: "attachment",
      Cell: (row) => {
        return (
          <Box textAlign={"center"}>
            {row?.row?.original?.attachment?.split(".").pop().toLowerCase() ===
              "pdf" ? (
              <a
                href={row?.row?.original?.attachment}
                target="_blank"
                rel="noreferrer"
                style={{ color: "black" }}
              >
                <Box sx={{ fontSize: 14 }}>View</Box>
              </a>
            ) : (
              <Box
                sx={{
                  cursor: "pointer",
                  bgcolor: "var(--bgcolor)",
                  borderRadius: 10,
                  color: "var(--primary)",
                }}
                onClick={() => viewImage(row?.row?.original?.attachment)}
              >
                View
              </Box>
            )}
          </Box>
        );
      },
    },
    {
      Header: "Reference",
      accessor: "ref",
      Cell: (row) => {
        return <Box>{row?.row?.original.ref || "N/A"}</Box>;
      },
    },
    {
      Header: "Remarks",
      accessor: "remarks",
      Cell: (row) => {
        return <Box>{row?.row?.original.remarks || "N/A"}</Box>;
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


  const url = `${import.meta.env.REACT_APP_API_URL}/agent/deposit?page=${searchWord?.status || searchWord?.filterText ? 1 : currentPage
    }&status=${searchWord?.status}&filter=${searchWord?.filterText
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
        // setPaymentData(fetchedData);
        // setAllPaymentData(fetchedData);
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refetch, searchWord?.status, searchWord.filterText, token, rowsPerPage]);

  // modal
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page on rows change
    setRefetch(!refetch);
  };

  return (
    <Box>
      <Box>
        <Header />
        <Box sx={{ mt: { xs: 12, md: 2 }, px: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            mb={{ xs: 1, sm: 0 }}
          >
            <Typography
              sx={{
                color: "var(--secondary-color)",
                fontSize: { xs: 20, sm: 24 },
                fontWeight: 500,
              }}
            >
              Deposit Requests
            </Typography>
            <Box
              onClick={() => navigate("/agent/adddeposit")}
              sx={{
                cursor: "pointer",
                textTransform: "capitalize",
                padding: "5px 25px",
                background: "var(--primary-color)",
                color: "#FFFFFF",
                borderRadius: "4px",
                fontSize: "16px",
              }}
            >
              Add Deposit
            </Box>
          </Stack>
        </Box>
        <Box
          sx={{
            p: { xs: 1, md: 2 },
            boxSizing: "border-box",
          }}
        >
          <Box>
            <Box>
              <Box
                sx={{
                  py: 2,
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
                  {/* <Grid item>
                <CustomSearchInput
                  name="filterText"
                  value={searchWord?.filterText}
                  placeholder="Enter Search Word..."
                  onChange={handleChange}
                />
              </Grid> */}

                  <Grid item>
                    <Stack direction={"row"} alignItems="center" spacing={2}>
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
                          my: 1,
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
                        <MenuItem
                          sx={{ fontSize: "12px" }}
                          onClick={handleDownloadPDF}
                        >
                          Download as PDF
                        </MenuItem>
                        <MenuItem
                          sx={{ fontSize: "12px" }}
                          onClick={handleDownloadExcel}
                        >
                          Download as Excel
                        </MenuItem>
                      </Menu>

                      <CustomSearchInput
                        name="filterText"
                        value={searchWord.filterText}
                        placeholder="Deposit Id"
                        onChange={handleChange}
                        sx={{
                          flexGrow: 1,
                          "& .MuiInputBase-root": {
                            bgcolor: "#f0f0f0",
                            borderRadius: 1,
                            px: 2,
                          },
                          "& input::placeholder": {
                            fontSize: "0.2rem", // Adjust this value to make the placeholder text smaller
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
                          "&:hover": {
                            bgcolor: "#f9ebee",
                            borderColor: "#c62828",
                          },
                        }}
                      >
                        Reset
                      </Button>
                    </Stack>
                  </Grid>
                  <Grid item>
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        sx={{
                          mb: { xs: 2, sm: 2 },
                          display: "flex",
                          justifyContent: { md: "flex-end" },
                        }}
                      >
                        <FormControl
                          variant="outlined"
                          sx={{ width: "200px", height: "36px" }} // Reduce mt and set a custom height
                        >
                          <InputLabel sx={{ lineHeight: "36px" }}>
                            Rows per Page
                          </InputLabel>
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
                      <Grid item>
                        <Box
                          sx={{
                            select: {
                              border: "1px solid var(--bgcolor)",
                              p: "8px",
                              fontSize: 14,
                              width: "100%",
                              bgcolor: "var(--gray)",
                              borderRadius: "5px",
                              textTransform: "capitalize",
                              minWidth: "200px",
                            },
                            option: {
                              fontSize: 14,
                              fontWeight: 400,
                            },
                            position: "relative",
                          }}
                        >
                          <FilterSelect
                            data={statusData}
                            value={searchWord?.status}
                            handleChange={handleChange}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              {!loading ? (
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
                  textAlign="center"
                />
              ) : (
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
              )}
              {data?.dat?.length <= 0 && <NoData />}
            </Box>
          </Box>
        </Box>
      </Box>

      <Modal open={isModalOpen} onClose={closeModal}>
        <Box sx={{ ...style, width: "auto", height: "auto" }}>
          {loading ? (
            "processing your request please wait.."
          ) : selectedImage === null ? (
            <>Attachment is not found !</>
          ) : (
            <Box
              sx={{
                img: {
                  maxWidth: { xs: "80vw", sm: "50vw", md: "40vw" },
                },
              }}
            >
              <img
                src={selectedImage}
                alt="Modal Image"
              // style={{ maxHeight: '40vh' }}
              />
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default PaymentManagement;
