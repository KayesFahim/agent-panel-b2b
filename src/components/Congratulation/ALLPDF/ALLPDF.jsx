import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFPageDesign from "./PDFPageDesign";
import { Stack } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import PDFPageRedesign from "./PDFPageRedesign";

const AllPDF = ({ allData }) => {
  let bookingwp = `Booking with price`;
  let bookingwop = `Booking without price`;
  let eticketp = `e-Ticket with price `;
  let eticketwop = `e-Ticket without price `;
  const rootdata = allData?.bookingdata;
  // 

  return (
    <div className="pdf-ancortag">
      {rootdata?.status === "Hold" ||
        rootdata?.status === "Cancelled" ||
        rootdata?.status === "Issue In Process" ||
        rootdata?.status === "Issue Request Rejected" ? (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            justifyContent: "flex-end",
            marginLeft: 0,
          }}
        >
          <PDFDownloadLink
            document={
              <PDFPageRedesign
                copy="Booking Copy"
                check="1"
                allData={allData}
              />
            }
            fileName={bookingwp}
          >
            {({ blob, url, fileName, loading, error }) =>
              loading ? (
                "Loading document..."
              ) : (
                <a
                  href={fileName}
                  target="_blank"
                  style={{
                    display: "block",
                    width: "100%",
                    color: "#fff",
                    background: "var(--p2)",
                    cursor: "pointer",
                    textAlign: "center",
                    textDecoration: "none",
                    fontSize: "11px",
                    padding: "10px", // Adjust padding as needed
                    borderRadius: "5px",
                    boxSizing: "border-box", // Ensures padding does not affect the width
                  }}
                  rel="noreferrer"
                >
                  <PrintIcon sx={{ fontSize: 12 }} /> With&nbsp;Price
                </a>
              )
            }
          </PDFDownloadLink>
          <PDFDownloadLink
            document={
              <PDFPageRedesign
                copy="Booking Copy"
                check="2"
                allData={allData}
              />
            }
            fileName={bookingwop}
          >
            {({ blob, url, fileName, loading, error }) =>
              loading ? (
                "Loading document..."
              ) : (
                <a
                  href={fileName}
                  target="_blank"
                  style={{
                    display: "block",
                    width: "100%",
                    color: "#fff",
                    background: "var(--primary-color)",
                    cursor: "pointer",
                    textAlign: "center",
                    textDecoration: "none",
                    fontSize: "11px",
                    padding: "10px", // Adjust padding as needed
                    borderRadius: "5px",
                    boxSizing: "border-box", // Ensures padding does not affect the width
                  }}
                  rel="noreferrer"
                >
                  <PrintIcon sx={{ fontSize: 12 }} /> Without&nbsp;Price
                </a>
              )
            }
          </PDFDownloadLink>
        </Stack>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            justifyContent: "flex-end",
            marginLeft: 0,
          }}
        >
          <PDFDownloadLink
            document={
              <PDFPageRedesign copy="e - Ticket" check="1" allData={allData} />
            }
            fileName={eticketp}
          >
            {({ blob, url, fileName, loading, error }) =>
              loading ? (
                "Loading document..."
              ) : (
                <a
                  href={fileName}
                  target="_blank"
                  style={{
                    display: "block",
                    width: "100%",
                    color: "#fff",
                    background: "var(--primary-color)",
                    cursor: "pointer",
                    textAlign: "center",
                    textDecoration: "none",
                    fontSize: "11px",
                    padding: "10px", // Adjust padding as needed
                    borderRadius: "5px",
                    boxSizing: "border-box", // Ensures padding does not affect the width
                  }}
                  rel="noreferrer"
                >
                  <PrintIcon sx={{ fontSize: 12 }} /> With&nbsp;Price
                </a>
              )
            }
          </PDFDownloadLink>
          <PDFDownloadLink
            document={
              <PDFPageRedesign copy="e - Ticket" check="2" allData={allData} />
            }
            fileName={eticketwop}
          >
            {({ blob, url, fileName, loading, error }) =>
              loading ? (
                "Loading document..."
              ) : (
                <a
                  href={fileName}
                  target="_blank"
                  style={{
                    display: "block",
                    width: "100%",
                    color: "#fff",
                    background: "var(--primary-color)",
                    cursor: "pointer",
                    textAlign: "center",
                    textDecoration: "none",
                    fontSize: "11px",
                    padding: "10px", // Adjust padding as needed
                    borderRadius: "5px",
                    boxSizing: "border-box", // Ensures padding does not affect the width
                  }}
                  rel="noreferrer"
                >
                  <PrintIcon sx={{ fontSize: 12 }} /> Without&nbsp;Price
                </a>
              )
            }
          </PDFDownloadLink>
        </Stack>
      )}
    </div>
  );
};

export default AllPDF;
