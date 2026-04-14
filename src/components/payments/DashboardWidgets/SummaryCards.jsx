import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { formatCurrency } from '../../../utils/formatCurrency';

const cardConfig = [
  {
    key: 'scheduled',
    label: 'Total Scheduled',
    icon: <CalendarMonthIcon fontSize="large" />,
    color: '#1565C0',
    getValue: (payments) => payments.filter((p) => p.status === 'Scheduled' || p.status === 'Pending').length,
    format: (v) => v,
  },
  {
    key: 'amount',
    label: 'Total Amount',
    icon: <AttachMoneyIcon fontSize="large" />,
    color: '#2E7D32',
    getValue: (payments) =>
      payments
        .filter((p) => p.status === 'Scheduled' || p.status === 'Pending')
        .reduce((sum, p) => sum + p.amount, 0),
    format: (v) => formatCurrency(v),
  },
  {
    key: 'completed',
    label: 'Completed',
    icon: <CheckCircleIcon fontSize="large" />,
    color: '#388E3C',
    getValue: (payments) => payments.filter((p) => p.status === 'Completed').length,
    format: (v) => v,
  },
  {
    key: 'failed',
    label: 'Failed',
    icon: <ErrorIcon fontSize="large" />,
    color: '#D32F2F',
    getValue: (payments) => payments.filter((p) => p.status === 'Failed').length,
    format: (v) => v,
  },
];

const SummaryCards = ({ payments = [] }) => {
  return (
    <Grid container spacing={3}>
      {cardConfig.map((card) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.key}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {card.label}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {card.format(card.getValue(payments))}
                  </Typography>
                </Box>
                <Box sx={{ color: card.color, opacity: 0.8 }}>{card.icon}</Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryCards;
