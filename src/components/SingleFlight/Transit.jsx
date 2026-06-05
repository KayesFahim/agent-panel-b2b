/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { Box } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(15, 23, 42, 0.95)",
    backdropFilter: "blur(4px)",
    maxWidth: 320,
    padding: "12px 16px",
    color: "var(--white)",
    fontSize: "12px",
    borderRadius: "var(--premium-border-radius-md)",
    boxShadow: "var(--premium-shadow-lg)",
    border: "1px solid var(--neutral-800)"
  },
}));

const Transit = ({ transit, allData, index, group }) => {
  const minitConvert = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };
  const transitCalculation = (date1, date2) => {
    const duration = moment.duration(moment(date1).diff(moment(date2)));

    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes()) - hours * 60;
    const transit = `${Math.abs(hours)}h:${Math.abs(minutes)}min`;
    return transit;
  };

  const data = transit?.Segments;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: { xs: 'left', md: 'center' },
        alignItems: { xs: 'top', md: 'center' },
        textAlign: { xs: 'left', md: 'center' },
      }}
      pr={1}
    >
      <HtmlTooltip
        title={
          <React.Fragment>
            <Box display="flex" flexDirection="row" alignItems="stretch" gap={0}>
              {transit?.Segments?.map((item, index, arr) => {
                const isLast = index === arr.length - 1;
                if (isLast) return null;
                const layover = transitCalculation(
                  data[index + 1]?.DepTime?.split('+')[0],
                  data[index]?.ArrTime?.split('+')[0]
                );
                const nextSeg = data[index + 1];
                return (
                  <React.Fragment key={index}>
                    {/* Vertical divider between stops */}
                    {index > 0 && (
                      <Box sx={{ width: '1px', bgcolor: 'rgba(255,255,255,0.2)', mx: 1.5, flexShrink: 0 }} />
                    )}
                    <Box sx={{ minWidth: 140 }}>
                      {/* Airport code badge + layover time */}
                      <Box display="flex" alignItems="center" gap={0.8} mb={0.6}>
                        <Box sx={{ bgcolor: 'rgba(4,135,199,0.45)', borderRadius: '4px', px: 1, py: 0.2 }}>
                          <Typography sx={{ color: '#fff', fontSize: '14px', fontWeight: 700, lineHeight: 1.4 }}>
                            {nextSeg?.DepFrom}
                          </Typography>
                        </Box>
                      </Box>
                      {/* Layover time */}
                      <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '10.5px', fontWeight: 500, mb: 0.3 }}>
                        ⏱ Layover: {layover}
                      </Typography>
                      {/* Airport name */}
                      <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '11px', fontWeight: 400, mb: 0.2 }}>
                        {nextSeg?.DepLocation?.slice(0, -2)}
                      </Typography>
                      {/* Flight + date */}
                      <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '10.5px' }}>
                        {nextSeg?.MarketingCarrier} {nextSeg?.MarketingFlightNumber}
                        {' · '}
                        {new Date(nextSeg?.DepTime?.split('+')[0]).toLocaleString('en-uk', {
                          day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric', hour12: true,
                        })}
                      </Typography>
                    </Box>
                  </React.Fragment>
                );
              })}
            </Box>
          </React.Fragment>
        }
        followCursor
      >
        <Box>
          <div
            style={{
              width: "100%",
              maxWidth: "240px",
              margin: "4px auto 0 auto",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {(() => {
              const stopCount = data?.length - 1;
              const startX = 30;
              const endX = 210;
              const step = stopCount > 0 ? (endX - startX) / (stopCount + 1) : 0;
              return (
                <svg width="100%" height="40" viewBox="0 0 240 40" style={{ display: "block", overflow: "visible" }}>
                  {/* Base Line */}
                  <line
                    x1={startX}
                    y1="24"
                    x2={endX}
                    y2="24"
                    stroke="var(--neutral-300)"
                    strokeWidth="2"
                  />
                  
                  {/* Start Point */}
                  <circle cx={startX} cy="24" r="3.5" fill="var(--primary-color)" />
                  
                  {/* End Point */}
                  <circle cx={endX} cy="24" r="3.5" fill="var(--primary-color)" />
                  
                  {/* Airplane Icon for Non-Stop flights */}
                  {stopCount === 0 && (
                    <g transform={`translate(${(startX + endX) / 2 - 8}, 16) rotate(90) scale(0.75)`} style={{ transformOrigin: "8px 8px" }}>
                      <path 
                        d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z" 
                        fill="var(--primary-color)" 
                      />
                    </g>
                  )}

                  {/* Stop dots and labels */}
                  {Array.from({ length: stopCount }, (_, i) => {
                    const x = startX + step * (i + 1);
                    const stopCode = data[i + 1]?.DepFrom || data[i]?.ArrTo || "";
                    return (
                      <g key={i}>
                        <circle cx={x} cy="24" r="4.5" fill="var(--p2)" stroke="var(--white)" strokeWidth="1.5" />
                        <text x={x} y="11" textAnchor="middle" fill="var(--p2)" fontSize="8.5" fontWeight="600">
                          {stopCode}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              );
            })()}
          </div>
          
          <Typography
            sx={{
              color: data?.length - 1 > 0 ? 'var(--p2)' : 'var(--neutral-500)',
              fontWeight: 600,
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              mt: 0.5
            }}
          >
            {data?.length - 1 > 0 ? `${data?.length - 1} Stop${data?.length - 1 > 1 ? 's' : ''}` : 'Non-Stop'}
          </Typography>
          
          <Typography
            sx={{
              color: '#000',
              fontWeight: 500,
              fontSize: '11px',
            }}
          >
            {group ? '' : minitConvert(allData?.AllLegsInfo[index]?.Duration)}
          </Typography>
        </Box>
      </HtmlTooltip>
    </Box>
  );
};

export default React.memo(Transit);
