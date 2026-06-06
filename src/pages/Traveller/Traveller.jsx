import { Box, Button, Container, Tooltip, Typography } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { useNavigate } from "react-router-dom";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import Swal from "sweetalert2";
import Header from "../../components/Header/Header";
import ReConfirm from "../../images/undraw/undraw_confirmation_re_b6q5.svg";
import Invalid from "../../images/undraw/undraw_warning_re_eoyh.svg";
import axios from "axios";
import CustomTable from "../../components/CommonTable/CustomTable";
import Loader from "../../Common/Loader";
import NoData from "../../Common/NoData";
import getAuthToken from "../../Token/getAuthToken";

const Traveller = () => {
  const navigate = useNavigate();
  const token = getAuthToken();

  const [refetch, setRefetch] = useState(false);

  const [allData, setAllData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    {
      Header: "Given Name",
      accessor: "givenname",
    },
    {
      Header: "Surname",
      accessor: "surname",
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Type",
      accessor: "type",
      Cell: ({ row }) =>
        `${row.original.type === "ADT"
          ? "Adult"
          : row.original.type === "INF"
            ? "Infant"
            : "Child"
        }`,
    },
    {
      Header: "Date of Birth",
      accessor: "dob",
      Cell: ({ row }) =>
        `${row.original.dob !== "" || "undefined" || null
          ? format(new Date(row.original.dob), "dd MMM yy hh:mm")
          : "Birth Date"
        }`,
    },
    {
      Header: "Expire Date",
      accessor: "expiredate",
      Cell: ({ row }) => {
        const expireDateStr = row.original.expiredate;
        if (!expireDateStr) return "N/A";

        let isExpired = false;
        let formattedDate = "N/A";
        try {
          const expDate = new Date(expireDateStr);
          if (!isNaN(expDate.getTime())) {
            formattedDate = format(expDate, "dd MMMM yyyy");
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            isExpired = expDate < today;
          }
        } catch (e) {
          console.error(e);
        }

        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: isExpired ? "error.main" : "inherit",
              }}
            >
              {formattedDate}
            </Typography>
            {isExpired && (
              <Tooltip title="Update Passport Info" arrow>
                <WarningIcon
                  sx={{
                    color: "error.main",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            )}
          </Box>
        );
      },
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <Tooltip title="Edit Traveller" arrow>
            <EditIcon
              sx={{
                color: "var(--primary-color)",
                cursor: "pointer",
                fontSize: "20px",
                "&:hover": {
                  color: "var(--secondary-color)",
                },
              }}
              onClick={() =>
                navigate("/agent/addtraveller", {
                  state: { editData: row.original },
                })
              }
            />
          </Tooltip>
          <Tooltip title="Delete Traveller" arrow>
            <DeleteForeverIcon
              sx={{
                color: "crimson",
                cursor: "pointer",
                fontSize: "22px",
                "&:hover": {
                  color: "red",
                },
              }}
              onClick={() => handelDelete(row.original.uid, row.original.paxId)}
            />
          </Tooltip>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_API_URL}/agent/traveller`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAllData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]); // Make sure to add any dependencies if needed

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get(url, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const fetchedData = response.data;
  //       setData(fetchedData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error.message);
  //       setData([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [refetch, searchWord]);

  async function handelDelete(id, paxId) {
    const result = await Swal.fire({
      imageUrl: ReConfirm,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      title: "Are you sure?",
      text: "You want to delete this traveler?",
      showCancelButton: true,
      confirmButtonColor: "var(--secondary-color)",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "crimson",
      cancelButtonText: "Don't delete it!",
    });

    if (result.isConfirmed) {
      const url = `${import.meta.env.REACT_APP_API_URL}/agent/traveller/${id}`;

      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok || data?.status.toLowerCase() === "success") {
          await Swal.fire({
            title: "Deleted this traveler",
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          });

          setRefetch(!refetch);
        } else {
          await Swal.fire({
            imageUrl: Invalid,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: `${data?.message}`,
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          });
        }
      } catch (err) {
        await Swal.fire({
          imageUrl: Invalid,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: err.message,
          confirmButtonColor: "var(--primary-color)",
          confirmButtonText: "Ok",
        });
      }
    }
  }
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
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
  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }
  return (
    <Box>
      <Header />
      <Box sx={{ mt: { xs: 10, sm: 10, md: 2 }, px: { xs: 1, md: 2 } }}>
        <Box>
          <Box
            sx={{
              display: { xs: "block", sm: "flex", md: "flex" },
              alignItems: "center",
              justifyContent: "space-between",
              mb: "10px",
            }}
          >
            <Typography
              sx={{
                color: "var(--secondary-color)",
                fontSize: "24px",
                fontWeight: "500",
              }}
            >
              Traveler
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Button
                sx={{
                  fontSize: "12px",
                  textTransform: "capitalize",
                  background: "var(--primary-color)",
                  color: "var(--white)",
                  "&:hover": {
                    background: "var(--primary-color)",
                    color: "var(--white)",
                  },
                }}
                onClick={() => navigate("/agent/addtraveller")}
              >
                Add Traveller
              </Button>
            </Box>
          </Box>
        </Box>
        <CustomTable
          columns={columns}
          data={allData}
          pageList={15}
          textAlign="center"
          display="flex"
        />
        {allData?.length <= 0 && <NoData />}
      </Box>
    </Box>
  );
};

export default Traveller;
