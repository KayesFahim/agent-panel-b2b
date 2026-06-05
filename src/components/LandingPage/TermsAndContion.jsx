import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  IconButton,
} from "@mui/material";
import { TiInputChecked } from "react-icons/ti";
import LandingHeader from "./LandingHeader";
import Footer from "./Footer";
import CommonBreadCums from "./CommonBreadCums";
export const termsData = [
  {
    generalTerms: {
      title: "FUNDAMENTAL TERMS",
      content: [
        "Please take a moment to carefully review the following terms and conditions. Prior to making any bookings, please ensure you read and agree to our policies outlined below.",
        "All information provided on our booking platform must be truthful, accurate, and kept current. Our supplier reserves the right to cancel bookings without issuing refunds in cases where inaccurate information has been provided.",
        "Your account may be terminated at any time, with or without notice, if we determine that you have engaged in activities that violate these Terms, pose harm to our business, or adversely affect any other party through your use of the Service.",
      ],
    },
    aatripsPKServices: {
      title: "BOOKING",
      content: [
        "Please ensure that all customer information provided during booking is accurate, as changes to booked information may not be permitted there after.",
        "When we display Service Elements on our portal, we invite you to make an offer to purchase them. Your offer is only finalized upon clicking 'Book'.",
        "Upon availability of the relevant Service Element, your booking will be swiftly processed, and the contract for your booking is confirmed upon receipt of full payment.",
      ],
    },
    termsForProvidingServices: {
      title: "CANCELLATION",
      content: [
        "Please ensure you review the cancellation or amendment deadline, as well as any associated charges that may apply if changes are made after this deadline, before proceeding with your booking.",
      ],
    },
    booking: {
      title: "RE-ISSUE/ DATE CHANGE ",
      content: [
        "We adhere to airlines' policies regarding re-issuance and date changes. To modify your booking date or re-issue your ticket, please confirm with AATrips before your travel date. Failure to do so may result in a no-show charge, depending on the airline's regulations.",
      ],
    },
    refunds: {
      title: "REFUND",
      content: [
        "The credited amount will be allocated to the Agent ID in accordance with the airlines' regulations as specified on the issued air tickets. Deductions will apply based on the policies of banks and airlines.",
      ],
    },
    noShows: {
      title: "FLIGHT",
      content: [
        "Please be advised that requests for seats, meals, frequent flyer benefits, and other special services are subject to availability and considered requests only. The airline reserves the right to modify requested seat assignments without notice. All requests should be confirmed directly with the airline. We do not guarantee specific seat assignments or the confirmation of meal, frequent flyer benefits, or other special requests. It is recommended to contact the airline directly to confirm these details.",
        "For excess baggage on connecting flights involving multiple airlines, passengers may need to reclaim and recheck bags at connecting airports, potentially incurring additional fees assessed by each airline. Traveling light is advised to minimize these costs.",
        "Each airline has its own policies regarding schedule changes, which may occur due to operational requirements. Changes can be anticipated well in advance or on the day of travel.",
      ],
    },
    reIssueDateChange: {
      title: "HOTEL",
      content: [
        "Package rates apply within specified dates and room categories; changes to stay dates or room type may adjust rates. Rates exclude trade fairs, exhibitions, blackout periods, and special events, with potential for additional charges. Hotel details and photos are from suppliers; AATrips isn't liable for discrepancies due to supplier delays. Specific requests like bedding or non-smoking rooms depend on availability and require hotel confirmation. While efforts are made to accommodate requests, neither AATrips nor hotels guarantee fulfillment. Confirm details directly with hotels when booking.",
      ],
    },
    refund: {
      title: "VISA",
      content: [
        "AATrips facilitates visa processing for all the top destinations globally. For locations where personal submission is required, we handle all paperwork on behalf of our clients. While clients must attend embassy interviews themselves if necessary, we cannot guarantee visa approval as it solely depends on the embassy's decision.",
      ],
    },
    ratesCurrency: {
      title: "MODIFICATIONS OF TERMS OF USE",
      content: [
        "AATrips reserves the right to modify the terms, conditions, and notifications governing the AATrips website, including charges related to its usage. We encourage you to stay updated by regularly reviewing these terms and conditions.",
      ],
    },
    onwardSales: {
      title: "HAVE QUERIES ABOUT OF TERMS AND CONDITIONS?",
      content: [
        "For any inquiries or issues regarding these Terms or assistance needed regarding access to the Site or AATrips services, please feel free to reach out to our Customer Service department at support@aatrips.pk. We're here to help.",
      ],
    },
  },
];
export default function TermsAndContion() {
  return (
    <>
      <Box sx={{ my: 4, py: 8 }}>
        <LandingHeader />
        <CommonBreadCums title="Terms and Conditions" />

        <Box
          sx={{
            maxWidth: "1300px",
            mx: "auto",
            mt: 8,
          }}
        >
          {termsData.map((section, index) => (
            <Box key={index} sx={{ mb: 4, px: 2 }}>
              <Typography
                variant="h4"
                sx={{ fontSize: "18px", fontWeight: 600, py: 1 }}
              >
                {section.generalTerms.title}
              </Typography>

              <List sx={{ mb: 2 }}>
                {section.generalTerms.content.map((item, idx) => (
                  <ListItem
                    key={idx}
                    sx={{ display: "flex", alignItems: "start" }}
                  >
                    <IconButton sx={{ color: "#1A3A6E", fontSize: "25px" }}>
                      <TiInputChecked />
                    </IconButton>

                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>

              <Typography
                variant="h4"
                sx={{ fontSize: "18px", fontWeight: 600, py: 1 }}
              >
                {section.aatripsPKServices.title}
              </Typography>
              <List sx={{ mb: 2 }}>
                {section.aatripsPKServices.content.map((item, idx) => (
                  <ListItem
                    key={idx}
                    sx={{ display: "flex", alignItems: "start" }}
                  >
                    <IconButton sx={{ color: "#1A3A6E", fontSize: "25px" }}>
                      <TiInputChecked />
                    </IconButton>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>

              <Typography
                variant="h4"
                sx={{ fontSize: "18px", fontWeight: 600, py: 1 }}
              >
                {section.termsForProvidingServices.title}
              </Typography>

              <List sx={{ mb: 2 }}>
                {section.termsForProvidingServices.content.map((item, idx) => (
                  <ListItem
                    key={idx}
                    sx={{ display: "flex", alignItems: "start" }}
                  >
                    <IconButton sx={{ color: "#1A3A6E", fontSize: "25px" }}>
                      <TiInputChecked />
                    </IconButton>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>

              <Typography
                variant="h4"
                sx={{ fontSize: "18px", fontWeight: 600, py: 1 }}
              >
                {section.booking.title}
              </Typography>
              <List sx={{ mb: 2 }}>
                {section.booking.content.map((item, idx) => (
                  <ListItem
                    key={idx}
                    sx={{ display: "flex", alignItems: "start" }}
                  >
                    <IconButton sx={{ color: "#1A3A6E", fontSize: "25px" }}>
                      <TiInputChecked />
                    </IconButton>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>

              <Typography
                variant="h4"
                sx={{ fontSize: "18px", fontWeight: 600, py: 1 }}
              >
                {section.refunds.title}
              </Typography>
              <List sx={{ mb: 2 }}>
                {section.refunds.content.map((item, idx) => (
                  <ListItem key={idx} disablePadding>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>

              <Typography
                variant="h4"
                sx={{ fontSize: "18px", fontWeight: 600, py: 1 }}
              >
                {section.noShows.title}
              </Typography>
              <List sx={{ mb: 2 }}>
                {section.noShows.content.map((item, idx) => (
                  <ListItem
                    key={idx}
                    sx={{ display: "flex", alignItems: "start" }}
                  >
                    <IconButton sx={{ color: "#1A3A6E", fontSize: "25px" }}>
                      <TiInputChecked />
                    </IconButton>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>

              <Typography
                variant="h4"
                sx={{ fontSize: "18px", fontWeight: 600, py: 1 }}
              >
                {section.reIssueDateChange.title}
              </Typography>
              <List sx={{ mb: 2 }}>
                {section.reIssueDateChange.content.map((item, idx) => (
                  <ListItem key={idx} disablePadding>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>

              <Typography
                variant="h4"
                sx={{ fontSize: "18px", fontWeight: 600, py: 1 }}
              >
                {section.refund.title}
              </Typography>
              <List sx={{ mb: 2 }}>
                {section.refund.content.map((item, idx) => (
                  <ListItem key={idx} disablePadding>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>

              <Typography
                variant="h4"
                sx={{ fontSize: "18px", fontWeight: 600, py: 1 }}
              >
                {section.ratesCurrency.title}
              </Typography>
              <List sx={{ mb: 2 }}>
                {section.ratesCurrency.content.map((item, idx) => (
                  <ListItem key={idx} disablePadding>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>

              <Typography
                variant="h4"
                sx={{ fontSize: "18px", fontWeight: 600, py: 1 }}
              >
                {section.onwardSales.title}
              </Typography>
              <List sx={{ mb: 2 }}>
                {section.onwardSales.content.map((item, idx) => (
                  <ListItem key={idx} disablePadding>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </Box>
      </Box>
      <Footer />
    </>
  );
}
