import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Modal,
  Pagination,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import commaNumber from "comma-number";
import { format } from "date-fns";
import Loader from "../../../images/loader/Render.gif";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
// import ReactPDF from "@react-pdf/renderer";
import NoData from "../../../Common/NoData";
import Header from "../../Header/Header";

const Others = () => {
  const users = secureLocalStorage.getItem("user-info");
  let agentId = users?.user?.agentId;
  let staffId = users?.user?.staffId;
  const [allData, setAllData] = useState([]);
  const [others, setOthers] = useState([]);
  const [item, setItem] = useState({});
  const [loaded, setLoaded] = useState(false);

  //todo: states for attachment view
  const [viewAttchment, setViewAttchment] = useState(false);
  const openAttchment = () => setViewAttchment(true);
  const closeAttchment = () => setViewAttchment(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 500,
    p: 5,
    backgroundColor: "#fff",
    borderRadius: "10px",
  };
  //todo: end of attachment view
  // todo:Sets the state of the const for the given page and state.
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState("20");

  useEffect(() => {
    setLoaded(true);
    let url = `demo`;
    // let url = `https://api.flyjatt.com/v1/Queues/Booking.php?agentId=${agentId}&allother`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoaded(false);
        const count = data.length;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
        setAllData(data);
        setOthers(data);
      });
  }, [agentId, size]);

  //todo: handle view Attachments

  //todo: Handle a page change.
  const handlePageChange = (event, value) => {
    setPage(value);
    setOthers(allData?.slice((value - 1) * size, value * size));
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  //todo: convert first character uppercase
  const firstCharUpper = (text) => {
    let lowerCaseText = text?.toLowerCase()?.trim()?.split(" ");
    for (const n of lowerCaseText) {
      return n.replace(n[0], n[0].toUpperCase());
    }
  };

  //todo: handle searchItem
  const handelSearchItems = (e) => {
    let searchInput = e.target.value;

    if (searchInput !== "") {
      const filterData = allData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setOthers(filterData);
    } else if (searchInput === "") {
      setOthers(allData);
    }
  };
  //todo: end of handle searchItem
  //todo: handle search value
  const handleChangeOption = (e) => {
    const optionValue = e.target.value;
    if (optionValue !== "") {
      const filterData = allData.filter(
        (item) => item.serviceType.toLowerCase() === optionValue.toLowerCase()
      );
      setOthers(filterData);
    } else {
      setOthers(allData);
    }
  };
  //todo:end of handle search value

  //todo: loader

  if (loaded) {
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

  return (
    <>
      <Box className={"q-box"}>
        <Header />
        <Container className="queues-parent" sx={{ mt: 2 }}>
          {Object.keys(allData).length !== 0 ? (
            <Box>
              <Box style={{ overflowX: "auto" }} className="deposite-tables">
                <table className="deposite-table" width="100%">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Reference No</th>
                      <th>Description</th>
                      <th>Service Type</th>
                      <th>Created Time</th>
                      <th>Amount</th>
                      <th>Attachment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {others?.slice(0, size)?.map((item, index) => (
                      <tr key={index}>
                        <td>{item?.serial || "No"}</td>
                        <td>{item?.reference || "Reference No"}</td>

                        <td>
                          {item?.description ? (
                            <Tooltip
                              title={
                                <Typography
                                  variant="subtitle2"
                                  style={{ fontSize: "12px" }}
                                >
                                  {item?.description}
                                </Typography>
                              }
                            >
                              <Typography
                                variant="subtitle2"
                                style={{ fontSize: "12px" }}
                              >
                                {item?.description.slice(0, 40)}...
                              </Typography>
                            </Tooltip>
                          ) : (
                            "Description"
                          )}
                        </td>
                        <td>{item?.serviceType || "Service Type"}</td>

                        <td>
                          {item.createdAt
                            ? format(
                                new Date(item?.createdAt),
                                "dd MMM yy hh:mm a"
                              )
                            : "Created By"}
                        </td>
                        <td>
                          {item?.amount
                            ? `${commaNumber(item?.amount)} PKR`
                            : "Amount"}
                        </td>
                        <td>
                          <button
                            style={{
                              width: "50%",
                              height: "100%",
                              background: "#d3143c",
                              color: "#fff",
                              padding: "5px",
                              border: "none",
                              borderRadius: "3px",
                              textTransform: "uppercase",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              if (item.attachment.endsWith(".pdf")) {
                                window.open(item?.attachment);
                              } else {
                                openAttchment();
                              }
                              setItem(item);
                            }}
                          >
                            view
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>

              {allData.length > size ? (
                <Grid container>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box
                      sx={{
                        width: "100%",
                        my: 3,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Stack spacing={2}>
                        <Pagination
                          count={pageCount}
                          onChange={handlePageChange}
                          shape="rounded"
                        />
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              ) : null}
            </Box>
          ) : (
            <>
              <NoData />
            </>
          )}
        </Container>
      </Box>
      <Modal open={viewAttchment} onClose={closeAttchment}>
        <Box sx={style}>
          {item?.attachment ? (
            <img
              src={item?.attachment}
              alt="..."
              style={{
                width: "100%",
                height: "100%",
                // objectFit: "cover",
                overflow: "hidden",
                borderRadius: "10px",
              }}
            />
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Others;
