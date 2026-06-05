import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import { createMRTColumnHelper } from "material-react-table";
import axios from "axios";
import CummonTable from "../CommonTable/CummonTable";
import { useNavigate } from "react-router-dom";
import Loader from "../../Common/Loader";

const SearchHistory = () => {
  const aminInfo = secureLocalStorage.getItem("admin-info");
  let token = aminInfo?.token;
  const navigate = useNavigate();
  const columnHelper = createMRTColumnHelper();
  const [allData, setAllData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    columnHelper.accessor("companyname", {
      header: "Company Name",
    }),
    columnHelper.accessor("triptype", {
      header: "Trip Type",
    }),
    columnHelper.accessor("depfrom", {
      header: "Departure",
      Cell: ({ row }) => ` ${row.original.depfrom}`,
    }),
    columnHelper.accessor("arrto", {
      header: "Arrival",
      Cell: ({ row }) => ` ${row.original.arrto}`,
    }),
    columnHelper.accessor("depdate", {
      header: "Departure Date",
      Cell: ({ row }) =>
        `${
          row.original?.depdate !== "" || "undefined" || null
            ? format(new Date(row.original?.depdate), "dd MMM yy ")
            : "Booked Date"
        }`,
    }),
    columnHelper.accessor("returndate", {
      header: "Return Date",
      Cell: ({ row }) =>
        `${
          row.original?.returndate === null ||
          row.original?.returndate === "undefined" ||
          row.original?.returndate === ""
            ? "N/A"
            : format(new Date(row.original?.returndate), "dd MMM yy ")
        }`,
    }),
    columnHelper.accessor("created_at", {
      header: "Search Date",
      Cell: ({ row }) =>
        `${
          row.original?.created_at !== "" || "undefined" || null
            ? format(new Date(row.original?.created_at), "dd MMM yy hh:mm")
            : "Booked Date"
        }`,
    }),
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_API_URL}/search/history/today`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllData(response.data);
      } catch (error) {
        setError(error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Make sure to add any dependencies if needed

  if (error) {
    return null;
  }
  return (
    <Box>
      <Box pt={2} px={2}>
        <Typography
          sx={{
            color: "var(--secondary-color)",
            fontSize: "24px",
            fontWeight: "500",
            p: 2,
            bgcolor: "var(--gray)",
          }}
        >
          All Search History
        </Typography>
      </Box>
      <Box p={2}>
        {isLoading ? (
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
          <CummonTable data={allData} columns={columns} />
        )}
      </Box>
    </Box>
  );
};

export default SearchHistory;
