import { Grid, Box, Typography, Tooltip } from "@mui/material";
import React from "react";
import moment from "moment";

const FlightDetails = ({ data, checkedBaggage, cabinBaggage, brandFeatures = [] }) => {
  const minitConvert = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  // Meal code → label + icon (official airline meal codes)
  const MEAL_MAP = {
    B: { label: 'Breakfast',                          icon: '🍳', color: 'var(--primary-color)' },
    C: { label: 'Alcoholic Beverages—Complimentary',  icon: '🍾', color: 'var(--primary-color)' },
    D: { label: 'Dinner',                             icon: '🍽️', color: 'var(--primary-color)' },
    F: { label: 'Food for Purchase',                  icon: '🛒', color: 'var(--primary-color)' },
    G: { label: 'Food & Beverages for Purchase',      icon: '🧾', color: 'var(--primary-color)' },
    H: { label: 'Hot Meal',                           icon: '🍛', color: 'var(--primary-color)' },
    K: { label: 'Continental Breakfast',              icon: '🥐', color: 'var(--primary-color)' },
    L: { label: 'Lunch',                              icon: '🥘', color: 'var(--primary-color)' },
    M: { label: 'Meal',                               icon: '🍱', color: 'var(--primary-color)' },
    N: { label: 'No Meal Service',                    icon: '🚫', color: 'var(--primary-color)' },
    O: { label: 'Cold Meal',                          icon: '🥗', color: 'var(--primary-color)' },
    P: { label: 'Alcoholic Beverages for Purchase',   icon: '🍺', color: 'var(--primary-color)' },
    R: { label: 'Refreshments—Complimentary',         icon: '🥤', color: 'var(--primary-color)' },
    S: { label: 'Snack or Brunch',                    icon: '🍿', color: 'var(--primary-color)' },
    V: { label: 'Refreshments for Purchase',          icon: '🧃', color: 'var(--primary-color)' },
  };

  const mealCode = (data?.SegmentCode?.mealCode || data?.MealCode || data?.Meal || '').toString().toUpperCase().trim();
  const mealInfo = MEAL_MAP[mealCode];

  const checkedLabel = checkedBaggage ? checkedBaggage : (data?.Baggage || '20-30 KG');
  const cabinLabel = cabinBaggage ? cabinBaggage : '7 KG';

  // ── Real amenity data from SegmentCode.amenities ─────────────────────────
  const seg = data?.SegmentCode?.amenities || {};

  const wifi        = seg?.wifi;
  const power       = seg?.power;
  const beverage    = seg?.beverage;
  const entertain   = seg?.entertainment;
  const food        = seg?.food;
  const seat        = seg?.seat;
  const layout      = seg?.layout;

  // Helper: cost badge label
  const costLabel = (cost) => {
    if (!cost || cost === 'none') return null;
    if (cost === 'free') return 'Free';
    if (cost === 'surcharge') return 'Paid';
    return cost;
  };

  // Always-shown baggage amenities
  const baseAmenities = [
    { label: 'Cabin: ' + cabinLabel,      icon: '🎒', color: 'var(--primary-color)', bg: 'rgba(26,58,110,0.06)',   border: 'rgba(26,58,110,0.18)',  tooltip: 'Cabin baggage allowance' },
    { label: 'Check-in: ' + checkedLabel, icon: '💼', color: 'var(--primary-color)', bg: 'rgba(26,58,110,0.06)', border: 'rgba(26,58,110,0.18)', tooltip: 'Checked baggage allowance' },
  ];

  // Meal from mealCode
  const mealAmenity = mealInfo
    ? [{ label: mealInfo.label, icon: mealInfo.icon, color: mealInfo.color, bg: 'rgba(26,58,110,0.06)', border: 'rgba(26,58,110,0.18)', tooltip: `Meal type: ${mealInfo.label}` }]
    : food?.exists
    ? [{ label: food.type ? (food.type.charAt(0).toUpperCase() + food.type.slice(1)) : 'Meal',
         icon: '🍽️', color: 'var(--primary-color)', bg: 'rgba(26,58,110,0.06)', border: 'rgba(26,58,110,0.18)',
         tooltip: `Food: ${food.type || 'included'}${costLabel(food.cost) ? ' · ' + costLabel(food.cost) : ''}` }]
    : [];

  // Segment-level amenities from API
  const segAmenities = [
    // Wi-Fi
    ...(wifi ? [{
      label: wifi.exists ? 'Wi-Fi' : 'No Wi-Fi',
      icon: wifi.exists ? '📶' : '📵',
      color: 'var(--primary-color)',
      bg: 'rgba(26,58,110,0.06)',
      border: 'rgba(26,58,110,0.18)',
      tooltip: wifi.exists ? 'Wi-Fi available' : 'No Wi-Fi on this flight',
    }] : []),

    // Power
    ...(power && power.type && power.type !== 'none' ? [{
      label: power.type === 'usb' ? 'USB Port' : power.type === 'power' ? 'Power Outlet' : `Power: ${power.type}`,
      icon: power.type === 'usb' ? '🔋' : '🔌',
      color: 'var(--primary-color)',
      bg: 'rgba(26,58,110,0.06)',
      border: 'rgba(26,58,110,0.18)',
      tooltip: `Power: ${power.type}`,
    }] : []),

    // Beverage
    ...(beverage?.exists ? [{
      label: 'Beverages',
      icon: '🥤',
      color: 'var(--primary-color)',
      bg: 'rgba(26,58,110,0.06)',
      border: 'rgba(26,58,110,0.18)',
      tooltip: [
        beverage.nonAlcoholicCost === 'free' ? '🧃 Non-alcoholic: Free' : null,
        beverage.alcoholicCost === 'free' ? '🍷 Alcoholic: Free' : beverage.alcoholicCost === 'surcharge' ? '🍷 Alcoholic: Paid' : null,
      ].filter(Boolean).join(' · ') || 'Beverages included',
    }] : []),

    // Entertainment
    ...(entertain?.exists ? [{
      label: entertain.type === 'streaming' ? 'Streaming' : entertain.type ? entertain.type.charAt(0).toUpperCase() + entertain.type.slice(1) : 'Entertainment',
      icon: '📺',
      color: 'var(--primary-color)',
      bg: 'rgba(26,58,110,0.06)',
      border: 'rgba(26,58,110,0.18)',
      tooltip: `Entertainment: ${entertain.type || 'available'}${costLabel(entertain.cost) ? ' · ' + costLabel(entertain.cost) : ''}`,
    }] : []),

    // Seat info
    ...(seat ? [{
      label: seat.pitch ? `${seat.pitch}" Pitch` : seat.type ? seat.type : 'Seat',
      icon: '💺',
      color: 'var(--primary-color)',
      bg: 'rgba(26,58,110,0.06)',
      border: 'rgba(26,58,110,0.18)',
      tooltip: [
        seat.type ? `Type: ${seat.type}` : null,
        seat.pitch ? `Pitch: ${seat.pitch}"` : null,
      ].filter(Boolean).join(' · '),
    }] : []),

    // Layout
    ...(layout?.rowLayout ? [{
      label: `Row ${layout.rowLayout}`,
      icon: '✈️',
      color: 'var(--primary-color)',
      bg: 'rgba(26,58,110,0.06)',
      border: 'rgba(26,58,110,0.18)',
      tooltip: `Seat layout: ${layout.rowLayout}${layout.directAisleAccess ? ' · Direct aisle access' : ''}`,
    }] : []),
  ];

  const amenities = [...mealAmenity, ...baseAmenities, ...segAmenities];

  return (
    <Box 
      sx={{ 
        p: 2.5, 
        border: "1px solid var(--neutral-200)", 
        borderRadius: "var(--premium-border-radius-md)", 
        bgcolor: "var(--neutral-50)",
        mb: 1.5,
        boxShadow: "var(--premium-shadow-sm)"
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Logo and Carrier Info */}
        <Grid item xs={12} md={3.5}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                overflow: "hidden",
                border: "1px solid var(--neutral-200)",
                p: 0.5,
                backgroundColor: "var(--white)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <img
                src={
                  data?.MarketingCarrier === "XY"
                    ? `https://airlineimages.s3.ap-southeast-1.amazonaws.com/128/XY.png`
                    : `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${data?.MarketingCarrier}.png`
                }
                alt={data?.MarketingCarrier}
                style={{ objectFit: "contain" }}
                width="100%"
                height="100%"
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600} color="var(--neutral-800)" sx={{ fontSize: "13px" }}>
                {data?.MarketingCarrierName}
              </Typography>
              <Typography variant="caption" color="var(--neutral-500)" display="block">
                {data?.MarketingCarrier} {data?.MarketingFlightNumber} • Class {data?.SegmentCode?.bookingCode || "Y"}
              </Typography>
              {data?.AircraftTypeName && (
                <Typography variant="caption" color="var(--neutral-500)" display="block">
                  {data.AircraftTypeName.toUpperCase().includes("BOEING") || data.AircraftTypeName.toUpperCase().includes("AIRBUS")
                    ? data.AircraftTypeName
                    : data.AircraftTypeName.charAt(0) === "7"
                    ? `Boeing ${data.AircraftTypeName}`
                    : ["A3", "A2", "22", "32", "33", "34", "35", "38"].includes(data.AircraftTypeName.slice(0, 2))
                    ? `Airbus ${data.AircraftTypeName}`
                    : data.AircraftTypeName}
                </Typography>
              )}
              {data?.MarketingCarrier !== data?.OperatingCarrier && (
                <Typography variant="caption" sx={{ color: "var(--p2)", fontSize: "10px", fontWeight: 500, display: "block" }}>
                  Operated by {data?.OperatingCarrierName || data?.OperatingCarrier}
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>

        {/* Departure Details */}
        <Grid item xs={5} md={2.5}>
          <Box>
            <Typography variant="subtitle1" fontWeight={700} color="var(--primary-color)" sx={{ fontSize: "18px" }}>
              {data?.DepTime?.slice(11, 16)}
            </Typography>
            <Typography variant="subtitle2" fontWeight={600} color="var(--neutral-800)" sx={{ fontSize: "12px", mt: 0.2 }}>
              {data?.DepAirPort}
            </Typography>
            {data?.DepartureGate && (
              <Typography variant="caption" sx={{ color: "var(--neutral-500)", fontWeight: 600, display: "block" }}>
                Terminal: {data.DepartureGate}
              </Typography>
            )}
            <Typography variant="caption" color="var(--neutral-500)" display="block" noWrap>
              {data?.DepLocation?.split(",")[0]}
            </Typography>
            <Typography variant="caption" sx={{ color: "var(--primary-color)" }}>
              {moment(data?.DepTime?.split("+")[0])?.format("DD MMM, YYYY")}
            </Typography>
          </Box>
        </Grid>

        {/* Flight duration/path visualizer */}
        <Grid item xs={2} md={3} textAlign="center">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="caption" color="var(--neutral-500)" fontWeight={600}>
              {minitConvert(data?.Duration)}
            </Typography>
            <Box 
              sx={{ 
                width: "80%", 
                height: "2px", 
                bgcolor: "var(--neutral-300)", 
                position: "relative",
                my: 1
              }}
            >
              <Box 
                sx={{ 
                  width: 6, 
                  height: 6, 
                  borderRadius: "50%", 
                  bgcolor: "var(--primary-color)", 
                  position: "absolute",
                  top: -2,
                  left: 0
                }}
              />
              <Box 
                sx={{ 
                  width: 6, 
                  height: 6, 
                  borderRadius: "50%", 
                  bgcolor: "var(--primary-color)", 
                  position: "absolute",
                  top: -2,
                  right: 0
                }}
              />
            </Box>
            <Typography variant="caption" color="var(--neutral-400)">
              Direct
            </Typography>
          </Box>
        </Grid>

        {/* Arrival Details */}
        <Grid item xs={5} md={3} textAlign="right">
          <Box>
            <Typography variant="subtitle1" fontWeight={700} color="var(--primary-color)" sx={{ fontSize: "18px" }}>
              {data?.ArrTime?.slice(11, 16)}
            </Typography>
            <Typography variant="subtitle2" fontWeight={600} color="var(--neutral-800)" sx={{ fontSize: "12px", mt: 0.2 }}>
              {data?.ArrAirPort}
            </Typography>
            {data?.ArrivalGate && (
              <Typography variant="caption" sx={{ color: "var(--neutral-500)", fontWeight: 600, display: "block" }}>
                Terminal: {data.ArrivalGate}
              </Typography>
            )}
            <Typography variant="caption" color="var(--neutral-500)" display="block" noWrap>
              {data?.ArrLocation?.split(",")[0]}
            </Typography>
            <Typography variant="caption" sx={{ color: "var(--primary-color)" }}>
              {moment(data?.ArrTime?.split("+")[0])?.format("DD MMM, YYYY")}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* ── Hidden Stops Info Strip ───────────────────────── */}
      {data?.HiddenStops?.length > 0 && (
        <Box
          sx={{
            mt: 1.5,
            pt: 1.2,
            borderTop: '1px solid var(--neutral-200)',
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, bgcolor: 'rgba(26,58,110,0.06)', px: 1.4, py: 0.4, borderRadius: '6px', border: '1px solid rgba(26,58,110,0.18)' }}>
            <span style={{ fontSize: '13px' }}>⚠️</span>
            <Typography variant="caption" sx={{ fontWeight: 600, color: 'var(--primary-color)', fontSize: '11px' }}>
              Technical Stop: {data.HiddenStops.map((s, i) => (
                <span key={i} style={{ color: 'var(--primary-color)' }}>{typeof s === 'string' ? s : s?.AirPort || s?.Code || JSON.stringify(s)}{i < data.HiddenStops.length - 1 ? ', ' : ''}</span>
              ))}
            </Typography>
          </Box>
        </Box>
      )}

      {/* Amenities Section */}
      <Box
        sx={{
          mt: 1.5,
          pt: 1.2,
          borderTop: '1px dashed var(--neutral-200)',
          display: 'flex',
          gap: 0.8,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >

        {amenities.map((item, idx) => (
          <Tooltip key={idx} title={item.label} arrow placement="top">
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                bgcolor: item.bg || 'var(--neutral-100)',
                px: 1.2,
                py: 0.35,
                borderRadius: '20px',
                border: `1px solid ${item.border || 'var(--neutral-200)'}`,
                cursor: 'default',
                transition: 'all 0.15s ease',
                '&:hover': { transform: 'scale(1.05)' }
              }}
            >
              <span style={{ fontSize: '12px' }}>{item.icon}</span>
              <Typography variant="caption" fontWeight={600} sx={{ fontSize: '10.5px', color: item.color || 'var(--neutral-650)' }}>
                {item.label}
              </Typography>
            </Box>
          </Tooltip>
        ))}
        {amenities.length === 0 && (
          <Typography variant="caption" color="var(--neutral-400)" sx={{ fontSize: '11px' }}>
            No amenity data available
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FlightDetails;
