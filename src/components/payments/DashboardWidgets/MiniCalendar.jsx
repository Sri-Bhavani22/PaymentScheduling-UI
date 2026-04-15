import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import dayjs from 'dayjs';

const MiniCalendar = ({ payments = [] }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(dayjs());

  const startOfMonth = current.startOf('month');
  const daysInMonth = current.daysInMonth();
  const startDay = startOfMonth.day();

  const paymentDates = new Set(payments.map((p) => p.startDate));

  const handlePrev = () => setCurrent((c) => c.subtract(1, 'month'));
  const handleNext = () => setCurrent((c) => c.add(1, 'month'));

  const handleDateClick = (date) => {
    navigate(`/schedule?date=${date}`);
  };

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(<Box key={`empty-${i}`} sx={{ width: 36, height: 36 }} />);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = current.date(d).format('YYYY-MM-DD');
    const hasPayment = paymentDates.has(dateStr);
    const isToday = dayjs().format('YYYY-MM-DD') === dateStr;

    days.push(
      <Box
        key={d}
        onClick={() => hasPayment && handleDateClick(dateStr)}
        sx={{
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          cursor: hasPayment ? 'pointer' : 'default',
          bgcolor: isToday ? 'primary.light' : 'transparent',
          color: isToday ? 'primary.contrastText' : 'text.primary',
          fontWeight: isToday ? 700 : 400,
          fontSize: 13,
          '&:hover': hasPayment ? { bgcolor: 'primary.main', color: 'primary.contrastText' } : {},
          position: 'relative',
        }}
      >
        {hasPayment ? (
          <Badge color="secondary" variant="dot" overlap="circular">
            {d}
          </Badge>
        ) : (
          d
        )}
      </Box>
    );
  }

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <IconButton size="small" onClick={handlePrev}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="subtitle2">{current.format('MMMM YYYY')}</Typography>
        <IconButton size="small" onClick={handleNext}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5, justifyItems: 'center' }}>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <Typography key={day} variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            {day}
          </Typography>
        ))}
        {days}
      </Box>
    </Paper>
  );
};

export default MiniCalendar;
