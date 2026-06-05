import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import "./FileUploadSection.css";

const FileUploadSection = ({ handleCloseUpdateModal, passengerData }) => {
  const navigate = useNavigate();
  const [updateDocument, setUpdateDocument] = useState(passengerData);
  // const [selectedImages, setSelectedImages] = useState([]);

  const handleUpdateDocument = (index, paxId, fileName) => {
    const e = window.event;
    const field = e.target.name;
    const value = e.target.files[0];
    const newDocument = updateDocument.map((i, ind) => {
      if (ind === index) {
        i[field] = value;
        i[`${field}Preview`] = URL.createObjectURL(value);
      }
      return i;
    });
    setUpdateDocument(newDocument);

    let url = `${import.meta.env.REACT_APP_API_URL}/agent/passenger/upload/${fileName}/${paxId}`;
    const formData = new FormData();
    formData.append("file", value);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      axios.post(url, formData, config).then((res) => {
        if (res.data.status === "success") {
          const tempData = [...updateDocument];
          tempData[index] = {
            ...updateDocument[index],
            [field]: value,
            [`${field}ErrMsg`]: res.data.status,
          };
          setUpdateDocument(tempData);
        } else {
          const tempData = [...updateDocument];
          tempData[index] = {
            ...updateDocument[index],
            [field]: value,
            [`${field}ErrMsg`]: res.data.status,
          };
          setUpdateDocument(tempData);
        }
      });
    } catch (err) {
      console.error(err.message);
    }
    // FOR BUG IN CHROME
    e.target.value = "";
  };
  const handleDocumentSubmit = (e) => {
    e.preventDefault();
  };

  function deleteHandler(field, value, index) {
    const newDocument = updateDocument.map((i, ind) => {
      if (ind === index) {
        i[field] = "";
      }
      return i;
    });
    setUpdateDocument(newDocument);
  }

  return (
    <Box className="update-document" sx={{ width: "100%" }}>
      <Typography
        style={{ fontSize: "20px", color: "#d3143c", fontWeight: "bold" }}
      >
        Passenger Upload Document
      </Typography>
      <form onSubmit={handleDocumentSubmit}>
        <Box
          sx={{
            width: { xs: "80vw", sm: "50vw", md: "40vw" },
            minHeight: "20vh",
            maxHeight: "60vh",
            overflowY: "auto",
          }}
        >
          {passengerData.map((item, index) => (
            <Box
              sx={{
                fontSize: 14,
                mt: 1,
              }}
            >
              <Box pl={1}>
                Name: {`${item?.prefix} ${item.givenname} ${item.surname}`}
              </Box>

              <Grid container>
                <Grid
                  item
                  xs={6}
                  sx={{
                    p: 1,
                  }}
                >
                  <Box mb={1} sx={{ fontSize: 12 }}>
                    Passport or NID Copy
                  </Box>
                  <Box
                    sx={{
                      position: "relative",
                      height: "100px",
                      border: "dotted 1px #9999",
                      padding: "5px",
                    }}
                  >
                    <label
                      htmlFor={`passportCopy${index}`}
                      style={{
                        backgroundColor: "transparent",
                        color: "#999",
                        fontsize: "8px",
                        position: "relative",
                        display: "inline-block",
                        height: "100%",
                        width: "100%",
                        textAlign: "center",
                        verticalAlign: "middle",
                        lineHeight: "100%",
                      }}
                    >
                      <input
                        type="file"
                        name="passportCopy"
                        id={`passportCopy${index}`}
                        accept="image/*"
                        onChange={() =>
                          handleUpdateDocument(index, item.uid, "passport")
                        }
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "none",
                        }}
                      />

                      <img
                        src={
                          updateDocument[index].passportCopyPreview ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        }
                        alt="..."
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </label>
                    <Typography
                      variant="caption text"
                      style={{ position: "absolute", top: "100%", left: "0" }}
                    >
                      {updateDocument[index].passportCopy !== "" ? (
                        updateDocument[index].passportCopyErrMsg ? (
                          updateDocument[index].passportCopyErrMsg ===
                          "success" ? (
                            <Typography
                              variant="caption text"
                              style={{
                                color: "green",
                                fontWeight: "bold",
                                position: "absolute",
                                top: "100%",
                                left: "0",
                              }}
                            >
                              Uploaded
                            </Typography>
                          ) : (
                            <Typography
                              variant="caption text"
                              style={{
                                color: "red",
                                fontWeight: "bold",
                                position: "absolute",
                                top: "100%",
                                left: "0",
                              }}
                            >
                              Error
                            </Typography>
                          )
                        ) : null
                      ) : null}
                    </Typography>
                    <CancelIcon
                      style={{
                        position: "absolute",
                        top: "-10px",
                        left: "-10px",
                      }}
                      onClick={() =>
                        deleteHandler(
                          "passportCopyPreview",
                          updateDocument[index].passportCopyPreview,
                          index
                        )
                      }
                    />
                  </Box>
                </Grid>
                {/* <Grid
                  item
                  xs={6}
                  sx={{
                    p: 1,
                  }}
                >
                  <Box mb={1} sx={{ fontSize: 12 }}>
                    Visa Copy
                  </Box>
                  <Box
                    sx={{
                      position: 'relative',
                      height: '100px',
                      border: 'dotted 1px #9999',
                      padding: '5px',
                    }}
                  >
                    <label
                      htmlFor={`visaCopy${index}`}
                      style={{
                        backgroundColor: 'transparent',
                        color: '#999',
                        fontsize: '8px',
                        position: 'relative',
                        display: 'inline-block',
                        height: '100%',
                        width: '100%',
                      }}
                    >
                      <input
                        name="visaCopy"
                        id={`visaCopy${index}`}
                        type="file"
                        accept="image/*"
                        onChange={() =>
                          handleUpdateDocument(index, item.uid, 'visa')
                        }
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'none',
                        }}
                      />
                      <img
                        src={
                          updateDocument[index].visaCopyPreview ||
                          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                        }
                        alt="..."
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </label>
                    <Typography
                      variant="caption text"
                      style={{ position: 'absolute', top: '100%', left: '0' }}
                    >
                      {updateDocument[index].visaCopy !== '' ? (
                        updateDocument[index].visaCopyErrMsg ? (
                          updateDocument[index].visaCopyErrMsg === 'success' ? (
                            <Typography
                              variant="caption text"
                              style={{
                                color: 'green',
                                fontWeight: 'bold',
                                position: 'absolute',
                                top: '100%',
                                left: '0',
                                mb: 3,
                              }}
                            >
                              Uploaded
                            </Typography>
                          ) : (
                            <Typography
                              variant="caption text"
                              style={{
                                color: 'red',
                                fontWeight: 'bold',
                                position: 'absolute',
                                top: '100%',
                                left: '0',
                              }}
                            >
                              Error
                            </Typography>
                          )
                        ) : null
                      ) : null}
                    </Typography>
                    <CancelIcon
                      style={{
                        position: 'absolute',
                        top: '-10px',
                        left: '-10px',
                      }}
                      onClick={() =>
                        deleteHandler(
                          'visaCopyPreview',
                          updateDocument[index].visaCopyPreview,
                          index
                        )
                      }
                    />
                  </Box>
                </Grid> */}
              </Grid>
            </Box>
          ))}
        </Box>
        <Grid container rowSpacing={0} mt={3}>
          <Grid item lg={12} md={12} xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => {
                  handleCloseUpdateModal();
                  navigate(0);
                }}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#d3143c",
                  color: "#fff",
                  borderRadius: "5px",
                }}
              >
                Upload
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default FileUploadSection;
