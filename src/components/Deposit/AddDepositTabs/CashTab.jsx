import { Box, Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./CashTab.css";
import { useEffect } from "react";
import FileInputGrid from "../../../Common/FileInputGrid";
import TextFieldGrid from "../../../Common/TextFieldGrid";
import SelectGrid from "../../../Common/SelectGrid";
import getAuthToken from "../../../Token/getAuthToken";
import TokenDecrypt from "../../../Token/TokenDecrypt";

const fetchApiData = async (url, token, setData, errorHandler) => {
  try {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to fetch data: ${errorData.message || response.statusText}`
      );
    }

    const data = await response.json();
    setData(data);
  } catch (error) {
    errorHandler(error);
  }
};

const CashTab = ({ value }) => {
  const navigate = useNavigate();
  // const user = secureLocalStorage.getItem('user-info');
  // const uid = user?.uid;

  const tokenise = TokenDecrypt();
  const token = getAuthToken();
  const agentName = tokenise?.company;
  const [isLoading, setIsLoading] = useState(true);
  const [sender, setSender] = useState(agentName || "");
  const [reciver, setReciver] = useState("AATrips");
  const [reference, setReference] = useState("");
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null);
  const [bankDetails, setBankDetails] = useState([]);
  const [depositTo, setDepositTo] = useState("");
  const [bankSender, setBankSender] = useState("");

  const handleOpen = () => {
    navigate("/agent/allbank");
  };

  useEffect(() => {
    fetchApiData(
      `${import.meta.env.REACT_APP_API_URL}/banklist/all`,
      token,
      (data) => setBankDetails(data),
      (error) => console.error(error)
    );
  }, [token]);
  // 
  const onChangeFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(false); // Set isLoading to true initially

    try {
      const formData = new FormData();
      formData.append("file", file);
      const url = `${import.meta.env.REACT_APP_API_URL}/agent/deposit?amount=${amount}&sender=${value === "banktransfer" ? bankSender : sender
        }&paymentway=${value === "banktransfer" ? "Bank" : "Cash"}&receiver=${value === "banktransfer" ? depositTo : reciver
        }&reference=${reference}`;
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Deposit Successfully!",
        html: `For any query, please contact us at <strong>support@aatrips.pk</strong> or Call <strong>+8801409965900</strong>`,
        button: "Done!",
      }).then(() => {
        setIsLoading(true);
        navigate(-1);
      });
    } catch (error) {
      let errorMessage =
        "An error occurred while processing your deposit. Please try again later.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        icon: "error",
        title: "Deposit Failed!",
        html: errorMessage,
        button: "Done!",
      });
    } finally {
      setIsLoading(true); // Set isLoading to false in the finally block
    }
  };

  return (
    <Box sx={{ mt: "10px" }}>
      <form onSubmit={handleSubmit}>
        <Box>
          <Grid container spacing={2}>
            {value === "banktransfer" && (
              <>
                <TextFieldGrid
                  // label="Deposit From (Account Number)"
                  placeholder="Deposit From Account Number"
                  value={bankSender}
                  onChange={setBankSender}
                />
                <SelectGrid
                  // label="Deposit To"
                  options={bankDetails}
                  value={depositTo}
                  onChange={setDepositTo}
                />
                <TextFieldGrid
                  label="Transaction Id"
                  placeholder="Transaction Id"
                  value={reference}
                  onChange={setReference}
                />
              </>
            )}
            <TextFieldGrid
              // label="Enter Amount"
              placeholder="Enter amount"
              value={amount}
              onChange={setAmount}
              type="number"
            />
            {value !== "banktransfer" && (
              <TextFieldGrid
                // label="Reference"
                placeholder="Reference"
                value={reference}
                onChange={setReference}
              />
            )}
            <FileInputGrid onChangeFile={onChangeFile} />
          </Grid>
          <Box sx={{ width: { xs: "100%", sm: "60%", md: "35%" }, mt: 5 }}>
            <Grid sx={{ display: "flex", alignItems: "end", my: 3 }}>
              <Button
                type="submit"
                sx={{
                  fontSize: "14px",
                  textTransform: "capitalize",
                  borderRadius: "31px",
                  background: "#444542",
                  color: "var(--white)",
                  width: "100%",
                  "&:hover": {
                    background: "#444542",
                    color: "var(--white)",
                  },
                }}
              >
                {isLoading ? (
                  "Send Deposit Request"
                ) : (
                  <CircularProgress
                    size="1.5rem"
                    sx={{
                      color: "#fff",
                    }}
                  />
                )}
              </Button>
            </Grid>
          </Box>
        </Box>
      </form>
      {value === "banktransfer" && (
        <Box my={5}>
          <Button
            sx={{
              width: { xs: "100%", sm: "60%", md: "35%" },
              borderRadius: "31px",
              background: "var(--gray)",
              color: "var(--secondary-color)",
              padding: "5px 10px",
              textTransform: "capitalize",
            }}
            onClick={handleOpen}
          >
            Show All Bank Account
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CashTab;
