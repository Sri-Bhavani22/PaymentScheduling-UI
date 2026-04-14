import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ViewListIcon from '@mui/icons-material/ViewList';
import dayjs from 'dayjs';
import ScheduleCalendar from '../components/payments/ScheduleCalendar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import StatusChip from '../components/common/StatusChip';
import { usePayments } from '../hooks/usePayments';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

const SchedulePage = () => {
  const [view, setView] = useState('calendar');
  const { data: payments = [], isLoading } = usePayments();

  if (isLoading) return <LoadingSpinner message="Loading schedule..." />;

  const sorted = [...payments].sort((a, b) => dayjs(a.startDate).diff(dayjs(b.startDate)));
  const grouped = sorted.reduce((acc, p) => {
    const key = p.startDate;
    if (!acc[key]) acc[key] = [];
    acc[key].push(p);
    return acc;
  }, {});

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Schedule</Typography>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, v) => v && setView(v)}
          size="small"
        >
          <ToggleButton value="calendar">
            <CalendarMonthIcon sx={{ mr: 0.5 }} /> Calendar
          </ToggleButton>
          <ToggleButton value="list">
            <ViewListIcon sx={{ mr: 0.5 }} /> List
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {view === 'calendar' ? (
        <ScheduleCalendar payments={payments} />
      ) : (
        <Box>
          {Object.entries(grouped).map(([date, items]) => (
            <Paper key={date} variant="outlined" sx={{ mb: 2, p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                {formatDate(date)}
              </Typography>
              <List dense>
                {items.map((p) => (
                  <ListItem key={p.id} divider>
                    <ListItemText
                      primary={p.payeeName}
                      secondary={`${formatCurrency(p.amount, p.currency)} — ${p.paymentType}`}
                    />
                    <StatusChip status={p.status} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SchedulePage;
