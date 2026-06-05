import {
  Box,
  Button,
  ClickAwayListener,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import commaNumber from "comma-number";
import { addDays, format } from "date-fns";
import React, { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../Header/Header";
import CustomTable from "../CommonTable/CustomTable";
import NoData from "../../Common/NoData";
import getAuthToken from "../../Token/getAuthToken";
import SingleTrantable from "../CommonTable/SingleTrantable";

const LedgerReport = () => {
  const navigate = useNavigate();

  const token = getAuthToken();
  const [ledgerData, setLedgerData] = useState([]);
  const [startDate, setStartDate] = useState(format(new Date(), "dd MMM yyyy"));
  const [endDate, setEndDate] = useState(
    format(addDays(new Date(), 1), "dd MMM yyyy")
  );
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

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
    {
      Header: "Amount",
      accessor: "amount",
      Cell: (row) => {
        return <Box>{commaNumber(Number.parseInt(row?.value) || 0)} PKR</Box>;
      },
    },
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${import.meta.env.REACT_APP_API_URL}/agent/report/${new Date(
      startDate
    ).toLocaleDateString("sv")}/${new Date(endDate).toLocaleDateString("sv")}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch report data");
      }

      const data = await response.json();
      setLedgerData(data);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.message,
        confirmButtonColor: "var(--primary-color)",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleClickAway = () => {
    setOpenEndDate(false);
    setOpenStartDate(false);
  };

  return (
    <Box>
      <Header />
      <Box sx={{ mt: { xs: 11, md: 2 }, px: { xs: 1, md: 2 } }}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box
            sx={{
              position: "relative",
              display: { xs: "block", sm: "flex", md: "flex" },
              justifyContent: "space-between",
              alignItems: "end",
              mb: 1,
            }}
          >
            <Typography
              variant="span"
              sx={{
                fontWeight: 500,
                fontSize: "28px",
                color: "var(--secondary-color)",
              }}
            >
              Report
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                alignItems="end"
                justifyContent={"start"}
              >
                <Grid
                  style={{ position: "relative" }}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Tooltip title="Enter Start Date">
                      <input
                        required
                        id="startDate"
                        name="startDate"
                        style={{
                          border: "1px solid var(--secondary-color)",
                          borderRadius: "4px",
                          padding: "5px 10px",
                          cursor: "pointer",
                        }}
                        type="text"
                        value={startDate}
                        readOnly
                        onClick={() => {
                          setOpenEndDate(false);
                          setOpenStartDate((prev) => !prev);
                        }}
                      />
                    </Tooltip>
                  </Box>
                  {openStartDate && (
                    <Calendar
                      color={"var(--primary-color)"}
                      date={new Date(startDate)}
                      onChange={(date) => {
                        setStartDate(format(new Date(date), "dd MMM yyyy"));
                        setOpenStartDate(false);
                      }}
                      maxDate={addDays(new Date(), -1)}
                      months={1}
                      className="new-dashboard-calendar"
                      name="dashboard-calendar"
                    />
                  )}
                </Grid>

                <Grid
                  style={{ position: "relative" }}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Tooltip title="Enter End Date">
                      <input
                        required
                        id="endDate"
                        name="endDate"
                        style={{
                          border: "1px solid var(--secondary-color)",
                          borderRadius: "4px",
                          padding: "5px 10px",
                          cursor: "pointer",
                        }}
                        type="text"
                        value={endDate}
                        readOnly
                        onClick={() => {
                          setOpenEndDate((prev) => !prev);
                          setOpenStartDate(false);
                        }}
                      />
                    </Tooltip>
                  </Box>
                  {openEndDate && (
                    <Calendar
                      color="var(--primary-color)"
                      date={new Date(endDate)}
                      onChange={(date) => {
                        setEndDate(format(new Date(date), "dd MMM yyyy"));
                        setOpenEndDate(false);
                      }}
                      months={1}
                      className="new-dashboard-calendar"
                    />
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "end",
                    gap: "5px",
                  }}
                >
                  <Button
                    sx={{
                      background: "var(--secondary-color)",
                      color: "white",
                      padding: "5px 20px !important",
                      fontSize: "12px !important",
                      width: "100%",
                      "&:hover": {
                        background: "var(--secondary-color)",
                        color: "white",
                      },
                    }}
                    type="submit"
                  >
                    PROCEED
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </ClickAwayListener>
      </Box>
      {ledgerData && ledgerData?.length !== 0 ? (
        <Box
          sx={{
            p: { xs: 1, md: 2 },
            boxSizing: "border-box",
          }}
        >
          <SingleTrantable data={ledgerData} columns={columns} />
        </Box>
      ) : (
        <Box sx={{ p: { xs: 1, md: 2 } }}>
          {ledgerData?.length <= 0 && <NoData />}
        </Box>
      )}
    </Box>
  );
};

export default LedgerReport;
