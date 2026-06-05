import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const BankaData = () => {
  // const users = secureLocalStorage.getItem('user-info');
  // let agentID = users?.user?.agentId;

  const [depositData, setDepositData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.REACT_APP_API_URL}/Deposit`)
      .then((res) => res.json())
      .then((data) => {
        const BankaDataFilter = data?.data?.filter(
          (data) => data?.paymentway === "Bank"
        );
        setDepositData(BankaDataFilter);
      });
  });
  return (
    <Box>
      <Box
        sx={{
          my: "10px",
          table: {
            borderCollapse: "collapse",
            width: "100%",
            fontSize: "12px",
          },
          th: {
            padding: "12px 8px",
            fontWeight: "500",
            background: "var(--primary-color)",
            color: "var(--white)",
            fontSize: "14px",
          },
          "td,th": {
            border: "1px solid #ddd",
            padding: "8px",
            textAlign: "center",
          },
          "tr:nth-child(even)": {
            background: "#f2f2f2",
          },
          "tr:hover": {
            background: "#ddd",
          },
        }}
      >
        <table>
          <tr>
            <th>ReferenceId</th>
            <th>Status</th>
            <th>Type </th>
            <th>Amount</th>
            <th>Date</th>
            <th>Attachment</th>
            <th>Remarks</th>
          </tr>
          <tbody>
            {depositData?.map((data) => (
              <tr>
                <td>{data?.ref}</td>
                <td>
                  {data?.status ? (
                    <button
                      style={{
                        border: "none",
                        borderRadius: "5px",
                        width: "100%",
                      }}
                      className={`${data?.status
                        ?.toLowerCase()
                        ?.split(" ")
                        ?.join("-")}-btn"}
                    >
                      {data?.status}
                    </button>
                  ) : (
                    "Status"
                  )}
                </td>
                <td>{data?.paymentway}</td>
                <td>{data?.amount}</td>
                <td> {data?.created_at}</td>
                <td>
                  <a href={data?.attachment} target="_blank" rel="noreferrer">
                    View
                  </a>
                </td>
                <td> {data?.remarks === "" ? "N/A" : data?.remarks} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default BankaData;
