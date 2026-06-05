/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate, Outlet, NavLink, useLocation } from "react-router-dom";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { ExpandMore } from "@mui/icons-material";

import "./UserDashboardSideBar.css";
import useAuthentication from "../../hooks/useAuthentication";
import DeskTopDrawer from "./DesktopDrawer";
import { Collapse, Divider, Stack, Tooltip, Typography } from "@mui/material";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import TokenDecrypt from "../../Token/TokenDecrypt";
const drawerWidth = 230;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 20px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const UserDashboardSideBar = () => {
  const tokenise = TokenDecrypt();
  const [hover, setHover] = useState(false);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // const [submenu, setSubmenus] = useState('');
  const [subManuActive, setSubMenuActive] = useState("");
  const lists = [
    { title: "All Booking", pathName: "/agent/queues" },
    { title: "On Hold", pathName: "/agent/Hold" },
    {
      title: "In Process",
      pathName: "/agent/Issue In Process",
    },
    { title: "Ticketed", pathName: "/agent/Ticketed" },

    {
      title: "Cancelled",
      pathName: "/agent/Cancelled",
    },
    {
      title: "Void",
      pathName: "/agent/Void",
    },
    {
      title: "Refund",
      pathName: "/agent/Refund",
    },
    {
      title: "Reissue",
      pathName: "/agent/Reissue",
    },
  ];
  const reportLists = [
    { title: "Sales Reports", pathName: "/agent/sales" },
    { title: "Transaction", pathName: "/agent/transaction" },
    { title: "Accounts Reports", pathName: "/agent/ledger" },
  ];
  const { logout } = useAuthentication();
  const [value, setValue] = useState("Dashboard");
  const [submenu, setSubmenu] = useState(false);
  const [subMenus, setSubMenus] = useState({
    bookignSubMenu: false,
    depositSubMenu: false,
    travellarSubMenu: false,
    staffSubMenu: false,
    ledger: false,
  });
  const {
    bookignSubMenu,
    depositSubMenu,
    travellarSubMenu,
    staffSubMenu,
    ledger,
  } = subMenus;
  const handleChange = useCallback(
    (newValue) => {
      setValue(newValue);
      setSubmenu({
        color: "var(--primary)",
      });
    },
    [
      bookignSubMenu,
      depositSubMenu,
      travellarSubMenu,
      staffSubMenu,
      ledger,
      setOpen,
    ]
  );

  const toggleSubMenu = useCallback((menu) => {
    setSubMenus((prevMenus) => ({
      ...prevMenus,
      [menu]: !prevMenus[menu],
    }));
  }, []);
  const handleOpen = () => {
    if (subMenus.bookignSubMenu) {
      setSubMenus({
        bookignSubMenu: false,
        depositSubMenu: false,
        travellarSubMenu: false,
        staffSubMenu: false,
        ledger: false,
      });
    }
    setOpen(!open);
  };

  const handleLogout = () => {
    logout();
  };

  const staff = tokenise?.staffdata;
  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .MuiTooltip-tooltip`]: {
      backgroundColor: "var(--primary-color)", // Replace with your desired color
      color: "white", // Optionally change the text color
    },
    [`& .MuiTooltip-arrow`]: {
      color: "var(--white)", // Ensure arrow matches the tooltip background
    },
  });
  return (
    <Box sx={{ display: "flex" }} className="sideBar-user">
      <CssBaseline />
      {/* For DeskTop and lg device Sidebar */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
        }}
      >
        <DrawerHeader
          sx={{
            display: "block",
            cursor: "pointer",
            background: "var(--primary-color)",
          }}
        >
          <Box onClick={() => handleOpen()} sx={{ display: "flex", justifyContent: open ? "flex-end" : "flex-start" }}>
            {open ? (
              <CloseIcon
                style={{
                  color: "var(--white)",
                  fontSize: "28px",
                  margin: "20px 15px 10px 15px",
                }}
              />
            ) : (
              <MenuIcon
                style={{
                  color: "var(--white)",
                  fontSize: "28px",
                  margin: "20px 15px 10px 15px",
                }}
              />
            )}
          </Box>
        </DrawerHeader>
        <Box
          sx={{
            position: "relative",

            overflow: "hidden",

            zIndex: 0,
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                "linear-gradient(rgba(26, 58, 110, 1), rgba(26, 58, 110, 1))",
            },
          }}
        >
          <List
            style={{
              height: "100vh",
              overflowX: "hidden",
              // background: "var(--primary-color)",
              // borderRight: "5px solid var(--primary-color)",
            }}
            className="scrollbar-control"
          >
            <Box>
              {open && (
                <>
                  <Box sx={{ my: 2 }}>
                    <Typography
                      variant="p"
                      sx={{
                        px: 2,
                        color: "var(--white)",
                        fontSize: "12px",
                        py: 2,
                      }}
                    >
                      Main
                    </Typography>
                  </Box>
                  <Divider
                    sx={{
                      bgcolor: "#758694",
                      width: "90%",
                      height: "1px",
                      display: "flex",
                      mx: "auto",
                      borderRadius: "1px",
                    }}
                  />
                </>
              )}

              {/* dashboard  home */}
              <ListItem disablePadding sx={{ display: "block" }}>
                <NavLink
                  to="/agent/dashboard"
                  className={({ isActive }) =>
                    isActive ? "active-nav" : "normal-nav"
                  }
                  onClick={() => setSubmenu("Dashboard")}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      width: "90%",
                      borderTopRightRadius: "5px",
                      borderBottomRightRadius: "5px",
                      py: 0,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 1 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                      >
                        <CustomTooltip
                          title={!open ? "Dashboard" : ""}
                          placement="right"
                          sx={{
                            position: "relative",

                            "& .MuiTooltip-tooltip": {
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "#1A3A6E",
                              width: "100px",
                              height: "65px",
                              // color: "var(--white)",
                              fontSize: "14px",
                              padding: "5px",
                              borderRadius: "0px 5px 5px 0px",

                              "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,

                                filter: "blur(3px)",
                                backgroundBlendMode: "multiply",
                                zIndex: -1,
                              },
                            },
                          }}
                        >
                          <DashboardOutlinedIcon
                            id="NavIcon"
                            style={{
                              fontSize: "24px",
                              margin: "10px 0px",

                              color: "#ffffff",
                            }}
                          />
                        </CustomTooltip>
                      </div>
                    </ListItemIcon>
                    <ListItemText
                      id="NavText"
                      primary="Dashboard"
                      sx={{
                        opacity: open ? 1 : 0,
                        color: "#ffffff",
                        "& .MuiListItemText-primary": {
                          fontSize: "15px",
                        },
                      }}
                    />
                  </ListItemButton>
                </NavLink>
              </ListItem>

              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  ":hover": {
                    color: "var(--white)",
                  },
                }}
              >
                <NavLink
                  to="/agent/product"
                  className={({ isActive }) =>
                    isActive ? "active-nav" : "normal-nav"
                  }
                  onClick={() => setSubmenu("Home")}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      width: "90%",
                      borderTopRightRadius: "5px",
                      borderBottomRightRadius: "5px",
                      py: 0,
                      zIndex: 1000,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 1 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                      >
                        <CustomTooltip
                          title={!open ? "SearchPad" : ""}
                          placement="right"
                          sx={{
                            position: "relative",

                            "& .MuiTooltip-tooltip": {
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "#1A3A6E",
                              width: "100px",
                              height: "65px",
                              // color: "var(--white)",
                              fontSize: "14px",
                              padding: "5px",
                              borderRadius: "0px 5px 5px 0px",

                              "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,

                                filter: "blur(3px)",
                                backgroundBlendMode: "multiply",
                                zIndex: -1,
                              },
                            },
                          }}
                        >
                          <ExploreOutlinedIcon
                            id="NavIcon"
                            sx={{
                              fontSize: "24px",
                              margin: "10px 0px",
                              color: "#ffffff",
                            }}
                          />
                        </CustomTooltip>
                      </div>
                    </ListItemIcon>
                    <ListItemText
                      id="NavText"
                      primary="Search pad"
                      sx={{
                        opacity: open ? 1 : 0,
                        color: "#ffffff",
                        "& .MuiListItemText-primary": {
                          fontSize: "15px",
                        },
                        zIndex: 10,
                      }}
                    />
                  </ListItemButton>
                </NavLink>
              </ListItem>
              {/* //todo: dashboard */}

              {/* Booking  */}

              {/* manage  */}

              <Box sx={{ borderRadius: "5px", px: { xs: 0, md: 1.5 } }}>
                <Box
                  className={
                    location?.pathname.startsWith("/bookinghistory")
                      ? "active-link"
                      : "link"
                  }
                  onClick={() => {
                    toggleSubMenu("bookignSubMenu");
                    setOpen(true);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      width: "100%",
                      borderRadius: "5px",
                      py: 0,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 1 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                      >
                        <CustomTooltip
                          title={!open ? "My Booking" : ""}
                          placement="right"
                          sx={{
                            position: "relative",

                            "& .MuiTooltip-tooltip": {
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "#1A3A6E",
                              width: "100px",
                              height: "65px",
                              // color: "var(--white)",
                              fontSize: "14px",
                              padding: "5px",
                              borderRadius: "0px 5px 5px 0px",

                              "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,

                                filter: "blur(3px)",
                                backgroundBlendMode: "multiply",
                                zIndex: -1,
                              },
                            },
                          }}
                        >
                          <BookOnlineOutlinedIcon
                            onClick={() => setOpen(!open)}
                            id="NavIcon"
                            style={{
                              fontSize: "24px",
                              margin: "10px 0px",
                              color: "#ffffff",
                            }}
                          />
                        </CustomTooltip>
                      </div>
                    </ListItemIcon>
                    <ListItemText
                      id="NavText"
                      primary="My Booking"
                      sx={{
                        opacity: open ? 1 : 0,
                        color: "#ffffff",
                        "& .MuiListItemText-primary": {
                          fontSize: "15px",
                        },
                      }}
                    />
                    <ExpandMore
                      sx={{
                        position: "absolute",
                        right: "-5px",
                        color: "var(--white)",
                        fontSize: 25,
                        textAlign: "end",
                        opacity: open ? 1 : 0,
                        transition: "transform 0.3s ease-in-out",
                        transform: `rotate(${bookignSubMenu ? 180 : 0}deg)`,
                      }}
                    />
                  </ListItemButton>

                  {/* when open this sidebar */}
                </Box>
                <Collapse in={bookignSubMenu}>
                  <Box sx={{ pl: 4.5, mt: 1 }}>
                    <Stack direction="column" spacing={1}>
                      {lists.map((item, i) => (
                        <Box key={i}>
                          <NavLink
                            onClick={() => handleChange(item.title)}
                            to={`${item.pathName}`}
                            style={{ fontSize: "14px" }}
                            className={({ isActive }) =>
                              isActive ? "submenu-active" : "submenu-nav"
                            }
                          >
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Tooltip title={item.title} followCursor>
                                <span></span>
                              </Tooltip>
                              <Typography
                                sx={{
                                  fontSize: "100%",
                                  opacity: open ? 1 : 0,
                                  color: "#ffffff",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  width: "80%",
                                  alignItems: "center",
                                }}
                              >
                                {item.title}
                              </Typography>
                            </Stack>
                          </NavLink>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Collapse>
              </Box>

              <Box>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <NavLink
                    to={"/agent/traveller"}
                    className={({ isActive }) =>
                      isActive ? "active-nav" : "normal-nav"
                    }
                    onClick={() => {
                      setSubmenu("Manage");
                      setSubMenuActive("Traveler");
                    }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        width: "90%",
                        borderTopRightRadius: "5px",
                        borderBottomRightRadius: "5px",
                        py: 0,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 1 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          onMouseEnter={() => setHover(true)}
                          onMouseLeave={() => setHover(false)}
                        >
                          <CustomTooltip
                            title={!open ? "Traveler" : ""}
                            placement="right"
                            sx={{
                              position: "relative",

                              "& .MuiTooltip-tooltip": {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#1A3A6E",
                                width: "100px",
                                height: "65px",
                                // color: "var(--white)",
                                fontSize: "14px",
                                padding: "5px",
                                borderRadius: "0px 5px 5px 0px",

                                "&::before": {
                                  content: '""',
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,

                                  filter: "blur(3px)",
                                  backgroundBlendMode: "multiply",
                                  zIndex: -1,
                                },
                              },
                            }}
                          >
                            <PeopleOutlineIcon
                              onClick={() => setOpen(!open)}
                              id="NavIcon"
                              style={{
                                fontSize: "24px",
                                margin: "10px 0px",
                                color: "#ffffff",
                              }}
                            />
                          </CustomTooltip>
                        </div>
                      </ListItemIcon>
                      <ListItemText
                        id="NavText"
                        primary="Traveler"
                        sx={{
                          opacity: open ? 1 : 0,
                          color: "#ffffff",
                          "& .MuiListItemText-primary": {
                            fontSize: "15px",
                          },
                        }}
                      />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              </Box>

              {/* Deposit */}
              <Box>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <NavLink
                    to="/agent/deposit"
                    className={({ isActive }) =>
                      isActive ? "active-nav" : "normal-nav"
                    }
                    onClick={() => {
                      setSubmenu("Account");
                      setSubMenuActive("AddBank");
                    }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        width: "90%",
                        borderTopRightRadius: "5px",
                        borderBottomRightRadius: "5px",
                        py: 0,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 1 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          onMouseEnter={() => setHover(true)}
                          onMouseLeave={() => setHover(false)}
                        >
                          <CustomTooltip
                            title={!open ? "Deposit" : ""}
                            placement="right"
                            sx={{
                              position: "relative",

                              "& .MuiTooltip-tooltip": {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#1A3A6E",
                                width: "100px",
                                height: "65px",
                                // color: "var(--white)",
                                fontSize: "14px",
                                padding: "5px",
                                borderRadius: "0px 5px 5px 0px",

                                "&::before": {
                                  content: '""',
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,

                                  filter: "blur(3px)",
                                  backgroundBlendMode: "multiply",
                                  zIndex: -1,
                                },
                              },
                            }}
                          >
                            <AccountBalanceWalletOutlinedIcon
                              onClick={() => setOpen(!open)}
                              id="NavIcon"
                              style={{
                                fontSize: "24px",
                                margin: "10px 0px",
                                color: "#ffffff",
                              }}
                            />
                          </CustomTooltip>
                        </div>
                      </ListItemIcon>
                      <ListItemText
                        id="NavText"
                        primary="Deposit"
                        sx={{
                          opacity: open ? 1 : 0,
                          color: "#ffffff",
                          "& .MuiListItemText-primary": {
                            fontSize: "15px",
                          },
                        }}
                      />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              </Box>
              <Box>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <NavLink
                    to="/agent/allbank"
                    className={({ isActive }) =>
                      isActive ? "active-nav" : "normal-nav"
                    }
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        width: "90%",
                        borderTopRightRadius: "5px",
                        borderBottomRightRadius: "5px",
                        py: 0,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 1 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          onMouseEnter={() => setHover(true)}
                          onMouseLeave={() => setHover(false)}
                        >
                          <CustomTooltip
                            title={!open ? "Banklist" : ""}
                            placement="right"
                            sx={{
                              position: "relative",

                              "& .MuiTooltip-tooltip": {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#1A3A6E",
                                width: "100px",
                                height: "65px",
                                // color: "var(--white)",
                                fontSize: "14px",
                                padding: "5px",
                                borderRadius: "0px 5px 5px 0px",

                                "&::before": {
                                  content: '""',
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,

                                  filter: "blur(3px)",
                                  backgroundBlendMode: "multiply",
                                  zIndex: -1,
                                },
                              },
                            }}
                          >
                            <AccountBalanceOutlinedIcon
                              onClick={() => setOpen(!open)}
                              id="NavIcon"
                              style={{
                                fontSize: "24px",
                                margin: "10px 0px",
                                color: "#ffffff",
                              }}
                            />
                          </CustomTooltip>
                        </div>
                      </ListItemIcon>
                      <ListItemText
                        id="NavText"
                        primary="Banklist"
                        sx={{
                          opacity: open ? 1 : 0,
                          color: "#ffffff",
                          "& .MuiListItemText-primary": {
                            fontSize: "15px",
                          },
                        }}
                      />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              </Box>
              {/* Staff */}

              {open && (
                <>
                  <Box sx={{ my: 2 }}>
                    <Typography
                      variant="p"
                      sx={{
                        px: 2,
                        color: "var(--white)",
                        fontSize: "12px",
                        py: 2,
                      }}
                    >
                      Accounts
                    </Typography>
                  </Box>
                  <Divider
                    sx={{
                      bgcolor: "#758694",
                      width: "90%",
                      height: "1px",
                      display: "flex",
                      mx: "auto",
                      borderRadius: "1px",
                    }}
                  />
                </>
              )}

              {/* Account */}
              {Object.keys(staff || {}).length !== 0 ? null : (
                <Box>
                  <ListItem disablePadding sx={{ display: "block" }}>
                    <NavLink
                      to="/agent/myaccount"
                      className={({ isActive }) =>
                        isActive ? "active-nav" : "normal-nav"
                      }
                      onClick={() => {
                        setSubmenu("myaccount");
                      }}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                          width: "90%",
                          borderTopRightRadius: "5px",
                          borderBottomRightRadius: "5px",
                          py: 0,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 1 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                          >
                            <CustomTooltip
                              title={!open ? "My Account" : ""}
                              placement="right"
                              sx={{
                                position: "relative",

                                "& .MuiTooltip-tooltip": {
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  backgroundColor: "#1A3A6E",
                                  width: "100px",
                                  height: "65px",
                                  // color: "var(--white)",
                                  fontSize: "14px",
                                  padding: "5px",
                                  borderRadius: "0px 5px 5px 0px",

                                  "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,

                                    filter: "blur(3px)",
                                    backgroundBlendMode: "multiply",
                                    zIndex: -1,
                                  },
                                },
                              }}
                            >
                              <PersonOutlineIcon
                                onClick={() => setOpen(!open)}
                                id="NavIcon"
                                style={{
                                  fontSize: "24px",
                                  margin: "10px 0px",
                                  color: "#ffffff",
                                }}
                              />
                            </CustomTooltip>
                          </div>
                        </ListItemIcon>
                        <ListItemText
                          id="NavText"
                          primary="My Account"
                          sx={{
                            opacity: open ? 1 : 0,
                            color: "#ffffff",
                            "& .MuiListItemText-primary": {
                              fontSize: "15px",
                            },
                          }}
                        />
                      </ListItemButton>
                    </NavLink>
                  </ListItem>
                </Box>
              )}
              {/* my staff*/}
              {Object.keys(staff || {}).length !== 0 ? null : (
                <Box>
                  <ListItem disablePadding sx={{ display: "block" }}>
                    <NavLink
                      to="/agent/staff"
                      className={({ isActive }) =>
                        isActive ? "active-nav" : "normal-nav"
                      }
                      onClick={() => setSubmenu("My Staffs")}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                          width: "90%",
                          borderTopRightRadius: "5px",
                          borderBottomRightRadius: "5px",
                          py: 0,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 1 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                          >
                            <CustomTooltip
                              title={!open ? "My Staffs" : ""}
                              placement="right"
                              sx={{
                                position: "relative",

                                "& .MuiTooltip-tooltip": {
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  backgroundColor: "#1A3A6E",
                                  width: "100px",
                                  height: "65px",
                                  // color: "var(--white)",
                                  fontSize: "14px",
                                  padding: "5px",
                                  borderRadius: "0px 5px 5px 0px",

                                  "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,

                                    filter: "blur(3px)",
                                    backgroundBlendMode: "multiply",
                                    zIndex: -1,
                                  },
                                },
                              }}
                            >
                              <BadgeOutlinedIcon
                                id="NavIcon"
                                style={{
                                  fontSize: "26px",
                                  margin: "10px 0px",
                                  color: "#ffffff",
                                }}
                              />
                            </CustomTooltip>
                          </div>
                        </ListItemIcon>
                        <ListItemText
                          id="NavText"
                          primary="My Staffs"
                          sx={{
                            opacity: open ? 1 : 0,
                            color: "#ffffff",
                            "& .MuiListItemText-primary": {
                              fontSize: "15px",
                            },
                          }}
                        />
                      </ListItemButton>
                    </NavLink>
                  </ListItem>
                </Box>
              )}
              {/* Reports */}
              <Box sx={{ borderRadius: "5px", px: { xs: 0, md: 1.5 } }}>
                <Box
                  className={
                    location?.pathname.startsWith("/agent/transaction")
                      ? "active-link"
                      : "link"
                  }
                  onClick={() => {
                    toggleSubMenu("ledger");
                    setOpen(true);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      width: "100%",
                      borderRadius: "5px",
                      py: 0,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 1 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                      >
                        <CustomTooltip
                          title={!open ? "Reports" : ""}
                          placement="right"
                          sx={{
                            position: "relative",

                            "& .MuiTooltip-tooltip": {
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "#1A3A6E",
                              width: "100px",
                              height: "65px",
                              // color: "var(--white)",
                              fontSize: "14px",
                              padding: "5px",
                              borderRadius: "0px 5px 5px 0px",

                              "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,

                                filter: "blur(3px)",
                                backgroundBlendMode: "multiply",
                                zIndex: -1,
                              },
                            },
                          }}
                        >
                          <BarChartOutlinedIcon
                            onClick={() => setOpen(!open)}
                            id="NavIcon"
                            style={{
                              fontSize: "24px",
                              margin: "10px 0px",
                              color: "#ffffff",
                            }}
                          />
                        </CustomTooltip>
                      </div>
                    </ListItemIcon>
                    <ListItemText
                      id="NavText"
                      primary="Reports"
                      sx={{
                        opacity: open ? 1 : 0,
                        color: "#ffffff",
                        "& .MuiListItemText-primary": {
                          fontSize: "15px",
                        },
                      }}
                    />
                    <ExpandMore
                      sx={{
                        position: "absolute",
                        right: "-5px",
                        color: "var(--white)",
                        fontSize: 25,
                        textAlign: "end",
                        opacity: open ? 1 : 0,
                        transition: "transform 0.3s ease-in-out",
                        transform: `rotate(${ledger ? 180 : 0}deg)`,
                      }}
                    />
                  </ListItemButton>

                  {/* when open this sidebar */}
                </Box>
                <Collapse in={ledger}>
                  <Box sx={{ pl: 4.5, mt: 1 }}>
                    <Stack direction="column" spacing={1}>
                      {reportLists.map((item, i) => (
                        <Box key={i}>
                          <NavLink
                            onClick={() => handleChange(item.title)}
                            to={`${item.pathName}`}
                            style={{ fontSize: "14px" }}
                            className={({ isActive }) =>
                              isActive ? "submenu-active" : "submenu-nav"
                            }
                          >
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Tooltip
                                title={item.title}
                                followCursor
                              >
                                <span></span>
                              </Tooltip>
                              <Typography
                                sx={{
                                  fontSize: "100%",
                                  opacity: open ? 1 : 0,
                                  color: "#ffffff",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  width: "80%",
                                  alignItems: "center",
                                }}
                              >
                                {item.title}
                              </Typography>
                            </Stack>
                          </NavLink>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Collapse>
              </Box>
              {/* Logout */}

              <Box sx={{ borderRadius: "5px", px: { xs: 0, md: 1.5 }, mb: 7 }}>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active-nav" : "normal-nav"
                    }
                    onClick={handleLogout}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 0.9,
                        mt: 0,
                        width: "90%",
                        borderTopRightRadius: "5px",
                        borderBottomRightRadius: "5px",
                        py: 0,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          onMouseEnter={() => setHover(true)}
                          onMouseLeave={() => setHover(false)}
                        >
                          <CustomTooltip
                            title={!open ? "Logout" : ""}
                            placement="right"
                            sx={{
                              position: "relative",

                              "& .MuiTooltip-tooltip": {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#1A3A6E",
                                width: "100px",
                                height: "65px",
                                // color: "var(--white)",
                                fontSize: "14px",
                                padding: "5px",
                                borderRadius: "0px 5px 5px 0px",

                                "&::before": {
                                  content: '""',
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,

                                  filter: "blur(3px)",
                                  backgroundBlendMode: "multiply",
                                  zIndex: -1,
                                },
                              },
                            }}
                          >
                            <LogoutOutlinedIcon
                              id="NavIcon"
                              style={{
                                fontSize: "28px",
                                margin: "10px 0px",
                                color: "var(--white)",
                              }}
                            />
                          </CustomTooltip>
                        </div>
                      </ListItemIcon>
                      <ListItemText
                        id="NavText"
                        primary="Logout"
                        sx={{
                          opacity: open ? 1 : 0,
                          color: "var(--white)",
                        }}
                      />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              </Box>
            </Box>
          </List>
        </Box>
      </Drawer>

      {/* For Mobile and sm device Sidebar */}
      <Box sx={{ display: { md: "none", sm: "block", xs: "block" } }}>
        <DeskTopDrawer />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          py: { xs: 0, md: 0 },
          bgcolor: "var(--body)",
          width: "calc(100% - 240px)",
        }}
      >
        <Outlet></Outlet>
      </Box>
    </Box>
  );
};

export default UserDashboardSideBar;
