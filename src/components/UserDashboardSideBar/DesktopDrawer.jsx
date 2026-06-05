import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { Divider, Tooltip, Typography } from "@mui/material";
import { Link, Outlet, NavLink, useNavigate } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import useAuthentication from "./../../hooks/useAuthentication";
import Header from "../Header/Header";
import Logo from "../../images/aatrips_logo.png";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CloseIcon from "@mui/icons-material/Close";

import TokenDecrypt from "../../Token/TokenDecrypt";
import getAuthToken from "../../Token/getAuthToken";

const DeskTopDrawer = (props) => {
  const { logout } = useAuthentication();
  const tokenise = TokenDecrypt();
  const token = getAuthToken();

  const [isCollapse, setIsCollapse] = useState(false);
  const [account, setAccount] = useState();
  const drawerWidth = isCollapse ? 80 : 200;
  const headingHeight = 95;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${import.meta.env.REACT_APP_API_URL}/agent/myaccount`;
        const config = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch(url, config);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Failed to fetch account data: ${errorData.message || response.statusText
            }`
          );
        }
        const data = await response.json();
        setAccount(data);
      } catch (error) {
        logout();
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  const drawer = (
    <Box
      sx={{
        background: "#fff !important",
        overflowX: "hidden",
        height: "100vh !important",
        "&::-webkit-scrollbar-thumb": {
          display: "none",
        },
        "&::-webkit-scrollbar-track": {
          display: "none",
        },
        "&::-webkit-scrollbar": {
          width: "0",
          display: "none",
        },
        ".active": {
          color: "#ffffff !important",
          background: "rgba(255, 255, 255, 0.15) !important",
          width: "100% !important",
          padding: "5px 10px",
          borderTopLeftRadius: "5px",
          borderBottomLeftRadius: "5px",
          transition: "all 0.5s ease-in-out",
        },
        ".active>svg": {
          color: "#ffffff !important",
        },
      }}
    >
      {/* //todo: company Logo section */}
      {/* <Box
        mx="auto"
        my={1}
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          border: '1px solid red',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          height: '60px',
          visibility: isCollapse ? 'hidden' : 'visible',
        }}
      >
        <Link to={'/dashboard/dashboardHome'} className="link-logo">
          <Box height="100%" mt={1}>
            <Box
              sx={{
                height: '60px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={account?.logo ? `${account?.logo}` : Logo}
                alt="logo"
                style={{
                  height: '100%',
                }}
              />
            </Box>
          </Box>
        </Link>
      </Box> */}
      {/*//todo:menu section */}
      <Box
        sx={{
          position: "relative",
          background: "var(--primary-color) !important",
          // borderTopRightRadius: "10px",
          height: "100vh !important",
          overflowX: "hidden !important",
          "&::-webkit-scrollbar-thumb": {
            display: "none",
            width: "0px",
          },
          "&::-webkit-scrollbar-track": {
            display: "none",
          },
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "& .MuiDivider-wrapper": {
            fontSize: "12px",
            color: "#5D7F9E !important",
          },
          svg: {
            fontSize: "20px",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", px: 1.5, pt: 1.5 }}>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: "white" }}>
            <CloseIcon sx={{ fontSize: "24px" }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            mt: "10px",
            position: "relative",
            a: {
              textDecoration: "none",
              fontSize: "13px",
              color: "white",
              width: "100%",
              margin: isCollapse ? "10px 8px" : "10px 8px",
              padding: isCollapse ? "5px 10px" : "5px 0px 5px 20px",
              display: "flex",
              gap: "8px",
              justifyContent: isCollapse ? "center" : "start",
              alignItems: "end",
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
              transition: "all 0.5s ease-in-out",
            },
          }}
        >
          <NavLink
            onClick={() => {
              setMobileOpen(false);
            }}
            to="/agent/dashboard"
          >
            {isCollapse ? (
              <Tooltip title="Dashboard">
                <DashboardOutlinedIcon />
              </Tooltip>
            ) : (
              <>
                <DashboardOutlinedIcon />
                <span> Dashboard</span>
              </>
            )}
          </NavLink>
          <NavLink
            onClick={() => {
              setMobileOpen(false);
            }}
            to="/agent/product"
          >
            {isCollapse ? (
              <Tooltip title="Search Pad">
                <ExploreOutlinedIcon />
              </Tooltip>
            ) : (
              <>
                <ExploreOutlinedIcon />
                <span> Search Pad</span>
              </>
            )}
          </NavLink>
          <NavLink
            onClick={() => {
              setMobileOpen(false);
            }}
            to={"/agent/queues"}
          >
            {isCollapse ? (
              <Tooltip title="AirTicket">
                <BookOnlineOutlinedIcon />
              </Tooltip>
            ) : (
              <>
                <BookOnlineOutlinedIcon />
                <span> My Booking</span>
              </>
            )}
          </NavLink>

          <NavLink
            onClick={() => {
              setMobileOpen(false);
            }}
            to={"/agent/traveller"}
          >
            {isCollapse ? (
              <Tooltip title=" Traveler">
                <PeopleOutlineIcon />
              </Tooltip>
            ) : (
              <>
                <PeopleOutlineIcon />
                <span> Traveler</span>
              </>
            )}
          </NavLink>
          <NavLink
            onClick={() => {
              setMobileOpen(false);
            }}
            to={"/agent/myaccount"}
          >
            {isCollapse ? (
              <Tooltip title=" My Account">
                <PersonOutlineIcon />
              </Tooltip>
            ) : (
              <>
                <PersonOutlineIcon />
                <span> My Account</span>
              </>
            )}
          </NavLink>

          <NavLink
            onClick={() => {
              setMobileOpen(false);
            }}
            to="/agent/deposit"
          >
            {isCollapse ? (
              <Tooltip title=" Deposit">
                <AccountBalanceWalletOutlinedIcon />
              </Tooltip>
            ) : (
              <>
                <AccountBalanceWalletOutlinedIcon />
                <span> Deposit</span>
              </>
            )}
          </NavLink>
          <NavLink
            onClick={() => {
              setMobileOpen(false);
            }}
            to="/agent/staff"
          >
            {isCollapse ? (
              <Tooltip title=" My Staffs">
                <BadgeOutlinedIcon />
              </Tooltip>
            ) : (
              <>
                <BadgeOutlinedIcon />
                <span> My Staffs</span>
              </>
            )}
          </NavLink>
          <NavLink
            onClick={() => {
              setMobileOpen(false);
            }}
            to={"/agent/transaction"}
          >
            {isCollapse ? (
              <Tooltip title=" Transaction">
                <ReceiptLongOutlinedIcon />
              </Tooltip>
            ) : (
              <>
                <ReceiptLongOutlinedIcon />
                <span> transaction</span>
              </>
            )}
          </NavLink>
          <NavLink
            onClick={() => {
              setMobileOpen(false);
            }}
            to={"/agent/ledger"}
          >
            {isCollapse ? (
              <Tooltip title=" Ledger">
                <BarChartOutlinedIcon />
              </Tooltip>
            ) : (
              <>
                <BarChartOutlinedIcon />
                <span> Ledger</span>
              </>
            )}
          </NavLink>

          {/* -------TF-------- */}

          <Box
            sx={{
              fontSize: "13px",
              color: "white",
              width: "100%",
              margin: isCollapse ? "5px 15px" : "5px 8px",
              padding: isCollapse ? "5px 10px" : "5px 0px 5px 20px",
              display: "flex",
              gap: "5px",
              justifyContent: "start",
              alignItems: "end",
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
              transition: "all 0.5s ease-in-out",
              cursor: "pointer",
            }}
            onClick={logout}
          >
            {isCollapse ? (
              <Tooltip title="Logout">
                <LogoutOutlinedIcon />
              </Tooltip>
            ) : (
              <>
                <LogoutOutlinedIcon />
                <span>Logout</span>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <AppBar
        sx={{
          width: {
            md: `calc(100% - ${drawerWidth}px)`,
          },
          ml: { md: `${drawerWidth}px`, sm: `${drawerWidth}px` },
          height: "fit-content",
          backgroundColor: "#fff !important",
          position: "fixed",
          top: 0,
          overflow: "hidden",
        }}
      >
        <Toolbar
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            maxHeight: "fit-content",
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems="center"
            sx={{
              mb: { lg: 0, md: 0, sm: 0, xs: 0 },
              mt: { lg: 0, md: 0, sm: 1, xs: 1 },
            }}
          >
            <Box
              className="mobileLogo"
              sx={{
                display: { md: "none", sm: "block" },
              }}
            >
              <Box
                sx={{
                  height: "60px",
                  mb: 1,
                }}
              >
                {/* <img
                  src={account?.logo ? `${account?.logo}` : Logo}
                  alt="logo"
                  style={{
                    height: '100%',
                  }}
                /> */}
                <img
                  src={Logo}
                  alt="logo"
                  style={{
                    height: "100%",
                  }}
                />
              </Box>
            </Box>
            <Box textAlign={"right"}>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  color: "#222222",
                  display: { xs: "block", sm: "block", md: "none" },
                  paddingRight: "0px",
                }}
              >
                <HiMenuAlt1 id="mobileHumbarger" style={{ fontSize: "35px" }} />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          // width: { md: drawerWidth, sm: drawerWidth },
          width: { md: drawerWidth },
          flexShrink: { md: 0, sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            // display: { xs: "block", md: "none", sm: "none" },
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default DeskTopDrawer;
