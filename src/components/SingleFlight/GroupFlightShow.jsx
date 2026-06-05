import { Box, Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResultLoader from "../Loader/ResultLoader";
import Swal from "sweetalert2";
import Header from "../Header/Header";
import GroupFlight from "../GroupFlight/GroupFlight";
import getAuthToken from "../../Token/getAuthToken";
const GroupFlightShow = () => {
  const token = getAuthToken();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.REACT_APP_API_URL}/groupfare`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return Swal.fire({
      title: "No Group Fare Flights Found",
      confirmButtonText: "Search Again...",
      confirmButtonColor: "var(--primary-color)",
    }).then(function () {
      navigate("/user");
    });
  }
  return (
    <Box>
      <Header />

      <Container>
        {isLoading && (
          <Box pt={{ xs: 10, md: 3 }} px={2}>
            <ResultLoader count={8} />
          </Box>
        )}
        {data?.length < 0 && (
          <Box pt={{ xs: 10, md: 3 }} px={2} textAlign="center">
            No Fare Available
          </Box>
        )}

        <Box mt={{ xs: 12, md: 3 }} px={2}>
          {/* {data?.map((item, index) => {
            return (
              <Box>
                <GroupFlight
                  key={index}
                  flightData={item}
                  adultCount={1}
                  childCount={0}
                  infant={0}
                  user="user"
                />
              </Box>
            );
          })} */}
          {data?.sort((a, b) => {
            // Extract the departure dates
            const dateA = new Date(a?.AllLegsInfo[0]?.DepDate);
            const dateB = new Date(b?.AllLegsInfo[0]?.DepDate);
            // Compare the dates
            return dateA - dateB;
          }).map((item, index) => {
            return (
              <Box key={index}>
                <GroupFlight
                  flightData={item}
                  adultCount={1}
                  childCount={0}
                  infant={0}
                  user="user"
                />
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default GroupFlightShow;
