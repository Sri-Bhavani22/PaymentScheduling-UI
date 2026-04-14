import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SummaryCards from '../components/payments/DashboardWidgets/SummaryCards';
import UpcomingTable from '../components/payments/DashboardWidgets/UpcomingTable';
import MiniCalendar from '../components/payments/DashboardWidgets/MiniCalendar';
import SkeletonCard from '../components/common/SkeletonCard';
import { usePayments } from '../hooks/usePayments';

const DashboardPage = () => {
  const { data: payments = [], isLoading } = usePayments();

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      {isLoading ? (
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((i) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
              <SkeletonCard />
            </Grid>
          ))}
        </Grid>
      ) : (
        <SummaryCards payments={payments} />
      )}

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Upcoming Payments
          </Typography>
          <UpcomingTable payments={payments} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Calendar
          </Typography>
          <MiniCalendar payments={payments} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
