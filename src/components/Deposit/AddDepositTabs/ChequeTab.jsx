import { Box, Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import getAuthToken from "../../../Token/getAuthToken";

const ChequeTab = () => {
  const navigate = useNavigate();
  const token = getAuthToken();
  const [isLoading, setIsLoading] = useState(true);
  const [chequeNumber, setChequeNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [file, setFile] = useState("");
  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(false);
    const formData = new FormData();
    formData.append("file", file);

    try {
      let res = await axios.post(
        // `https://api.flyjatt.com/v1/Deposit/addDeposit.php?sender=&receiver=&way=Cheque&method=${bankName}&transactionId=${chequeNumber}&amount=${amount}&ref=${reference}&staffId=&ckDate=${new Date(
        //   date
        // ).toLocaleString("sv")}",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Deposit Successfully!",
          html: `For any query.Please contact us at <strong> support@aatrips.pk</strong> or Call <strong> +8801409965900 </strong>`,
          button: "Done!",
        }).then(function () {
          setIsLoading(true);
          navigate("/deposite");
        });
      } else {
        Swal({
          icon: "error",
          title: "Deposit Failed!",
          html: `For any query.Please contact us at <strong> support@aatrips.pk</strong> or Call <strong> +8801409965900 </strong>`,
          button: "Done!",
        }).then(function () {
          setIsLoading(true);
          navigate("/deposite");
        });
      }
    } catch (err) {
      Swal({
        icon: "error",
        title: "Deposit Failed!",
        html: `For any query.Please contact us at <strong> support@aatrips.pk</strong> or Call <strong> +8801409965900 </strong>`,
        button: "Done!",
      }).then(function () {
        setIsLoading(true);
        navigate("/deposite");
      });
    }
    e.target.reset();
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box className="passengerInput1">
          <Grid container spacing={4}>
            <Grid item md={4}>
              <Typography>Cheque Number</Typography>
              <Box style={{ marginTop: "5px" }}>
                <input
                  require
                  type="text"
                  placeholder="Check Number"
                  onChange={(e) => setChequeNumber(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item md={4}>
              <Typography>Bank Name</Typography>
              <Box style={{ marginTop: "5px" }}>
                <input
                  require
                  type="text"
                  placeholder="Bank Name"
                  onChange={(e) => setBankName(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item md={4}>
              <Typography>Cheque Date</Typography>
              <Box style={{ marginTop: "5px" }}>
                <input
                  require
                  type="date"
                  placeholder="Date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item md={4}>
              <Typography>Amount</Typography>
              <Box style={{ marginTop: "5px" }}>
                <input
                  require
                  type="text"
                  placeholder="Amount"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item md={4}>
              <Typography>Reference</Typography>
              <Box style={{ marginTop: "5px" }}>
                <input
                  require
                  type="text"
                  placeholder="Reference"
                  onChange={(e) => setReference(e.target.value)}
                />
              </Box>
            </Grid>

            <Grid item md={4}>
              <Typography>Choose Passport Copy</Typography>
              <Box style={{ marginTop: "5px" }} className="input-File1">
                <input
                  require
                  style={{
                    backgroundColor: "#2564B8",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    padding: "5px 10px",
                    boxSizing: "border-box",
                  }}
                  onChange={onChangeFile}
                  className="customFileType"
                  type="file"
                  title="Choose a Image png and jpg please"
                  accept="image/*"
                  required
                />

                {/*  

                */}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Button
          sx={{
            fontFamily: "poppins",
            fontWeight: "400",
            fontSize: "14px",
            textTransform: "capitalize",
            borderRadius: "2px",
            background: "#222222",
            color: "#FFFFFF",
            width: "370px",
            mt: "3rem",
            "&:hover": {
              backgroundColor: "#222222",
            },
          }}
          type="submit"
        >
          {isLoading ? (
            "Send Deposit Request"
          ) : (
            <CircularProgress
              size="1.5rem"
              sx={{ height: "30px", width: "30px" }}
            />
          )}
        </Button>
      </form>
    </Box>
  );
};

export default ChequeTab;
// <CircularProgress sx={{ height: "30px", width: "30px" }} />
