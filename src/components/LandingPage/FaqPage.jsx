import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommonBreadCums from "./CommonBreadCums";
import LandingHeader from "./LandingHeader";
import Footer from "./Footer";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
const FaqPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const faqs = [
    {
      question: "01. What services can I get from AATrips?",
      answer: `You can get Air Tickets, Hotel Booking, Umrah packages, Holiday 
packages and Visa processing services from us.`,
    },
    {
      question: "02. Can I buy Air Tickets with Cheapest fare From AATrips? ",
      answer: `Yes, you can buy Air Tickets with the cheapest fares from us.`,
    },
    {
      question: "03. What is the process of cancelling a purchased ticket?",
      answer: `You have to send an email to AATrips reservation (support@aatrips.pk) with 
a request to cancel the ticket. Then the reservation will take necessary action and send a 
reply with proper documents.`,
    },
    {
      question: "04. What is the process to refund a ticket?",
      answer: `You have to send an email to AATrips reservation team (support@aatrips.pk) 
with a request to refund the ticket. Then the reservation will check with the airlines and take 
necessary action accordingly with the specific airline policy and send a reply to the agent with 
proper documents.`,
    },
    {
      question: "05. What kind of payment do you accept?",
      answer: `We accept all kinds of payment methods approved and authorized by the 
State Bank of Pakistan. You can choose any payment methods from VISA, MASTER CARD, 
Easypaisa, JazzCash, and even bank transfer.`,
    },
    // Add more FAQ items here if needed
  ];
  return (
    <>
      <LandingHeader />
      <Box sx={{ my: 4, py: 8 }}>
        <CommonBreadCums title="FAQ" />
      </Box>

      <Container>
        <Box mt={2}>
          <Typography sx={{ fontSize: "26px", fontWeight: 600 }}>
            Frequently Ask Question
          </Typography>
          <Box
            sx={{ height: "3px", bgcolor: "#ED5A2B", mb: 3, width: "280px" }}
          ></Box>
          {faqs.map((faq, index) => (
            <Accordion key={index} sx={{ bgcolor: "#0487C7" }}>
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      bgcolor: "white",
                      borderRadius: "5px",
                      fontSize: "35px",
                      color: "#0487C7",
                    }}
                  />
                }
                aria-controls={`panel${index}a-content`}
                id={`panel${index}a-header`}
                sx={{
                  p: 2,
                  "&.css-1nqntxi-MuiButtonBase-root-MuiAccordionSummary-root": {
                    bgColor: "blue",
                  },
                }}
              >
                <Typography sx={{ color: "white" }}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: "#122E55" }}>
                <Typography
                  sx={{
                    display: "flex",

                    color: "white",
                    ml: { md: 2 },
                  }}
                >
                  <KeyboardReturnIcon sx={{ rotate: "180deg", mr: 1 }} />
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
          {/* Add more Accordion items here if needed */}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default FaqPage;
