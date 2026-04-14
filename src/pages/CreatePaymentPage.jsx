import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PaymentForm from '../components/payments/PaymentForm';

const CreatePaymentPage = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Create Payment
      </Typography>
      <Paper sx={{ p: 4 }}>
        <PaymentForm />
      </Paper>
    </Box>
  );
};

export default CreatePaymentPage;
