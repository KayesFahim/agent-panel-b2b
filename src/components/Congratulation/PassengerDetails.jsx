import React, { useState } from "react";
import { Box, Modal, Typography, Chip, Button } from "@mui/material";
import { format } from "date-fns";
import VisibilityIcon from "@mui/icons-material/Visibility";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

const PassengerDetails = ({ allData }) => {
  const [imgOpen, setImgOpen] = useState(false);
  const [selectImg, setSelectImg] = useState(null);
  const handleView = (img) => {
    setSelectImg(img);
    setImgOpen(true);
  };

  const passengerdata = allData?.passengerdata || [];
  const farePolicy = allData?.bookingdata?.itenary?.FarePolicy;

  return (
    <Box sx={{ mb: 1 }}>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 700,
          color: "var(--neutral-800)",
          mb: 2,
          display: "flex",
          alignItems: "center",
          gap: 1
        }}
      >
        👥 Passenger Details
      </Typography>
      <Box
        className="table-wrapper"
        sx={{
          overflowX: "auto",
          borderRadius: "8px",
          border: "1px solid var(--neutral-200)",
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#cbd5e1",
            borderRadius: "4px",
          },
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", borderSpacing: 0 }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>DOB</th>
              <th style={tableHeaderStyle}>Gender</th>
              <th style={tableHeaderStyle}>Passport</th>
              <th style={tableHeaderStyle}>P. Expire Date</th>
              {farePolicy !== "domestic" && (
                <th style={tableHeaderStyle}>Documents</th>
              )}
            </tr>
          </thead>
          <tbody>
            {passengerdata.map((traveler, index) => {
              const formattedGender = traveler?.gender
                ? traveler.gender.split("_")[1] || traveler.gender
                : "N/A";
              
              return (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8fafc",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  {/* Name + Pax Type Badge */}
                  <td style={{ ...tableCellStyle, textAlign: "left", fontWeight: 600, color: "var(--neutral-800)" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
                        {`${traveler?.prefix || ""} ${traveler?.givenname || ""} ${traveler?.surname || ""}`}
                      </Typography>
                      <Chip
                        label={traveler?.type === "ADT" ? "Adult" : traveler?.type === "INF" ? "Infant" : "Child"}
                        size="small"
                        sx={{
                          height: "18px",
                          fontSize: "10px",
                          fontWeight: 700,
                          bgcolor: traveler?.type === "ADT" ? "rgba(4,135,199,0.08)" : traveler?.type === "INF" ? "rgba(245,158,11,0.08)" : "rgba(99,102,241,0.08)",
                          color: traveler?.type === "ADT" ? "var(--primary-color)" : traveler?.type === "INF" ? "#d97706" : "#6366f1",
                          border: traveler?.type === "ADT" ? "1px solid rgba(4,135,199,0.2)" : traveler?.type === "INF" ? "1px solid rgba(245,158,11,0.2)" : "1px solid rgba(99,102,241,0.2)",
                        }}
                      />
                    </Box>
                  </td>

                  {/* DOB */}
                  <td style={tableCellStyle}>
                    {traveler?.dob
                      ? format(new Date(traveler.dob), "dd MMM yyyy")
                      : "N/A"}
                  </td>

                  {/* Gender */}
                  <td style={tableCellStyle}>
                    <Chip
                      label={formattedGender}
                      size="small"
                      sx={{
                        height: "20px",
                        fontSize: "11px",
                        fontWeight: 500,
                        bgcolor: formattedGender?.toLowerCase() === "male" ? "rgba(4,135,199,0.05)" : "rgba(236,72,153,0.05)",
                        color: formattedGender?.toLowerCase() === "male" ? "var(--primary-color)" : "#ec4899",
                      }}
                    />
                  </td>

                  {/* Passport */}
                  <td style={tableCellStyle}>
                    {farePolicy === "domestic" ? (
                      <span style={{ color: "var(--neutral-400)", fontStyle: "italic", fontSize: "12px" }}>Domestic Flight</span>
                    ) : (
                      traveler?.document?.toUpperCase() || "N/A"
                    )}
                  </td>

                  {/* Passport Expire Date */}
                  <td style={tableCellStyle}>
                    {farePolicy === "domestic" ? (
                      <span style={{ color: "var(--neutral-400)", fontStyle: "italic", fontSize: "12px" }}>Domestic Flight</span>
                    ) : traveler?.expiredate ? (
                      format(new Date(traveler.expiredate), "dd MMM yyyy")
                    ) : (
                      "N/A"
                    )}
                  </td>

                  {/* Document View Action */}
                  {farePolicy !== "domestic" && (
                    <td style={tableCellStyle}>
                      {traveler?.passport ? (
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<VisibilityIcon sx={{ fontSize: "14px !important" }} />}
                          onClick={() => handleView(traveler.passport)}
                          sx={{
                            fontSize: "11px",
                            py: 0.3,
                            px: 1.2,
                            textTransform: "none",
                            borderRadius: "6px",
                            color: "var(--p2)",
                            borderColor: "var(--p2)",
                            "&:hover": {
                              borderColor: "var(--p2)",
                              bgcolor: "rgba(4,135,199,0.05)",
                            }
                          }}
                        >
                          View
                        </Button>
                      ) : (
                        <span style={{ color: "var(--neutral-400)" }}>N/A</span>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>

      {/* Passport Modal */}
      <Modal open={imgOpen} onClose={() => setImgOpen(false)}>
        <Box sx={{ ...modalStyle, maxWidth: { xs: "90%", sm: "80vw", md: "50vw" } }}>
          {selectImg !== null ? (
            <img
              src={selectImg}
              alt="Passport / NID / Visa Copy"
              style={{
                maxWidth: "100%",
                maxHeight: "60vh",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          ) : (
            <Typography sx={{ color: "var(--neutral-500)", textAlign: "center" }}>No File Uploaded</Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

const tableHeaderStyle = {
  fontSize: "12px",
  padding: "12px 16px",
  textAlign: "center",
  fontWeight: 600,
  color: "var(--neutral-600)",
  whiteSpace: "nowrap",
};

const tableCellStyle = {
  padding: "12px 16px",
  fontSize: "13px",
  color: "var(--neutral-600)",
  textAlign: "center",
  whiteSpace: "nowrap",
};

export default PassengerDetails;
