/* eslint-disable no-restricted-globals */
import { Box, Button, Container, Grid, Typography, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import { format } from "date-fns";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import _secureLocalStorage from "react-secure-storage";
const secureLocalStorage = _secureLocalStorage.default || _secureLocalStorage;
import Swal from "sweetalert2";
import FlightSearchBox from "../../components/FlightSearchBox/FlightSearchBox";
import Header from "../../components/Header/Header";
import SessionTimer from "../../components/Shared/SessionTimer/SessionTimer";
import SingleFlight from "../../components/SingleFlight/SingleFlight";
import Search from "../../images/undraw/undraw_web_search_re_efla.svg";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import FilterLoader from "./../../components/Loader/FilterLoader";
import ResultLoader from "./../../components/Loader/ResultLoader";
import { debounce } from "../../Common/debounce.js";
import AirlinesFilter from "../../components/AirlinesFilter/AirlinesFilter";
import HeaderSlider from "../../components/AirlineSlider/HeaderSlider";
import CustomPagination from "./CustomPagination";
import getAuthToken from "../../Token/getAuthToken";
const modalStyle = {
  position: "relative",
  margin: "auto",
  width: { lg: "75vw", md: "85vw", sm: "90vw", xs: "95vw" },
  maxWidth: "1200px",
  padding: { xs: "10px", sm: "15px", md: "25px" },
  background: "var(--primary-color)",
  borderRadius: "8px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};

const RoundSearchResult = () => {
  const token = getAuthToken();
  const [quotetionArr, setQuotetionArr] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [filterPageIndex, setFilterPageIndex] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);
  const [selectedAirlins, setSelectedAirlins] = useState([]);
  const [selectedRefundable, setSelectedRefundable] = useState([]);
  const [selectedDepartTime, setSelectedDepartTime] = useState({
    name: "",
    type: "",
    startTime: "",
    endTime: "",
  });
  const [selectedArrivalTime, setSelectedArrivalTime] = useState({
    name: "",
    type: "",
    startTime: "",
    endTime: "",
  });
  const [selectedBackDepartTime, setSelectedBackDepartTime] = useState({
    name: "",
    type: "",
    startTime: "",
    endTime: "",
  });
  const [selectedBackArrivalTime, setSelectedBackArrivalTime] = useState({
    name: "",
    type: "",
    startTime: "",
    endTime: "",
  });

  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [filterData, setFilterData] = useState([]);
  const [selectedLayover, setSelectedLayover] = useState([]);
  const [selectedBaggage, setSelectedBaggage] = useState([]); // array of allowance strings e.g. ['20 KG','40 KG']
  const [selectedDepartSlot, setSelectedDepartSlot] = useState([]); // 'morning'|'noon'|'evening'|'night'
  const [selectedDuration, setSelectedDuration] = useState("all"); // 'all'|'short'|'medium'|'long'

  // --------------new Sate end --------------------------------
  // --------------functionality start  --------------------------------

  const handleResetData = useCallback(() => {
    setPageIndex(0);
    setFilterPageIndex(null);
    setSelectedProvider([]);
    setSelectedAirlins([]);
    setSelectedStops([]);
    setSelectedRefundable([]);
    setSelectedDepartTime({ name: "", type: "", startTime: "", endTime: "" });
    setSelectedArrivalTime({ name: "", type: "", startTime: "", endTime: "" });
    setSelectedBackDepartTime({
      name: "",
      type: "",
      startTime: "",
      endTime: "",
    });
    setSelectedBackArrivalTime({
      name: "",
      type: "",
      startTime: "",
      endTime: "",
    });
    setSelectedLayover([]);
    setSelectedBaggage([]);
    setSelectedDepartSlot([]);
    setSelectedDuration("all");
    setFilterData(data);
  }, [data]);
  // --------------func end --------------------------------

  const navigate = useNavigate();
  const location = useLocation();
  const requiredSearchData =
    location.state !== null
      ? location.state
      : secureLocalStorage.getItem("search-data");

  const {
    fromSendData,
    toSendData,
    departureDate,
    returningDate,
    adultCount,
    childCount,
    infant,
    tripType,
    faddress,
    toAddress,
    fromSearchText,
    toSearchText,
    className,
    directFlightOnly,
  } = requiredSearchData;

  const multicity = secureLocalStorage.getItem("multi-city");
  const [multiCitySearchData, setMultiCitySearchData] = useState({
    adultcount: adultCount,
    childcount: childCount,
    infantcount: infant,
    connection: 2,
    cabinclass: className || "Y",
    segments: [
      {
        id: 0,
        openFrom: false,
        depfrom: fromSendData.trim(),
        depFromText: fromSearchText.trim(),
        arrto: "DXB",
        arrToText: "Dubai Intl Airport [DXB]",
        openTo: false,
        depdate: new Date().toLocaleDateString("sv"),
        openDate: false,
        open: false,
      },
    ],
  });

  const [options, setOptions] = useState({
    showCalendarAvailability: false,
    directFlightOnly: false,
    includeCheckedBaggage: false,
  });

  const [type, setType] = React.useState("flight");
  const [value, setValue] = React.useState(tripType);
  const [roundWayFromSearchText, setRoundWayFromSearchText] =
    useState(fromSearchText);
  const [roundWayToSearchText, setRoundWayToSearchText] =
    useState(toSearchText);
  const now = useRef(new Date(departureDate));
  const returnNow = useRef(new Date(returningDate));
  const [from, setFrom] = useState(now.current);
  const [to, setTo] = useState(returnNow.current);
  const [fromSearchDate, setFromSearchDate] = useState(departureDate);
  const [toSearchDate, setToSearchDate] = useState(returningDate);

  const [roundWayFaddress, setRoundWayFaddress] = useState(faddress);
  const [roundWayToAddress, setRoundWayToAddress] = useState(toAddress);
  const [roundWayFromSendData, setRoundWayFromSendData] =
    useState(fromSendData);
  const [roundWayToSendData, setRoundWayToSendData] = useState(toSendData);
  const [roundWayAdultCount, setRoundWayAdultCount] = useState(adultCount);
  const [roundWayChildCount, setRoundWayChildCount] = useState(childCount);
  const [roundWayInfant, setRoundWayInfant] = useState(infant);
  const [result, setResult] = useState(adultCount + childCount + infant);
  const [roundWayClassName, setRoundWayClassName] = useState(className);
  const [isPrevClicked, setIsPrevCliked] = useState(false);
  const [isNextClicked, setIsNextCliked] = useState(false);
  const [directFlight, setDirectFlight] = useState(directFlightOnly);
  //end

  //CM Box States
  const [customerFare, setCustomerFare] = useState(true);
  const [agentFarePrice, setAgentFarePrice] = useState(true);
  const [commisionFarePrice, setCommisionFarePrice] = useState(true);
  //todo:end

  //todo:all flight and nxt and previous day data states
  const [data2, setData2] = useState([]);
  const [noData, setNoData] = useState("No Data");
  const [modifyOpen, setModifyOpen] = useState(false);
  const modifyHandleOpen = () => setModifyOpen(true);
  const modifyHandleClose = () => setModifyOpen(false);
  //todo: state for retrigger useEffect
  const [changeState, setChangeState] = useState(null);
  //todo: End for retrigger useEffect
  //todo: state for from date change
  const [changeFrom, setChangeFrom] = useState(false);
  //todo: End state for from date change
  // todo:Sets the state of the const for the given page and state.
  const [page, setPage] = useState(1);
  let size = 30;
  // todo: previous day and next day date variables
  let tomorrowDepartureDate = new Date(fromSearchDate);
  let tomorrowReturnDate = new Date(toSearchDate);
  tomorrowDepartureDate.setDate(tomorrowDepartureDate.getDate() + 1);
  tomorrowReturnDate.setDate(tomorrowReturnDate.getDate() + 1);
  let yesterdayDepartureDate = new Date(fromSearchDate);
  let yesterdayReturnDate = new Date(toSearchDate);
  yesterdayDepartureDate.setDate(yesterdayDepartureDate.getDate() - 1);
  yesterdayReturnDate.setDate(yesterdayReturnDate.getDate() - 1);
  // Handle a page change.
  const handlePageChange = (event, value) => {
    setPage(value);
    setData2(data?.slice((value - 1) * size, value * size));
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // get the target element to toggle

  //todo All Flight Data for Today

  useEffect(() => {
    let unSubscribed = false;
    setIsPrevCliked(false);
    setIsNextCliked(false);
    setIsLoaded(false);
    modifyHandleClose();
    let url = `${import.meta.env.REACT_APP_API_URL}/agent/flight/search`;

    let body = {
      adultcount: adultCount,
      childcount: childCount,
      infantcount: infant,
      connection: 2,
      cabinclass: roundWayClassName || "Y",
      segments: [
        {
          depfrom: fromSendData?.replace(/\s+/g, ""),
          arrto: toSendData,
          depdate: new Date(departureDate).toLocaleDateString("sv"),
        },
        {
          depfrom: toSendData,
          arrto: fromSendData?.replace(/\s+/g, ""),
          depdate: new Date(returningDate).toLocaleDateString("sv"),
        },
      ],
    };

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })

      .then((data) => {
        if (!unSubscribed) {
          if (data.length !== 0) {
            const uniqueData = data;
            setData(uniqueData);
            setFilterData(uniqueData);
            setData2(uniqueData);
            setIsLoaded(true);
          } else {
            throw new Error("No Flights Found");
          }
        }
      })
      .catch(async (err) => {
        let errorMessage = "An unexpected error occurred.";
        if (err.message === "No Flights Found") {
          errorMessage = "No Flights Found";
        }
        await Swal.fire({
          imageUrl: Search,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: errorMessage,
          confirmButtonText: "Search Again...",
          confirmButtonColor: "var(--primary-color)",
        }).then(function () {
          navigate("/agent/product");
        });
      });
    return () => {
      unSubscribed = true;
    };
  }, [
    changeState,
    departureDate,
    returningDate,
    fromSendData,
    toSendData,
    adultCount,
    childCount,
    infant,
    navigate,
    size,
    tripType,
  ]);

  useEffect(() => {
    handleResetData();
  }, [data]);

  // ----------------Functionality start ----------------
  // uniqueLayover
  const uniqueLayover = Array.from(
    new Set(
      data
        ?.filter((item) => item.AllLegsInfo[0].Segments.length > 1)
        .map((item) => ({
          name:
            item.AllLegsInfo[0].Segments.length > 2
              ? item.AllLegsInfo[0].Segments[2].DepAirPort
              : item.AllLegsInfo[0].Segments[1].DepAirPort,
          code:
            item.AllLegsInfo[0].Segments.length > 2
              ? item.AllLegsInfo[0].Segments[2].DepFrom
              : item.AllLegsInfo[0].Segments[1].DepFrom,
        }))
        .map((entry) => JSON.stringify(entry))
    )
  ).map((str) => JSON.parse(str));
  // ----------------filter-------------

  // price Slider
  // let arr = [];
  // data.map((item) => {
  //   arr.push(item.NetFare);
  //   return arr;
  // });

  // const maxPrice = Math.max(...arr);
  // const minPrice = Math.min(...arr);
  // const [selectPrice, setSelectPrice] = useState([minPrice, maxPrice]);

  const handleSelection = (name, setSelected) => {
    setSelected((prevSelected) => {
      const isSelected = prevSelected.includes(name);
      return isSelected
        ? prevSelected.filter((item) => item !== name)
        : [...prevSelected, name];
    });

    setFilterPageIndex(name); // 2 or 3.. move page after filter setdata
  };

  // const handleChangePrice = (event, newPrice) => {
  //   handleSelection(newPrice, setSelectPrice);
  // };

  const handleProvider = (name) => {
    handleSelection(name, setSelectedProvider);
  };
  const handleStops = (name) => {
    handleSelection(name, setSelectedStops);
  };
  const handleAirLine = (name) => {
    handleSelection(name, setSelectedAirlins);
  };
  const handleRefundable = (name) => {
    handleSelection(name, setSelectedRefundable);
  };
  // Date Filter
  const handleDepartTime = useCallback(
    (type, name, startTime, endTime) => {
      const startDate = new Date(`1970-01-01T${startTime}`);
      const endDate = new Date(`1970-01-01T${endTime}`);
      switch (type) {
        case "Depart":
          setSelectedDepartTime(
            name === selectedDepartTime.name
              ? { name: "", type: "", startTime: "", endTime: "" }
              : { name, type: type, startTime: startDate, endTime: endDate }
          );
          break;
        case "Arrival":
          setSelectedArrivalTime(
            name === selectedArrivalTime.name
              ? { name: "", type: "", startTime: "", endTime: "" }
              : { name, type: type, startTime: startDate, endTime: endDate }
          );
          break;
        // for roundway
        case "returnDepart":
          setSelectedBackDepartTime(
            name === selectedBackDepartTime.name
              ? { name: "", type: "", startTime: "", endTime: "" }
              : { name, type: type, startTime: startDate, endTime: endDate }
          );
          break;
        case "returnArrival":
          setSelectedBackArrivalTime(
            name === selectedBackArrivalTime.name
              ? { name: "", type: "", startTime: "", endTime: "" }
              : { name, type: type, startTime: startDate, endTime: endDate }
          );
          break;
        default:
          break;
      }
    },
    [
      selectedDepartTime,
      selectedArrivalTime,
      selectedBackDepartTime,
      selectedBackArrivalTime,
    ]
  );

  const handleLayover = (name) => {
    handleSelection(name, setSelectedLayover);
  };
  const handleBaggage = (val) => handleSelection(val, setSelectedBaggage);
  const handleDepartSlot = (slot) => handleSelection(slot, setSelectedDepartSlot);
  const handleDuration = (val) => setSelectedDuration(prev => prev === val ? "all" : val);
  const filter = () => {
    let updateData = data; // Assuming 'data' is your original dataset
    // if (selectPrice.length > 0) {
    //   updateData = updateData.filter((item) =>
    //     selectPrice.includes(item.NetFare)
    //   );
    // }
    if (selectedProvider.length > 0) {
      updateData = updateData.filter((item) =>
        selectedProvider.includes(item.System)
      );
    }
    if (selectedStops.length > 0) {
      updateData = updateData.filter((item) =>
        selectedStops.includes(item.AllLegsInfo[0].Segments.length)
      );
    }
    if (selectedAirlins.length > 0) {
      updateData = updateData.filter((item) =>
        selectedAirlins.includes(item.Carrier)
      );
    }
    if (selectedRefundable.length > 0) {
      updateData = updateData.filter((item) =>
        selectedRefundable.includes(item.Refundable)
      );
    }

    if (
      selectedDepartTime.type === "Depart" &&
      selectedDepartTime.name.length > 0
    ) {
      updateData = updateData.filter((item) => {
        const time = new Date(
          `1970-01-01T${item.AllLegsInfo[0].Segments[0][0].DepTime.slice(
            11,
            19
          )}`
        );
        return (
          time >= selectedDepartTime.startTime &&
          time <= selectedDepartTime.endTime
        );
      });
    }

    if (selectedArrivalTime.type === "Arrival") {
      updateData = updateData.filter((item) => {
        const time = new Date(
          `1970-01-01T${item.AllLegsInfo[0].Segments[0][
            item.AllLegsInfo[0].Segments[0].length - 1
          ].ArrTime.slice(11, 19)}`
        );
        return (
          time >= selectedArrivalTime.startTime &&
          time <= selectedArrivalTime.endTime
        );
      });
    }

    if (selectedBackDepartTime.type === "returnDepart") {
      updateData = updateData.filter((item) => {
        const time = new Date(
          `1970-01-01T${item.AllLegsInfo[0].Segments[
            item.AllLegsInfo[0].Segments.length - 1
          ][
            item.AllLegsInfo[0].Segments[
              item.AllLegsInfo[0].Segments.length - 1
            ].length - 1
          ].DepTime.slice(11, 19)}`
        );
        return (
          time >= selectedBackDepartTime.startTime &&
          time <= selectedBackDepartTime.endTime
        );
      });
    }

    if (selectedBackArrivalTime.type === "returnArrival") {
      updateData = updateData.filter((item) => {
        const time = new Date(
          `1970-01-01T${item.AllLegsInfo[0].Segments[
            item.AllLegsInfo[0].Segments.length - 1
          ][
            item.AllLegsInfo[0].Segments[
              item.AllLegsInfo[0].Segments.length - 1
            ].length - 1
          ].ArrTime.slice(11, 19)}`
        );
        return (
          time >= selectedBackArrivalTime.startTime &&
          time <= selectedBackArrivalTime.endTime
        );
      });
    }

    if (selectedLayover.length > 0) {
      updateData = updateData.filter((item) => {
        const segments = item.AllLegsInfo[0].Segments;
        const DepFrom =
          (segments.length === 2 && segments[1].DepFrom) ||
          (segments.length > 2 && segments[2].DepFrom);
        return selectedLayover.includes(DepFrom);
      });
    }

    // Baggage filter
    if (selectedBaggage.length > 0) {
      updateData = updateData.filter((item) => {
        const raw = (item?.PriceBreakDown?.[0]?.Bag?.[0]?.Allowance || "").trim().toUpperCase();
        const isNoBag = !raw || raw === "0" || raw.startsWith("0 ");
        return selectedBaggage.some(sel => {
          if (sel === 'NO BAG') return isNoBag;
          return raw === sel.toUpperCase().trim();
        });
      });
    }

    // Departure time slot filter
    if (selectedDepartSlot.length > 0) {
      updateData = updateData.filter((item) => {
        const depTimeStr = item?.AllLegsInfo?.[0]?.Segments?.[0]?.DepTime;
        if (!depTimeStr) return false;
        const hour = new Date(depTimeStr.split('+')[0]).getHours();
        return selectedDepartSlot.some(slot => {
          if (slot === 'morning') return hour >= 6 && hour < 12;
          if (slot === 'noon') return hour >= 12 && hour < 17;
          if (slot === 'evening') return hour >= 17 && hour < 21;
          if (slot === 'night') return hour >= 21 || hour < 6;
          return false;
        });
      });
    }

    // Duration / transit filter
    if (selectedDuration !== "all") {
      updateData = updateData.filter((item) => {
        const totalDuration = item?.AllLegsInfo?.reduce((s, l) => s + (l.Duration || 0), 0) || 0;
        if (selectedDuration === 'short') return totalDuration <= 180;    // ≤3h
        if (selectedDuration === 'medium') return totalDuration > 180 && totalDuration <= 480; // 3-8h
        if (selectedDuration === 'long') return totalDuration > 480;     // >8h
        return true;
      });
    }

    setFilterData(updateData);
  };

  const groupedFilterData = useMemo(() => {
    const getFlightScheduleKey = (flight) => {
      if (!flight?.AllLegsInfo) return "";
      return flight.AllLegsInfo.map(leg => {
        if (!leg?.Segments) return "";
        return leg.Segments.map(seg => {
          const carrier = seg.MarketingCarrier || seg.Carrier || "";
          const flightNo = seg.MarketingFlightNumber || seg.FlightNumber || "";
          const dep = seg.DepAirPort || seg.DepFrom || "";
          const arr = seg.ArrAirPort || seg.ArrTo || "";
          const depTime = (seg.DepTime || "").split('+')[0];
          return `${carrier}-${flightNo}-${dep}-${arr}-${depTime}`;
        }).join("|");
      }).join("||");
    };

    const groups = new Map();
    (filterData || []).forEach(f => {
      const key = getFlightScheduleKey(f);
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key).push(f);
    });

    return Array.from(groups.values()).map(group => {
      // Sort group by price ascending within each group
      group.sort((a, b) => (a.NetFare || a.GrossFare || 0) - (b.NetFare || b.GrossFare || 0));
      return {
        primary: group[0],
        options: group
      };
    });
  }, [filterData]);

  const itemsPerPage = innerWidth > 600 ? 20 : 10;
  const startIndex = filterPageIndex ? 0 : pageIndex;

  const pageData =
    isLoaded &&
    (groupedFilterData || []).slice(
      startIndex * itemsPerPage,
      startIndex * itemsPerPage + itemsPerPage
    );

  const gotoPage = useCallback((value) => {
    setFilterPageIndex(0);
    setPageIndex(value);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  const pageLength = innerWidth > 600 ? 20 : 10;
  const pageCount = useMemo(
    () => Math.ceil(groupedFilterData.length / pageLength),
    [groupedFilterData.length]
  );
  const canPreviousPage = useMemo(() => pageIndex > 0, [pageIndex]);
  const canNextPage = useMemo(
    () => pageIndex < pageCount - 1,
    [pageIndex, pageCount]
  );

  const debouncedFilter = debounce(filter, 300);
  useEffect(() => {
    debouncedFilter();
    return () => {
      debouncedFilter.cancel();
    };
  }, [
    selectedProvider,
    selectedRefundable,
    selectedAirlins,
    selectedLayover,
    selectedStops,
    selectedDepartTime,
    selectedArrivalTime,
    selectedBackDepartTime,
    selectedBackArrivalTime,
    selectedBaggage,
    selectedDepartSlot,
    selectedDuration,
    data,
  ]);

  // slider shorting
  const uniqueCarriers = Array.from(
    new Set(data?.filter((item) => item.Carrier).map((item) => item.Carrier))
  );
  const flightresults = uniqueCarriers.map((carrier) => {
    const filteredData = data?.filter((item) => item.Carrier === carrier);
    const minPrice = Math.min(
      ...filteredData.map((item) => parseInt(item.GrossFare))
    );
    const carrierName = filteredData[0].CarrierName;
    // change this property after add
    return {
      code: carrier,
      name: carrierName,
      price: minPrice.toString(),
      currency: filteredData[0]?.Currency || "PKR",
    };
  });

  const totalFlight = data?.length;

  return (
    <Box>
      <Header />
      <Box mt={{ xs: 12, sm: 10, md: 2 }}>
        <Container sx={{ position: "relative", px: { xs: 1, sm: 2 } }}>
          <Grid container justifyContent="space-between" columnSpacing={2}>
            {/* //todo: filter*/}
            <Grid
              item
              md={3.0}
              sx={{
                display: { xs: "none", sm: "none", md: "none", lg: "block" },
              }}
            >
              {isLoaded ? (
                <AirlinesFilter
                  flightData={data}
                  tripType={tripType}
                  selectedProvider={selectedProvider}
                  handleProvider={handleProvider}
                  handleRefundable={handleRefundable}
                  handleAirLine={handleAirLine}
                  selectedAirlins={selectedAirlins}
                  handleStops={handleStops}
                  selectedStops={selectedStops}
                  selectedRefundable={selectedRefundable}
                  selectedLayover={selectedLayover}
                  handleDepartTime={handleDepartTime}
                  selectedDepartTime={selectedDepartTime}
                  selectedArrivalTime={selectedArrivalTime}
                  selectedBackDepartTime={selectedBackDepartTime}
                  selectedBackArrivalTime={selectedBackArrivalTime}
                  handleLayover={handleLayover}
                  uniqueLayover={uniqueLayover}
                  handleResetData={handleResetData}
                  uniqueCarriers={flightresults}
                  selectedBaggage={selectedBaggage}
                  handleBaggage={handleBaggage}
                  selectedDepartSlot={selectedDepartSlot}
                  handleDepartSlot={handleDepartSlot}
                  selectedDuration={selectedDuration}
                  handleDuration={handleDuration}
                />
              ) : (
                <FilterLoader />
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={9.0}>
              {/* //todo: Flight Search Result section */}
              <Box
                sx={{
                  bgcolor: "#DEEFF5",
                  overflow: "hidden",
                  px: { xs: 1, md: 2 },
                  py: { xs: 1, md: 1.5 },
                  borderRadius: "5px",
                  mb: isLoaded ? 2 : "",
                }}
              >
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography
                      sx={{
                        color: "var(--primary-color)",
                        fontWeight: 600,
                        fontSize: "13px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {format(
                        new Date(departureDate || fromSearchDate),
                        "dd MMM yyyy"
                      )}
                      &nbsp;
                      <OpenInFullIcon
                        sx={{
                          color: "var(--primary-color)",
                          transform: "rotate(45deg)",
                          fontSize: { xs: 10, md: 14 },
                        }}
                      />
                      &nbsp;
                      {format(
                        new Date(returningDate || toSearchDate),
                        "dd MMM yyyy"
                      )}{" "}
                      ({fromSendData}&nbsp;
                      <OpenInFullIcon
                        sx={{
                          color: "var(--primary-color)",
                          transform: "rotate(45deg)",
                          fontSize: { xs: 10, md: 14 },
                        }}
                      />
                      &nbsp;
                      {toSendData})
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: "13px",
                      }}
                    >
                      Total passenger {adultCount + childCount + infant}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    sx={{
                      display: "flex",
                      justifyContent: { xs: "space-between", md: "end" },
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Tooltip title="Session Time">
                      <Button
                        size="small"
                        style={{
                          width: "fit-content",
                          border: "1.2px solid var(--primary-color)",
                          color: "var(--primary-color)",
                        }}
                      >
                        <SessionTimer />
                      </Button>
                    </Tooltip>
                    <Button
                      size="small"
                      onClick={modifyHandleOpen}
                      style={{
                        backgroundColor: "var(--p1)",
                        color: "var(--white)",
                        padding: "5px 10px",
                        cursor: "pointer",
                        fontSize: 14,
                        textTransform: "capitalize",
                      }}
                    >
                      Modify Search
                    </Button>
                  </Grid>
                </Grid>
                <Modal
                   open={modifyOpen}
                   onClose={modifyHandleClose}
                   style={{
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     overflow: "auto",
                   }}
                 >
                   <Container sx={{ outline: "none", my: 2 }}>
                     <Box sx={modalStyle}>
                      <FlightSearchBox
                        options={options}
                        setOptions={setOptions}
                        type={type}
                        setType={setType}
                        value={value}
                        setValue={setValue}
                        fromSearchText={roundWayFromSearchText}
                        setFromSearchText={setRoundWayFromSearchText}
                        toSearchText={roundWayToSearchText}
                        setToSearchText={setRoundWayToSearchText}
                        from={from}
                        setFrom={setFrom}
                        to={to}
                        setTo={setTo}
                        faddress={roundWayFaddress}
                        setfaddress={setRoundWayFaddress}
                        toAddress={roundWayToAddress}
                        setToAddress={setRoundWayToAddress}
                        fromSendData={roundWayFromSendData}
                        setFromSendData={setRoundWayFromSendData}
                        toSendData={roundWayToSendData}
                        setToSendData={setRoundWayToSendData}
                        adultCount={roundWayAdultCount}
                        setAdultCount={setRoundWayAdultCount}
                        childCount={roundWayChildCount}
                        setChildCount={setRoundWayChildCount}
                        infant={roundWayInfant}
                        setInfant={setRoundWayInfant}
                        result={result}
                        setResult={setResult}
                        className={roundWayClassName}
                        setClassName={setRoundWayClassName}
                        changeState={changeState}
                        setChangeState={setChangeState}
                        changeFrom={changeFrom}
                        setChangeFrom={setChangeFrom}
                        searchData={multiCitySearchData}
                        setSearchData={setMultiCitySearchData}
                        directFlightOnly={directFlight}
                        setDirectFlightOnly={setDirectFlight}
                      />
                    </Box>
                  </Container>
                </Modal>
              </Box>

              <Grid container>
                {/* //todo:Search Result Section */}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  {isLoaded ? (
                    <Box>
                      <HeaderSlider
                        uniqueCarriers={flightresults}
                        selectedAirlins={selectedAirlins}
                        handleAirLine={handleAirLine}
                      />

                      {!filterData?.length > 0 ? (
                        <Box
                          sx={{
                            height: "50Vh",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--crimson)",
                          }}
                        >
                          No Flight Available
                        </Box>
                      ) : (
                        <Box mt={2}>
                          {pageData.map((data, index) => {
                            return (
                              <SingleFlight
                                key={index}
                                flightData={data.primary}
                                groupedFlights={data.options}
                                tripType={tripType}
                                adultCount={adultCount}
                                childCount={childCount}
                                infant={infant}
                                from={fromSendData}
                                to={toSendData}
                                fromAddress={faddress}
                                toAddress={toAddress}
                                agentFarePrice={agentFarePrice}
                                setAgentFarePrice={setAgentFarePrice}
                                commisionFarePrice={commisionFarePrice}
                                setCommisionFarePrice={setCommisionFarePrice}
                                customerFare={customerFare}
                                setCustomerFare={setCustomerFare}
                                quotetionArr={quotetionArr}
                                setQuotetionArr={setQuotetionArr}
                              />
                            );
                          })}
                        </Box>
                      )}
                    </Box>
                  ) : (
                    <ResultLoader count={8} />
                  )}
                </Grid>
                {/* //todo: Pagination section */}
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Box
                    sx={{
                      width: "100%",
                      my: 3,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box sx={{ mt: 2 }}>
                      <CustomPagination
                        pageIndex={pageIndex}
                        pageCount={pageCount}
                        gotoPage={gotoPage}
                        canPreviousPage={canPreviousPage}
                        canNextPage={canNextPage}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box>
        {quotetionArr?.length ? (
          <Box
            sx={{
              position: "fixed",
              top: "50%",
              right: "24px",
              transform: "translateY(-50%)",
              zIndex: 9999,
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              border: "1px solid var(--neutral-200)",
              borderRadius: "16px",
              padding: "24px 20px 20px 20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
              width: "180px",
              textAlign: "center"
            }}
          >
            {/* Close/Clear Button at top right of the box */}
            <Box sx={{ position: "absolute", top: 8, right: 8 }}>
              <IconButton
                size="small"
                onClick={() => setQuotetionArr([])}
                sx={{ color: "var(--neutral-400)", "&:hover": { color: "var(--neutral-700)" } }}
              >
                <CancelIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Document Icon */}
            <Box
              sx={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                bgcolor: "rgba(4, 135, 199, 0.1)",
                color: "var(--primary-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <RequestQuoteIcon sx={{ fontSize: "24px" }} />
            </Box>

            {/* Selection Count Text */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "var(--neutral-800)", fontSize: "13px" }}>
                Quotation Basket
              </Typography>
              <Typography variant="caption" sx={{ color: "var(--neutral-500)", fontWeight: 650, display: "block", mt: 0.2 }}>
                {quotetionArr?.length} Selected
              </Typography>
            </Box>

            {/* CTA Button */}
            <Button
              fullWidth
              size="small"
              onClick={() => {
                navigate("/agent/quotationsend", {
                  state: {
                    quotetionArr,
                    adultCount,
                    childCount,
                    infant,
                    tripType,
                  },
                });
              }}
              sx={{
                textTransform: "none",
                background: "var(--premium-gradient-primary)",
                color: "white",
                fontSize: "12px",
                fontWeight: 600,
                borderRadius: "8px",
                py: 0.8,
                "&:hover": {
                  background: "var(--premium-gradient-primary)",
                  opacity: 0.95
                },
              }}
            >
              Make Quotation
            </Button>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default RoundSearchResult;
