import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./App.css";

import AuthProvider from "./components/Contexts/AuthProvider";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import UserDashboardSideBar from "./components/UserDashboardSideBar/UserDashboardSideBar";
import getAuthToken from "./Token/getAuthToken";

// Public pages
import LandingPage from "./components/LandingPage/LandingPage";
import Aboutus from "./components/LandingPage/Aboutus";
import TermsAndContion from "./components/LandingPage/TermsAndContion";
import FaqPage from "./components/LandingPage/FaqPage";
import PrivacyPolicy from "./components/LandingPage/PrivacyPolicy";
import Contact from "./pages/Contact/Contact";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import ForgetPassword from "./components/ResetPassword/ForgetPassword";
import NotFound from "./components/NotFound/NotFound";
import Sitemap from "./components/LandingPage/Sitemap";

// Payment
import Response from "./components/Bkash/Response";
import PayWithBkash from "./components/Bkash/PayWithBkash";

// Dashboard & Home
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import UpcommingTrips from "./pages/Home/UpcommingTrips";

// Flight search & booking
import SearchResult from "./pages/SearchReslut/SearchResult";
import RoundSearchResult from "./pages/SearchReslut/RoundSearchResult";
import MultiCitySearchResult from "./components/MultiCitySearchResult/MultiCitySearchResult";
import FlightInformation from "./pages/FligthInformation/FlightInformation";
import MakeQuotation from "./components/MakeQuotation/MakeQuotation";
import GroupFlightShow from "./components/SingleFlight/GroupFlightShow";
import Congratulation from "./components/Congratulation/Congratulation";

// Booking management
import Queues from "./components/Queues/Queues/Queues";
import AllBookingStatus from "./components/Queues/Queues/AllBookingStatus";
import PnrImport from "./components/PnrImport/PnrImport";
import SearchHistory from "./components/SearchHistory/SearchHistory";

// Traveller
import Traveller from "./pages/Traveller/Traveller";
import AddTraveller from "./components/Traveller/AddTraveller";

// Staff
import Staff from "./components/Staff/Staff";
import AddStaff from "./components/AddStaff/AddStaff";

// Deposit
import Deposite from "./pages/Deposite/Deposite";
import AddDeposite from "./components/Deposit/AddDeposite";
import AllBank from "./components/Deposit/AllBank";

// Account & Reports
import MyAccount from "./components/MyAccount";
import Sales from "./components/UserReport/Sales";
import TransactionReport from "./components/UserReport/TransactionReport";
import LedgerReport from "./components/UserReport/LedgerReport";

const queryClient = new QueryClient();

function App() {
  const token = getAuthToken();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/contactUs" element={<Contact />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms&condition" element={<TermsAndContion />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/resetpassword" element={<ForgetPassword />} />
            <Route path="/payment/:message" element={<Response />} />
            <Route path="/paywithbkash" element={<PayWithBkash />} />

            {/* Auth-aware routes */}
            <Route
              path="/"
              element={token ? <Navigate to="/agent/dashboard" /> : <LandingPage />}
            />
            <Route
              path="/signin"
              element={token ? <Navigate to="/agent/dashboard" /> : <SignIn />}
            />
            <Route path="/signin/:email/:password" element={<SignIn />} />
            <Route
              path="/signup"
              element={token ? <Navigate to="/agent/dashboard" /> : <SignUp />}
            />

            {/* Protected agent routes */}
            <Route
              path="/agent"
              element={
                <PrivateRoute>
                  <UserDashboardSideBar />
                </PrivateRoute>
              }
            >
              <Route path="/agent/product" element={<Dashboard />} />
              <Route path="/agent/dashboard" element={<Home />} />

              <Route path="/agent/tripsdata" element={<UpcommingTrips />} />

              {/* Flight */}
              <Route path="/agent/groupfare" element={<GroupFlightShow />} />
              <Route path="/agent/searchresult" element={<SearchResult />} />
              <Route path="/agent/quotationsend" element={<MakeQuotation />} />
              <Route path="/agent/roundsearchresult" element={<RoundSearchResult />} />
              <Route path="/agent/multicityaftersearch" element={<MultiCitySearchResult />} />
              <Route path="/agent/flightinformation" element={<FlightInformation />} />

              {/* Booking */}
              <Route
                path="/agent/searchhistory"
                element={
                  <PrivateRoute>
                    <SearchHistory />
                  </PrivateRoute>
                }
              />
              <Route path="/agent/queues" element={<Queues />} />
              <Route path="/agent/:status" element={<AllBookingStatus />} />
              <Route path="/agent/pnrimport" element={<PnrImport />} />
              <Route
                path="/agent/bookingdetails/:uid/:bookingId/:tripType"
                element={
                  <PrivateRoute>
                    <Congratulation />
                  </PrivateRoute>
                }
              />

              {/* Traveller */}
              <Route path="/agent/traveller" element={<Traveller />} />
              <Route path="/agent/addtraveller" element={<AddTraveller />} />

              {/* Staff */}
              <Route path="/agent/staff" element={<Staff />} />
              <Route path="/agent/addstaff" element={<AddStaff />} />

              {/* Account */}
              <Route path="/agent/myaccount" element={<MyAccount />} />

              {/* Deposit */}
              <Route path="/agent/deposit" element={<Deposite />} />
              <Route path="/agent/allbank" element={<AllBank />} />
              <Route path="/agent/adddeposit" element={<AddDeposite />} />

              {/* Reports */}
              <Route path="/agent/sales" element={<Sales />} />
              <Route path="/agent/transaction" element={<TransactionReport />} />
              <Route path="/agent/ledger" element={<LedgerReport />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
