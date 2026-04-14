import { useParams, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import ReplayIcon from '@mui/icons-material/Replay';
import PaymentCard from '../components/payments/PaymentCard';
import PaymentTimeline from '../components/payments/PaymentTimeline';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { usePayment, useCancelPayment } from '../hooks/usePayments';
import { useNotification } from '../hooks/useNotification';

const PaymentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { data: payment, isLoading } = usePayment(id);
  const cancelMutation = useCancelPayment();

  if (isLoading) return <LoadingSpinner message="Loading payment details..." />;

  if (!payment) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" color="text.secondary">
          Payment not found
        </Typography>
        <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate('/payments')}>
          Back to List
        </Button>
      </Box>
    );
  }

  const handleCancel = async () => {
    try {
      await cancelMutation.mutateAsync(id);
      notify('Payment cancelled successfully', 'success');
      navigate('/payments');
    } catch {
      notify('Failed to cancel payment', 'error');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/payments')}>
          Back
        </Button>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Payment {payment.id}
        </Typography>
        {payment.status === 'Failed' && (
          <Button variant="outlined" color="warning" startIcon={<ReplayIcon />}>
            Retry
          </Button>
        )}
        {['Scheduled', 'Pending'].includes(payment.status) && (
          <>
            <Button variant="outlined" startIcon={<EditIcon />}>
              Edit
            </Button>
            <Button variant="outlined" color="error" startIcon={<CancelIcon />} onClick={handleCancel}>
              Cancel
            </Button>
          </>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <PaymentCard payment={payment} />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <PaymentTimeline timeline={payment.timeline} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentDetailPage;
