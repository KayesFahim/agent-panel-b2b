/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bkash from "../../images/logo/bkash.png";
import { Box } from "@mui/material";
import getAuthToken from "../../Token/getAuthToken";
import TokenDecrypt from "../../Token/TokenDecrypt";
import Swal from "sweetalert2";
const PayWithBkash = () => {
  const token = getAuthToken();
  const tokenise = TokenDecrypt();

  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState({
    amount: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setTransactionData({
      ...transactionData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const url = `${import.meta.env.REACT_APP_API_URL}/pgw/bkash/${parseInt(
      transactionData?.amount
    )}/${tokenise?.uid}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to make the payment");
      }

      const responseData = await response.json();

      if (responseData) {
        window.location.href = responseData?.bkashURL;
        setTimeout(() => setIsLoading(false), 10000);
        setTransactionData({
          ...transactionData,
          amount: 0,
        });
        e.target.reset();
      }
    } catch (error) {
      console.error("Error making payment:", error);
      Swal.fire({
        title: "Error",
        html: error.message,
        confirmButtonColor: "#dc143c",
        confirmButtonText: "Ok",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            padding: "50px",
            borderRadius: "10px",
          }}
        >
          <div>
            <label
              htmlFor="amount"
              style={{
                display: "block",
                marginBottom: "10px",
              }}
            >
              Deposited Amount{" "}
            </label>
            <input
              required
              type="number"
              id="amount"
              name="amount"
              value={transactionData?.amount}
              placeholder="Payable Amount"
              onChange={handleOnChange}
              style={{
                width: "280px",
                padding: "9px 15px",
                borderRadius: "5px",
                border: "none",
                // backgroundColor: 'var(--primary-rgb)',
                outline: "1px solid var(--primary-color)",
              }}
            />
            <Box sx={{ fontSize: 10, color: "var(--red)" }}>
              {parseInt(transactionData?.amount || 0) < 90
                ? "*The minimum deposit amount is 100Tk."
                : ""}
            </Box>
          </div>
          {parseInt(transactionData?.amount || 0) > 99 ? (
            <button
              style={{
                marginTop: "20px",
                width: "100%",
                borderRadius: "5px",
                border: "1px solid var(--primary-color)",
                color: "var(--primary-color)",
                backgroundColor: "var(--primary-rgb)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              type="submit"
              disabled={isLoading ? true : false}
            >
              <img src={bkash} alt="bkash" style={{ height: 35 }} />
              &nbsp;&nbsp;&nbsp;
              {isLoading ? "Processing..." : "Pay With Bkash"}
            </button>
          ) : (
            <Box
              style={{
                marginTop: "20px",
                width: "100%",
                borderRadius: "5px",
                border: "1px solid var(--primary-color)",
                color: "var(--primary-color)",
                backgroundColor: "var(--primary-rgb)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
              }}
            >
              <img src={bkash} alt="bkash" style={{ height: 35 }} />
              &nbsp;&nbsp;&nbsp;
              {isLoading ? "Processing..." : "Pay With Bkash"}
            </Box>
          )}
        </div>
      </form>
    </div>
  );
};

export default PayWithBkash;
