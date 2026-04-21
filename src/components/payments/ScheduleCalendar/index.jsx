import { useState } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import dayjs from 'dayjs';
import StatusChip from '../../common/StatusChip';
import { formatCurrency } from '../../../utils/formatCurrency';

const ScheduleCalendar = ({ payments = [] }) => {
  const [current, setCurrent] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);

  const startOfMonth = current.startOf('month');
  const daysInMonth = current.daysInMonth();
  const startDay = startOfMonth.day();

  const paymentsByDate = payments.reduce((acc, p) => {
    const key = p.startDate;
    if (!acc[key]) acc[key] = [];
    acc[key].push(p);
    return acc;
  }, {});

  const handlePrev = () => setCurrent((c) => c.subtract(1, 'month'));
  const handleNext = () => setCurrent((c) => c.add(1, 'month'));

  const handleDateClick = (dateStr) => {
    setSelectedDate(selectedDate === dateStr ? null : dateStr);
  };

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(<Box key={`empty-${i}`} />);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = current.date(d).format('YYYY-MM-DD');
    const dayPayments = paymentsByDate[dateStr] || [];
    const isToday = dayjs().format('YYYY-MM-DD') === dateStr;
    const isSelected = selectedDate === dateStr;

    days.push(
      <Box
        key={d}
        onClick={() => dayPayments.length > 0 && handleDateClick(dateStr)}
        sx={{
          p: 1,
          minHeight: 60,
          borderRadius: 1,
          border: '1px solid',
          borderColor: isSelected ? 'primary.main' : 'divider',
          bgcolor: isToday
            ? (theme) => alpha(theme.palette.primary.main, 0.1)
            : isSelected
            ? (theme) => alpha(theme.palette.primary.main, 0.1)
            : 'background.paper',
          cursor: dayPayments.length > 0 ? 'pointer' : 'default',
          '&:hover': dayPayments.length > 0 ? { borderColor: 'primary.main' } : {},
        }}
      >
        <Typography
          variant="caption"
          sx={{ fontWeight: isToday ? 700 : 400, color: isToday ? 'primary.main' : 'text.primary' }}
        >
          {d}
        </Typography>
        {dayPayments.length > 0 && (
          <Box sx={{ mt: 0.5 }}>
            {dayPayments.length <= 2 ? (
              dayPayments.map((p) => (
                <Chip
                  key={p.id}
                  label={`${p.paymentName.slice(0, 10)}..`}
                  size="small"
                  color={
                    p.status === 'Completed'
                      ? 'success'
                      : p.status === 'Failed'
                      ? 'error'
                      : 'info'
                  }
                  sx={{ fontSize: 10, height: 18, mb: 0.25, display: 'block', maxWidth: '100%' }}
                />
              ))
            ) : (
              <Badge badgeContent={dayPayments.length} color="primary" sx={{ mt: 0.5 }}>
                <Chip label="payments" size="small" sx={{ fontSize: 10, height: 18 }} />
              </Badge>
            )}
          </Box>
        )}
      </Box>
    );
  }

  const selectedPayments = selectedDate ? paymentsByDate[selectedDate] || [] : [];

  return (
    <Box>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <IconButton onClick={handlePrev}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6">{current.format('MMMM YYYY')}</Typography>
          <IconButton onClick={handleNext}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 0.5,
            mb: 0.5,
          }}
        >
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <Typography key={day} variant="caption" align="center" sx={{ fontWeight: 600, color: 'text.secondary' }}>
              {day}
            </Typography>
          ))}
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5 }}>{days}</Box>
      </Paper>

      {selectedDate && selectedPayments.length > 0 && (
        <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Payments on {dayjs(selectedDate).format('DD MMM YYYY')}
          </Typography>
          <List dense>
            {selectedPayments.map((p) => (
              <ListItem key={p.id} divider>
                <ListItemText
                  primary={p.paymentName}
                  secondary={`${formatCurrency(p.amount, p.currency)} — ${p.paymentType}`}
                />
                <StatusChip status={p.status} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default ScheduleCalendar;
