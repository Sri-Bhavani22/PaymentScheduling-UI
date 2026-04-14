import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PaymentTable from '../components/payments/PaymentTable';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { usePayments } from '../hooks/usePayments';

const PaymentListPage = () => {
  const { data: payments = [], isLoading } = usePayments();

  if (isLoading) return <LoadingSpinner message="Loading payments..." />;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Payment List
      </Typography>
      <PaymentTable payments={payments} />
    </Box>
  );
};

export default PaymentListPage;
