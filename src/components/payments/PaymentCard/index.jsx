import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import StatusChip from '../../common/StatusChip';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDate } from '../../../utils/formatDate';

const PaymentCard = ({ payment }) => {
  if (!payment) return null;

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">{payment.payeeName}</Typography>
          <StatusChip status={payment.status} />
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">Amount</Typography>
            <Typography variant="h6">{formatCurrency(payment.amount, payment.currency)}</Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">Currency</Typography>
            <Typography variant="body1">{payment.currency}</Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">Scheduled Date</Typography>
            <Typography variant="body1">{formatDate(payment.startDate)}</Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">Type</Typography>
            <Typography variant="body1">
              {payment.paymentType}
              {payment.frequency ? ` (${payment.frequency})` : ''}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">Account</Typography>
            <Typography variant="body1">{payment.accountNumber}</Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">Bank / IFSC</Typography>
            <Typography variant="body1">{payment.bankIfsc}</Typography>
          </Grid>
          {payment.email && (
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="caption" color="text.secondary">Email</Typography>
              <Typography variant="body1">{payment.email}</Typography>
            </Grid>
          )}
          {payment.description && (
            <Grid size={{ xs: 12 }}>
              <Typography variant="caption" color="text.secondary">Description</Typography>
              <Typography variant="body1">{payment.description}</Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PaymentCard;
