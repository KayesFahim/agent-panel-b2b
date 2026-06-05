/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { memo, useState } from 'react';
import './AirlinesFilter.css';

const stops = [
  { label: 'Direct', value: 1 },
  { label: '1 Stop', value: 2 },
  { label: '2+ Stops', value: 3 },
];

const refundable = [
  { name: 'Non Refundable', value: false },
  { name: 'Refundable', value: true },
];

const departSlots = [
  { label: '🌅 Morning', sub: '6am – 12pm', value: 'morning' },
  { label: '☀️ Noon',    sub: '12pm – 5pm', value: 'noon' },
  { label: '🌆 Evening', sub: '5pm – 9pm',  value: 'evening' },
  { label: '🌙 Night',   sub: '9pm – 6am',  value: 'night' },
];

const durationOptions = [
  { label: '⚡ Short',  sub: 'Under 3h', value: 'short' },
  { label: '🕐 Medium', sub: '3h – 8h',  value: 'medium' },
  { label: '✈️ Long',   sub: 'Over 8h',  value: 'long' },
];

// ── Reusable Section wrapper ──────────────────────────────────────────────────
const FilterSection = ({ title, open, onToggle, children }) => (
  <Box sx={{ mb: 2.5 }}>
    <Box
      display="flex" justifyContent="space-between" alignItems="center"
      onClick={onToggle}
      sx={{ cursor: 'pointer', pb: 1, mb: open ? 1.5 : 0, borderBottom: '1px solid var(--neutral-200)' }}
    >
      <Typography variant="subtitle2" sx={{ color: 'var(--neutral-900)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {title}
      </Typography>
      <Typography variant="caption" sx={{ color: 'var(--neutral-400)', transform: open ? 'rotate(90deg)' : 'none', transition: 'var(--premium-transition)', fontWeight: 700 }}>
        ▶
      </Typography>
    </Box>
    {open && children}
  </Box>
);

// ── Reusable pill button ──────────────────────────────────────────────────────
const PillBtn = ({ label, sub, isActive, onClick }) => (
  <Button
    fullWidth onClick={onClick}
    sx={{
      borderRadius: '10px', py: 0.8, px: 1, textTransform: 'none',
      fontWeight: 600, fontSize: '11px', display: 'flex', flexDirection: 'column', gap: 0,
      backgroundColor: isActive ? 'var(--primary-color)' : 'transparent',
      border: '1px solid',
      borderColor: isActive ? 'var(--primary-color)' : 'var(--neutral-300)',
      color: isActive ? 'var(--white)' : 'var(--neutral-650)',
      '&:hover': {
        backgroundColor: isActive ? 'var(--primary-color)' : 'var(--neutral-100)',
        borderColor: isActive ? 'var(--primary-color)' : 'var(--neutral-400)',
      },
    }}
  >
    <span>{label}</span>
    {sub && <span style={{ fontSize: '9px', opacity: 0.75, fontWeight: 400 }}>{sub}</span>}
  </Button>
);

// ── Main Component ────────────────────────────────────────────────────────────
const AirlinesFilter = memo(({
  flightData,
  tripType,
  uniqueLayover,
  handleResetData,
  handleRefundable,
  handleProvider,
  selectedProvider,
  handleAirLine,
  handleStops,
  selectedStops,
  handleLayover,
  handleDepartTime,
  selectedDepartTime,
  selectedArrivalTime,
  selectedBackDepartTime,
  selectedBackArrivalTime,
  selectedAirlins,
  selectedRefundable,
  selectedLayover,
  uniqueCarriers,
  selectedBaggage,
  handleBaggage,
  selectedDepartSlot,
  handleDepartSlot,
  selectedDuration,
  handleDuration,
}) => {
  const [stopsOpen,      setStopsOpen]      = useState(true);
  const [baggageOpen,    setBaggageOpen]    = useState(true);
  const [departSlotOpen, setDepartSlotOpen] = useState(true);
  const [durationOpen,   setDurationOpen]   = useState(true);
  const [airlinesOpen,   setAirlinesOpen]   = useState(true);
  const [fareTypeOpen,   setFareTypeOpen]   = useState(true);
  const [layoverOpen,    setLayoverOpen]    = useState(true);

  const activeCount =
    selectedStops.length +
    selectedAirlins.length +
    selectedRefundable.length +
    selectedLayover.length +
    (selectedDepartSlot?.length || 0) +
    (selectedBaggage?.length || 0) +
    (selectedDuration !== 'all' ? 1 : 0);

  return (
    <Box className="premium-filter-container">

      {/* ── Header ── */}
      <Stack direction="row" justifyContent="space-between" alignItems="center"
        sx={{ pb: 2, mb: 2, borderBottom: '1px solid var(--neutral-200)' }}
      >
        <Typography className="filter-header-title">
          <span>Filters</span>
          {activeCount > 0 && <span className="filter-count-badge">{activeCount}</span>}
        </Typography>
        <button className="reset-filter-btn" onClick={() => handleResetData()}>Reset All</button>
      </Stack>

      {/* ── 1. Stops ── */}
      <FilterSection title="Stops" open={stopsOpen} onToggle={() => setStopsOpen(p => !p)}>
        <Grid container spacing={1}>
          {stops.map((item, i) => (
            <Grid key={i} item xs={4}>
              <PillBtn
                label={item.label}
                isActive={selectedStops.includes(item.value)}
                onClick={() => handleStops(item.value)}
              />
            </Grid>
          ))}
        </Grid>
      </FilterSection>

      {/* ── 2. Baggage ── */}
      <FilterSection title="🧳 Baggage" open={baggageOpen} onToggle={() => setBaggageOpen(p => !p)}>
        {(() => {
          // Build unique bag options from flight data
          const rawOptions = new Map();
          rawOptions.set('NO BAG', { label: '🚫 No Bag', value: 'NO BAG' });
          (flightData || []).forEach(item => {
            const allow = (item?.PriceBreakDown?.[0]?.Bag?.[0]?.Allowance || '').trim().toUpperCase();
            if (!allow || allow === '0' || allow.startsWith('0 ')) return; // skip zero
            if (!rawOptions.has(allow)) {
              const isPiece = allow.includes('PC') || allow.includes('PIECE') || allow.includes('P ');
              const icon = isPiece ? '📦' : '⚖️';
              rawOptions.set(allow, { label: `${icon} ${allow}`, value: allow });
            }
          });
          const bagOptions = Array.from(rawOptions.values());
          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {bagOptions.map(opt => (
                <Button
                  key={opt.value}
                  onClick={() => handleBaggage(opt.value)}
                  sx={{
                    borderRadius: '20px', py: 0.5, px: 1.5, textTransform: 'none',
                    fontWeight: 600, fontSize: '11px', whiteSpace: 'nowrap',
                    backgroundColor: selectedBaggage?.includes(opt.value) ? 'var(--primary-color)' : 'transparent',
                    border: '1px solid',
                    borderColor: selectedBaggage?.includes(opt.value) ? 'var(--primary-color)' : 'var(--neutral-300)',
                    color: selectedBaggage?.includes(opt.value) ? 'var(--white)' : 'var(--neutral-650)',
                    '&:hover': {
                      backgroundColor: selectedBaggage?.includes(opt.value) ? 'var(--primary-color)' : 'var(--neutral-100)',
                    },
                  }}
                >
                  {opt.label}
                </Button>
              ))}
            </Box>
          );
        })()}
      </FilterSection>

      {/* ── 3. Departure Time ── */}
      <FilterSection title="🕐 Departure Time" open={departSlotOpen} onToggle={() => setDepartSlotOpen(p => !p)}>
        <Grid container spacing={1}>
          {departSlots.map(slot => (
            <Grid key={slot.value} item xs={6}>
              <PillBtn
                label={slot.label}
                sub={slot.sub}
                isActive={selectedDepartSlot?.includes(slot.value)}
                onClick={() => handleDepartSlot(slot.value)}
              />
            </Grid>
          ))}
        </Grid>
      </FilterSection>

      {/* ── 4. Flight Duration ── */}
      <FilterSection title="⏱ Flight Duration" open={durationOpen} onToggle={() => setDurationOpen(p => !p)}>
        <Grid container spacing={1}>
          {durationOptions.map(opt => (
            <Grid key={opt.value} item xs={4}>
              <PillBtn
                label={opt.label}
                sub={opt.sub}
                isActive={selectedDuration === opt.value}
                onClick={() => handleDuration(opt.value)}
              />
            </Grid>
          ))}
        </Grid>
      </FilterSection>

      {/* ── 5. Airlines ── */}
      <FilterSection title="Airlines" open={airlinesOpen} onToggle={() => setAirlinesOpen(p => !p)}>
        <Box sx={{ mt: 1, maxHeight: '200px', overflowY: 'auto', pr: 0.5, '&::-webkit-scrollbar': { width: 3 } }}>
          {uniqueCarriers?.map((provider, i) => (
            <Box key={i} sx={{ mb: 0.5 }}>
              <label htmlFor={`airline-${provider.code}`} className="filter-checkbox-label">
                <input
                  className="filter-custom-checkbox"
                  type="checkbox"
                  id={`airline-${provider.code}`}
                  checked={selectedAirlins.includes(provider.code)}
                  onChange={() => handleAirLine(provider.code)}
                />
                <Box display="flex" alignItems="center" gap={1.2}>
                  <img
                    src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${provider.code}.png`}
                    alt={provider.name}
                    style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'contain', border: '1px solid var(--neutral-200)', padding: '1px', backgroundColor: '#fff' }}
                  />
                  <Typography variant="body2" sx={{ fontSize: '13px', fontWeight: 500, color: 'var(--neutral-800)' }}>
                    {provider.name}
                  </Typography>
                </Box>
              </label>
            </Box>
          ))}
        </Box>
      </FilterSection>

      {/* ── 6. Fare Type ── */}
      <FilterSection title="Fare Type" open={fareTypeOpen} onToggle={() => setFareTypeOpen(p => !p)}>
        <Box sx={{ mt: 1 }}>
          {refundable.map((provider, i) => (
            <Box key={i} sx={{ mb: 0.5 }}>
              <label htmlFor={`fare-${provider.name}`} className="filter-checkbox-label">
                <input
                  className="filter-custom-checkbox"
                  type="checkbox"
                  id={`fare-${provider.name}`}
                  checked={selectedRefundable.includes(provider.value)}
                  onChange={() => handleRefundable(provider.value)}
                />
                <Typography variant="body2" sx={{ fontSize: '13px', fontWeight: 500, color: 'var(--neutral-800)' }}>
                  {provider.name}
                </Typography>
              </label>
            </Box>
          ))}
        </Box>
      </FilterSection>

      {/* ── 7. Layover Airport ── */}
      {uniqueLayover?.length > 0 && (
        <FilterSection title="Layover Airport" open={layoverOpen} onToggle={() => setLayoverOpen(p => !p)}>
          <Box sx={{ mt: 1, maxHeight: '160px', overflowY: 'auto', pr: 0.5 }}>
            {uniqueLayover.map((provider, i) => (
              <Box key={i} sx={{ mb: 0.5 }}>
                <label htmlFor={`layover-${provider.code}`} className="filter-checkbox-label">
                  <input
                    className="filter-custom-checkbox"
                    type="checkbox"
                    id={`layover-${provider.code}`}
                    checked={selectedLayover.includes(provider.code)}
                    onChange={() => handleLayover(provider.code)}
                  />
                  <Typography variant="body2" sx={{ fontSize: '13px', fontWeight: 500, color: 'var(--neutral-800)' }}>
                    {provider.name} ({provider.code})
                  </Typography>
                </label>
              </Box>
            ))}
          </Box>
        </FilterSection>
      )}

    </Box>
  );
});

export default AirlinesFilter;