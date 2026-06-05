/* eslint-disable jsx-a11y/no-distracting-elements */
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import commaNumber from "comma-number";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import useAuthentication from "../../hooks/useAuthentication";
import balanceIcon from "../../images/balance.png";
import Logo from "../../images/logo.png";
import "./Header.css";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import TokenDecrypt from "../../Token/TokenDecrypt";
import getAuthToken from "../../Token/getAuthToken";
import RedeemIcon from "@mui/icons-material/Redeem";
// import bonus from "../../images/২-হাজার-টাকা-স্পেশাল-বোনাস-2.png"
import Marque from "./Marque";

import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "23%",
  left: "75%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  // p: 3,
};

const Header = () => {
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const tokenise = TokenDecrypt();
  const token = getAuthToken();
  const tokenData = {
    iat: tokenise?.iat,
    exp: tokenise?.exp,
  };

  const isTokenExpired = () => {
    const currentTime = Math.floor(Date.now() / 1000);
    // 
    // 
    // 
    return currentTime >= tokenise?.exp;
  };

  const { logout } = useAuthentication();
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState();
  // todo: for mobile device
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
    refreshFunction();
  };
  const refreshFunction = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setLoading(false);
    } catch (error) {
      console.error("Error occurred during refresh:", error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (isTokenExpired()) {
        handleLogout();
      }
    };
    checkTokenExpiration();
    const timer = setInterval(checkTokenExpiration, 1000); // Check every second
    return () => clearInterval(timer);
  }, []);

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
        setBalance(data?.balance);
        setAccount(data);
        if (data?.status !== "active") {
          logout();
        }
      } catch (error) {
        logout();
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClickAway = () => { };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        sx={{
          position: "relative",
          overflowX: "hidden",
          bgcolor: "var(--primary-color)",
        }}
      >
        <Container>
          <Box
            sx={{
              width: "100%",
              alignItems: "center",
              display: { xs: "none", sm: "none", md: "flex" },
            }}
          >
            {/* //todo:Logo  */}
            <Box
              sx={{
                width: { md: "15%", sm: "50%", xs: "50%" },
                display: "flex",
                justifyContent: {
                  lg: "start",
                  md: "start",
                  sm: "center",
                  xs: "center",
                },
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Link to="/agent/dashboard">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    py: 1,
                    img: {
                      height: "40px",
                    },
                  }}
                >
                  <img src={Logo} alt="logo" />
                  {/* <img
                  src={!account?.logo ? `${account?.logo}` : Logo}
                  alt="logo"
                /> */}
                </Box>
              </Link>
            </Box>

            <Box
              sx={{
                width: "85%",
                display: { md: "flex", sm: "none", xs: "none" },
                alignItems: "center",
                justifyContent: "end",
                gap: "10px",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  color: "var(--white)",
                  fontSize: 12,
                  display: "flex",
                  border: "1px solid",
                  p: "3px 7px",
                  borderRadius: "5px",
                  a: {
                    color: "var(--white)",
                    fontSize: { lg: 12, md: 10 },
                  },
                }}
              >
                <WhatsAppIcon sx={{ fontSize: 18 }} />
                &nbsp;
                <a
                  href="https://wa.me/01409965900"
                  target="_blank"
                  rel="noreferrer"
                >
                  +8801409965900
                </a>
              </Box>
              <Box
                sx={{
                  color: "var(--white)",
                  fontSize: { lg: 12, md: 10 },
                  display: "flex",
                  border: "1px solid",
                  p: "3px 7px",
                  borderRadius: "5px",
                  a: {
                    color: "var(--white)",
                    fontSize: { lg: 12, md: 10 },
                  },
                }}
              >
                <LocalPhoneIcon sx={{ fontSize: 18 }} />
                &nbsp;
                <a href="tel:880241356244" target="_blank" rel="noreferrer">
                  +880241356244
                </a>
              </Box>
              <Box
                sx={{
                  color: "var(--white)",
                  fontSize: 12,
                  display: "flex",
                  border: "1px solid",
                  p: "3px 7px",
                  borderRadius: "5px",
                  a: {
                    color: "var(--white)",
                    fontSize: { lg: 12, md: 10 },
                  },
                }}
              >
                <ForwardToInboxIcon sx={{ fontSize: 18 }} />
                &nbsp;
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=support@aatrips.pk"
                  target="_blank"
                  rel="noreferrer"
                >
                  support@aatrips.pk
                </a>
              </Box>
              {/* SignUp Bonus
              <Box
                // onClick={handleOpen1}
                sx={{
                  background: "#ED5A2B",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  px: { lg: 1, md: 0.5 },
                  py: 0.5,
                  // color: `var(--black)',

                  fontWeight: 500,
                  cursor: "pointer",
                  gap: 0.5,
                }}
              >
                <RedeemIcon
                  sx={{
                    color: "#fff",
                    fontSize: { lg: 22, md: 16 },
                  }}
                />

                <Typography
                  sx={{
                    width: "fit-content",
                    color: "white",
                    bgColor: "#ED5A2B",
                    fontSize: { lg: 12, md: 10 },
                    fontWeight: 500,
                  }}
                >
                  SignUp Bonus 2000 PKR*
                </Typography>
              </Box>
              */}

              {/* <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <img src={bonus} alt="signup bonus" style={
          {
            width:"250px",
            height:"240px"
          }
        }/>
        </Box>

        
      </Modal> */}

              <Box
                sx={{
                  background: "#ddd",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  px: 2,
                  py: 1,
                  color: "var(--black)",
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
                onClick={handleOpen}
              >
                <img src={balanceIcon} alt="balance" width="18px" />
                <Box pt={0.2} className="balance-container">
                  &nbsp;
                  <Tooltip
                    title={
                      <>
                        <Box>
                          Main Balance:{" "}
                          {commaNumber(account?.balance?.toFixed(2) || 0)} PKR
                        </Box>
                        <Box>
                          Credit Balance:{" "}
                          {commaNumber(account?.credit?.toFixed(2) || 0)} PKR
                        </Box>
                      </>
                    }
                  >
                    <Box
                      className={open ? "balance-open" : "balance-closed"}
                      sx={{
                        color: "var(--secondary-color)",
                        fontWeight: "500",
                        mt: -2,
                        // width: '100px',
                      }}
                    >
                      {open ? (
                        <>
                          &nbsp;&nbsp;&nbsp;
                          {commaNumber(account?.balance?.toFixed(2) || 0)}{" "}
                          PKR&nbsp;&nbsp;&nbsp;
                        </>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Tooltip>
                </Box>

                <Tooltip title="Refresh">
                  <SettingsIcon
                    sx={{
                      cursor: "pointer",
                      fontSize: 15,
                      p: 0,
                    }}
                    className={loading ? "custom-spin" : ""}
                    onClick={() => refreshFunction()}
                  />
                </Tooltip>
              </Box>
            </Box>
            {/* //todo:Normal Mobile Navbar */}
            <Box
              sx={{
                width: "80%",
                height: "60px",
                display: { md: "none", sm: "flex", xs: "flex" },
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Tooltip title="Open Menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>
                    {/* {user?.user?.name[0].toUpperCase() || ""} */}TF
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Box
                    sx={{
                      color: "var(--secondary-color)",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      fontSize: "17px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Tooltip
                      title={
                        <>
                          <Box>
                            Main Balance:{" "}
                            {commaNumber(balance?.balance?.toFixed(2) || 0)} PKR
                          </Box>
                          <Box>
                            Credit Balance:{" "}
                            {commaNumber(balance?.credit?.toFixed(2) || 0)} PKR
                          </Box>
                        </>
                      }
                    >
                      <span
                        style={{
                          color: "var(--secondary-color)",
                          fontWeight: "500",
                        }}
                      >
                        {commaNumber(balance?.balance?.toFixed(2) || 0)} PKR
                      </span>
                    </Tooltip>
                    <NavLink
                      to="/adddeposite"
                      style={{
                        color: "var(--secondary-color)",
                        cursor: "pointer",
                      }}
                    >
                      <Tooltip title="Add Money">
                        <AddIcon style={{ fontSize: "30px" }} />
                      </Tooltip>
                    </NavLink>
                  </Box>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button
                    style={{
                      background: "var(--mateBlack)",
                      color: "var(--white)",
                      fontWeight: 400,
                      padding: "10px",
                      cursor: "pointer",
                      width: "100%",
                      zIndex: "999",
                    }}
                    onClick={() => {
                      logout();
                    }}
                  >
                    <LogoutIcon />
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Container>
        <Marque />
      </Box>
    </ClickAwayListener>
  );
};

export default Header;
