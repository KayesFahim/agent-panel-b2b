import { Box } from "@mui/material";
import commaNumber from "comma-number";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { useNavigate } from "react-router-dom";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import Loader from "../../../images/loader/Render.gif";
import Header from "../../Header/Header";
import "./Queues.css";
import { createMRTColumnHelper } from "material-react-table";
import axios from "axios";
import CummonTable from "../../CommonTable/CummonTable";

const Cancelled = () => {
  const columnHelper = createMRTColumnHelper();
  const navigate = useNavigate();
  const users = secureLocalStorage.getItem("user-info");
  let agentId = users?.uid;

  const [allData, setAllData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    columnHelper.accessor("bookingId", {
      header: "BookingId",
      Cell: ({ row }) => (
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
          disabled={row.original.status === "Cancelled" ? true : false}
          onClick={() => sendToQueuesDetails(row.original)}
        >
          {row.original.bookingId}
        </button>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      // size: 120,
    }),
    columnHelper.accessor("triptype", {
      header: "Trip Type",
      // size: 40,
    }),
    columnHelper.accessor("pnr", {
      header: "PNR",
      // size: 40,
    }),
    columnHelper.accessor("carrier", {
      header: "Carrier",
      // size: 200,
    }),
    columnHelper.accessor("depfrom", {
      header: "From-To",
      Cell: ({ row }) => ` ${row.original.depfrom} - ${row.original.arrto}`,
    }),
    columnHelper.accessor("totalpax", {
      header: "pax",
      // size: 20,
      Cell: ({ row }) => {
        return <Box pl={2}>{row.original.totalpax}</Box>;
      },
    }),

    columnHelper.accessor("flightdate", {
      header: "Depart Date",
      // size: 20,
      Cell: ({ row }) =>
        `${row.original?.flightdate !== "" || "undefined" || null
          ? format(new Date(row.original?.flightdate), "dd MMM yy hh:mm")
          : "Fly Date"
        }`,
    }),
    columnHelper.accessor("created_at", {
      header: "Booking Date",
      Cell: ({ row }) =>
        `${row.original?.created_at !== "" || "undefined" || null
          ? format(new Date(row.original?.created_at), "dd MMM yy hh:mm")
          : "Booked Date"
        }`,
    }),

    columnHelper.accessor("name", {
      header: "Passenger Name",
    }),
    columnHelper.accessor("grossfare", {
      header: "Total Fare",
      Cell: ({ row }) =>
        `${commaNumber(row.original.grossfare) + " PKR" || "Gross Cost"}",
    }),
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${ import.meta.env.REACT_APP_API_URL } / agent / ${ agentId } / booking / Cancelled`
        );
        setAllData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Make sure to add any dependencies if needed

  const sendToQueuesDetails = (data) => {
    navigate(
      `/ agent / bookingdetails / ${ data?.uid } / ${ data.bookingId } / ${ data?.triptype }`,
      {
        state: {
          data: data,
          pnr: data?.pnr,
          queues: "queues",
        },
      }
    );
  };

  if (isLoading) {
    return (
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
          width: "70vw",
          marginInline: "auto",
        }}
      >
        <Box
          style={{
            width: "50%",
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={Loader}
            alt="loader"
            style={{
              width: "100%",
              objectFit: "center",
            }}
          />
        </Box>
      </Box>
    );
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <Box>
      <Header />

      <Box
        sx={{
          mt: { xs: 10, md: 2 },
          p: { xs: 1, md: 2 },
          boxSizing: "border-box",
        }}
      >
        <CummonTable data={allData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Cancelled;
