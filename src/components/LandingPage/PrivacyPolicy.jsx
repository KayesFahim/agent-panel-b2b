import React from "react";
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
} from "@mui/material";
import {
  Info,
  Security,
  Share,
  DataUsage,
  Storage,
  AccountBox,
  Cookie,
  Language,
  Update,
  ContactSupport,
  Email,
  Phone,
  LocationOn,
  Payment,
  FlightTakeoff,
  DevicesOther,
  EventNote,
  Support,
  Person,
  Campaign,
  TrendingUp,
  Flight,
  Business,
  Gavel,
  Lock,
  Visibility,
  Edit,
  Delete,
  NotificationsOff,
  Public,
  Policy,
  WhatsApp,
} from "@mui/icons-material";
import CommonBreadCums from "./CommonBreadCums";
import LandingHeader from "./LandingHeader";
import Footer from "./Footer";

const policyData = {
  title: "Privacy Policy for AATrips",
  introduction:
    'AATrips is committed to protecting your privacy. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our services through our website, mobile applications, and other online products and services (collectively, the "Services").',
  sections: [
    {
      title: "Information We Collect",
      icon: <Info />,
      content: [
        {
          subtitle: "Personal Information",
          description:
            "We collect the following types of personal information when you use our Services:",
          items: [
            {
              primary: "Contact Information",
              secondary:
                "Name, email address, NID phone number, postal address",
              icon: <ContactSupport />,
            },
            {
              primary: "Payment Information",
              secondary: "Credit card details, billing address",
              icon: <Payment />,
            },
            {
              primary: "Travel Information",
              secondary:
                "Passport details, travel preferences, itinerary, booking history",
              icon: <FlightTakeoff />,
            },
          ],
        },
        {
          subtitle: "Non-Personal Information",
          description: "We may collect non-personal information, including:",
          items: [
            {
              primary: "Device Information",
              secondary: "IP address, browser type, operating system",
              icon: <DevicesOther />,
            },
            {
              primary: "Usage Data",
              secondary:
                "Pages visited, time spent on the website, referral/exit pages",
              icon: <DataUsage />,
            },
          ],
        },
      ],
    },
    {
      title: "How We Use Your Information",
      icon: <Security />,
      content: [
        {
          description: "We use your information for the following purposes:",
          items: [
            {
              primary: "Booking and Reservations",
              secondary: "To process and manage your bookings and reservations",
              icon: <EventNote />,
            },
            {
              primary: "Customer Support",
              secondary: "To provide customer service and support",
              icon: <Support />,
            },
            {
              primary: "Personalization",
              secondary: "To tailor our Services to your preferences",
              icon: <Person />,
            },
            {
              primary: "Marketing",
              secondary:
                "To send promotional materials and updates, with your consent",
              icon: <Campaign />,
            },
            {
              primary: "Improvement of Services",
              secondary: "To analyze and improve our Services",
              icon: <TrendingUp />,
            },
          ],
        },
      ],
    },
    {
      title: "Sharing Your Information",
      icon: <Share />,
      content: [
        {
          description: "We may share your information with:",
          items: [
            {
              primary: "Travel Service Providers",
              secondary:
                "Airlines, hotels, umrah package, visa and other travel-related services",
              icon: <Flight />,
            },
            {
              primary: "Third-Party Vendors",
              secondary:
                "Service providers who assist with payment processing, data analysis, marketing, and other business functions",
              icon: <Business />,
            },
            {
              primary: "Legal Requirements",
              secondary:
                "If required by law, or to protect our rights and safety",
              icon: <Gavel />,
            },
          ],
        },
      ],
    },
    {
      title: "Data Security",
      icon: <Lock />,
      content: [
        {
          description:
            "We implement appropriate security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. These measures include encryption, firewalls, and secure socket layer (SSL) technology.",
        },
      ],
    },
    {
      title: "Data Retention",
      icon: <Storage />,
      content: [
        {
          description:
            "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.",
        },
      ],
    },
    {
      title: "Your Rights and Choices",
      icon: <AccountBox />,
      content: [
        {
          description:
            "You have the following rights regarding your personal information:",
          items: [
            {
              primary: "Access",
              secondary: "You can request access to your personal information",
              icon: <Visibility />,
            },
            {
              primary: "Correction",
              secondary:
                "You can request corrections to any inaccurate or incomplete information",
              icon: <Edit />,
            },
            {
              primary: "Deletion",
              secondary:
                "You can request the deletion of your personal information",
              icon: <Delete />,
            },
            {
              primary: "Opt-Out",
              secondary:
                "You can opt-out of receiving marketing communications",
              icon: <NotificationsOff />,
            },
          ],
        },
      ],
    },
    {
      title: "Cookies and Tracking Technologies",
      icon: <Cookie />,
      content: [
        {
          description:
            "We use cookies and similar tracking technologies to enhance your experience on our platform. You can control cookies through your browser settings and other tools.",
        },
      ],
    },
    {
      title: "International Data Transfers",
      icon: <Public />,
      content: [
        {
          description:
            "Your information may be transferred to and processed in countries other than your own. We will ensure that such transfers comply with applicable data protection laws and that your information remains protected.",
        },
      ],
    },
    {
      title: "Changes to This Privacy Policy",
      icon: <Update />,
      content: [
        {
          description:
            "We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new Privacy Policy on our website and updating the effective date.",
        },
      ],
    },
  ],
  conclusion:
    "By using our Services, you agree to the terms of this Privacy Policy. Thank you for trusting AATrips with your travel needs.",
  contactInfo: {
    title: "Contact Us",
    icon: <ContactSupport />,
    description:
      "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:",
    items: [
      { primary: "Email", secondary: "support@aatrips.pk", icon: <Email /> },
      { primary: "Phone", secondary: "+88-0241356244", icon: <Phone /> },
      { primary: "WhatsApp", secondary: "+880-1409965900", icon: <WhatsApp /> },
      {
        primary: "Chattogram Office",
        secondary:
          "Aerial Legend, 11th Floor, 1080 CDA Avenue, GEC Circle, Chittagong 4317",
        icon: <LocationOn />,
      },
      {
        primary: "Dhaka Office",
        secondary:
          "Haveily Complex (Ka-3H), Level-3, Bashundhara Main Road, Vatara, Dhaka -1229",
        icon: <LocationOn />,
      },
    ],
  },
};
export default function PrivacyPolicy() {
  const renderListItems = (items) => (
    <List dense>
      {items.map((item, index) => (
        <ListItem key={index}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.primary} secondary={item.secondary} />
        </ListItem>
      ))}
    </List>
  );

  const renderSection = (section, index) => (
    <Box key={index}>
      <Box display="flex" alignItems="center" mb={2}>
        {section.icon}
        <Typography variant="h5" style={{ marginLeft: "10px" }}>
          {index + 1}. {section.title}
        </Typography>
      </Box>
      {section.content.map((contentItem, contentIndex) => (
        <React.Fragment key={contentIndex}>
          {contentItem.subtitle && (
            <Typography variant="h6" gutterBottom>
              {contentItem.subtitle}
            </Typography>
          )}
          {contentItem.description && (
            <Typography variant="body2" paragraph>
              {contentItem.description}
            </Typography>
          )}
          {contentItem.items && renderListItems(contentItem.items)}
        </React.Fragment>
      ))}
      <Divider style={{ margin: "20px 0" }} />
    </Box>
  );
  return (
    <Box>
      <LandingHeader />
      <Box  sx={{ my: 4, py: 8 }}>
      <CommonBreadCums title="Privacy Policy" />
      </Box>
     
      <Container>
        <Box
         
        >
          <Typography variant="h4" gutterBottom>
            {policyData.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {policyData.introduction}
          </Typography>

          {policyData.sections.map(renderSection)}

          <Box display="flex" alignItems="center" mb={2}>
            {policyData.contactInfo.icon}
            <Typography variant="h5" style={{ marginLeft: "10px" }}>
              {policyData.contactInfo.title}
            </Typography>
          </Box>
          <Typography variant="body2" paragraph>
            {policyData.contactInfo.description}
          </Typography>
          {renderListItems(policyData.contactInfo.items)}

          <Typography variant="body2" paragraph>
            {policyData.conclusion}
          </Typography>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
