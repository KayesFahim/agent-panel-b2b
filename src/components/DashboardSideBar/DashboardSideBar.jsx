import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate, Outlet, Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import ViewDayOutlinedIcon from "@mui/icons-material/ViewDayOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import useAuthentication from "../../hooks/useAuthentication";
import "./DashboardSideBar.css";

const drawerWidth = 250;

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

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

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

const DashboardSideBar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const [subManu, setSubmenu] = useState("");
  const [subManuActive, setSubMenuActive] = useState("");
  const [active, setactive] = useState("");

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  const { logout } = useAuthentication();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          style={{
            background: "var(--white)",
            display: "block",
          }}
        >
          <Box onClick={() => setOpen(!open)}>
            <MenuIcon
              style={{
                color: "#fff",
                fontSize: "28px",
                margin: "20px 15px 10px 15px",
              }}
            />
          </Box>
        </DrawerHeader>

        <List
          style={{
            height: "100vh",
            background: "white",
          }}
        >
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/dashboardhome/dashboard");
              setSubMenuActive("Dashboard");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                background: subManu === "Dashboard" ? "var(--white)" : "",
                width: "90%",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <HomeOutlinedIcon
                  style={{
                    // color: open === false ? "var(--white)" : "var(--white)",
                    fontSize: "28px",
                    margin: "10px 0px",
                    color:
                      subManu === "Dashboard" ? "var(--black)" : "var(--white)",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                onClick={() => setSubmenu("Dashboard")}
                primary="Dashboard"
                sx={{
                  opacity: open ? 1 : 0,
                  color:
                    subManu === "Dashboard" ? "var(--black)" : "var(--white)",
                }}
              />
            </ListItemButton>
          </ListItem>
          {/* booking  */}
          <Box>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/dashboardhome/queues");
                setSubMenuActive("My Booking");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  background: subManu === "Bookings" ? "var(--white)" : "",
                  width: "90%",
                  borderTopRightRadius: "5px",
                  // borderBottomRightRadius:'5px',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ViewDayOutlinedIcon
                    style={{
                      // color: open === false ? "var(--white)" : "var(--white)",
                      fontSize: "28px",
                      margin: "10px 0px",
                      color:
                        subManu === "Bookings"
                          ? "var(--black)"
                          : "var(--white)",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  onClick={() => setSubmenu("Bookings")}
                  primary="Bookings"
                  sx={{
                    opacity: open ? 1 : 0,
                    color:
                      subManu === "Bookings" ? "var(--black)" : "var(--white)",
                  }}
                />
              </ListItemButton>
            </ListItem>

            <Box
              style={{
                // boxSizing:'border-box',
                // paddingLeft:'70px',
                display: subManu === "Bookings" ? "" : "none",
                background: open ? "var(--white)" : "",
              }}
              className="DashSubManu"
            >
              <Box className="DashSubManuChild" sx={{ opacity: open ? 1 : 0 }}>
                <Link
                  style={{
                    display: "block",
                    background:
                      subManuActive === "My Booking"
                        ? "var( --secondary-color)"
                        : "",
                    color: subManuActive === "My Booking" ? "var(--white)" : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("My Booking");
                  }}
                >
                  My Booking
                </Link>
                <Link
                  style={{
                    display: "block",
                    background:
                      subManuActive === "Group Fare"
                        ? "var( --secondary-color)"
                        : "",
                    color: subManuActive === "Group Fare" ? "var(--white)" : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("Group Fare");
                  }}
                >
                  Group Fare
                </Link>
                <Link
                  style={{
                    display: "block",
                    background:
                      subManuActive === "Hotel"
                        ? "var( --secondary-color)"
                        : "",
                    color: subManuActive === "Hotel" ? "var(--white)" : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("Hotel");
                  }}
                >
                  Hotel
                </Link>
                <Link
                  style={{
                    display: "block",
                    background:
                      subManuActive === "Tour" ? "var( --secondary-color" : "",
                    color: subManuActive === "Tour" ? "var(--white)" : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("Tour");
                  }}
                >
                  Tour
                </Link>
              </Box>
            </Box>
          </Box>

          {/* manage  */}
          <Box>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/dashboardhome/traveller");
                setSubMenuActive("Traveler");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  background: subManu === "Manage" ? "var(--white)" : "",
                  width: "90%",
                  borderTopRightRadius: "5px",
                  // borderBottomRightRadius:'5px',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ManageAccountsOutlinedIcon
                    style={{
                      // color: open === false ? "var(--white)" : "var(--white)",
                      fontSize: "28px",
                      margin: "10px 0px",
                      color:
                        subManu === "Manage" ? "var(--black)" : "var(--white)",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  onClick={() => setSubmenu("Manage")}
                  primary="Manage"
                  sx={{
                    opacity: open ? 1 : 0,
                    color:
                      subManu === "Manage" ? "var(--black)" : "var(--white)",
                  }}
                />
              </ListItemButton>
            </ListItem>

            <Box
              style={{
                // boxSizing:'border-box',
                // paddingLeft:'70px',
                display: subManu === "Manage" ? "" : "none",
                background: open ? "var(--white)" : "",
              }}
              className="DashSubManu"
            >
              <Box className="DashSubManuChild" sx={{ opacity: open ? 1 : 0 }}>
                <Link
                  style={{
                    display: "block",
                    background:
                      subManuActive === "Traveler"
                        ? "var( --secondary-color)"
                        : "",
                    color: subManuActive === "Traveler" ? "var(--white)" : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("Traveler");
                  }}
                >
                  Traveler
                </Link>
                <Link
                  style={{
                    display: "block",
                    background:
                      subManuActive === "Markup"
                        ? "var( --secondary-color)"
                        : "",
                    color: subManuActive === "Markup" ? "var(--white)" : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("Markup");
                  }}
                >
                  Markup
                </Link>
              </Box>
            </Box>
          </Box>

          {/* Account  */}
          <Box>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/dashboardhome/deposite");
                setSubMenuActive("Deposit Request");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  background: subManu === "Account" ? "var(--white)" : "",
                  width: "90%",
                  borderTopRightRadius: "5px",
                  // borderBottomRightRadius:'5px',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AccountBalanceOutlinedIcon
                    style={{
                      // color: open === false ? "var(--white)" : "var(--white)",
                      fontSize: "28px",
                      margin: "10px 0px",
                      color:
                        subManu === "Account" ? "var(--black)" : "var(--white)",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  onClick={() => setSubmenu("Account")}
                  primary="Account"
                  sx={{
                    opacity: open ? 1 : 0,
                    color:
                      subManu === "Account" ? "var(--black)" : "var(--white)",
                  }}
                />
              </ListItemButton>
            </ListItem>

            <Box
              style={{
                // boxSizing:'border-box',
                // paddingLeft:'70px',
                display: subManu === "Account" ? "" : "none",
                background: open ? "var(--white)" : "",
              }}
              className="DashSubManu"
            >
              <Box className="DashSubManuChild" sx={{ opacity: open ? 1 : 0 }}>
                <Link
                  to={"/dashboardhome/deposite"}
                  style={{
                    display: "block",
                    background:
                      subManuActive === "Deposit Request"
                        ? "var( --secondary-color)"
                        : "",
                    color:
                      subManuActive === "Deposit Request" ? "var(--white)" : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("Deposit Request");
                  }}
                >
                  Deposit Request
                </Link>
                <Link
                  to={"/dashboardhome/admin/addbank"}
                  style={{
                    display: "block",
                    background:
                      subManuActive === "Bank Account"
                        ? "var( --secondary-color)"
                        : "",
                    color:
                      subManuActive === "Bank Account" ? "var(--white)" : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("Bank Account");
                  }}
                >
                  Bank Account
                </Link>
                <Link
                  to={"/dashboardhome/generalledger"}
                  style={{
                    display: "block",
                    background:
                      subManuActive === "General Ledger"
                        ? "var( --secondary-color)"
                        : "",
                    color:
                      subManuActive === "General Ledger" ? "var(--white)" : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("General Ledger");
                  }}
                >
                  General Ledger
                </Link>
                <Link
                  to={"/dashboardhome/admin/account"}
                  style={{
                    display: "block",
                    background:
                      subManuActive === "My Account"
                        ? "var( --secondary-color)"
                        : "",
                    color: subManuActive === "My Account" ? "var(--white)" : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("My Account");
                  }}
                >
                  My Account
                </Link>
              </Box>
            </Box>
          </Box>

          {/* Report  */}
          <Box>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/dashboardhome/generalLedgerReport");
                setSubMenuActive("General Report");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  background: subManu === "Report" ? "var(--white)" : "",
                  width: "90%",
                  borderTopRightRadius: "5px",
                  // borderBottomRightRadius:'5px',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AssessmentOutlinedIcon
                    style={{
                      // color: open === false ? "var(--white)" : "var(--white)",
                      fontSize: "28px",
                      margin: "10px 0px",
                      color:
                        subManu === "Report" ? "var(--black)" : "var(--white)",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  onClick={() => setSubmenu("Report")}
                  primary="Report"
                  sx={{
                    opacity: open ? 1 : 0,
                    color:
                      subManu === "Report" ? "var(--black)" : "var(--white)",
                  }}
                />
              </ListItemButton>
            </ListItem>

            <Box
              style={{
                // boxSizing:'border-box',
                // paddingLeft:'70px',
                display: subManu === "Report" ? "" : "none",
                background: open ? "var(--white)" : "",
              }}
              className="DashSubManu"
            >
              <Box className="DashSubManuChild" sx={{ opacity: open ? 1 : 0 }}>
                <Link
                  style={{
                    display: "block",
                    background:
                      subManuActive === "General Report"
                        ? "var( --secondary-color)"
                        : "",
                    color:
                      subManuActive === "General Report" ? "var(--white)" : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("General Report");
                  }}
                >
                  General Report
                </Link>
              </Box>
            </Box>
          </Box>

          {/* logout */}

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/");
              setSubMenuActive("Logout");
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                background: subManu === "Logout" ? "var(--white)" : "",
                width: "90%",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutOutlinedIcon
                  style={{
                    // color: open === false ? "var(--white)" : "var(--white)",
                    fontSize: "28px",
                    margin: "10px 0px",
                    color:
                      subManu === "Logout" ? "var(--black)" : "var(--white)",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                onClick={() => setSubmenu("Logout")}
                primary="Logout"
                sx={{
                  opacity: open ? 1 : 0,
                  color: subManu === "Logout" ? "var(--black)" : "var(--white)",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet></Outlet>
      </Box>
    </Box>
  );
};

export default DashboardSideBar;
