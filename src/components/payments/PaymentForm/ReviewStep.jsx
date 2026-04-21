import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDate } from '../../../utils/formatDate';

const ReviewField = ({ label, value }) => (
  <Box sx={{ mb: 1.5 }}>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1">{value || '—'}</Typography>
  </Box>
);

const ReviewStep = ({ values, onEditStep }) => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Recipient Details</Typography>
            <Button size="small" startIcon={<EditIcon />} onClick={() => onEditStep(0)}>
              Edit
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <ReviewField label="Payment Name" value={values.paymentName} />
          <ReviewField label="Account Number" value={values.accountNumber} />
          <ReviewField label="Bank / IFSC" value={values.bankIfsc} />
          <ReviewField label="Email" value={values.email} />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Payment Details</Typography>
            <Button size="small" startIcon={<EditIcon />} onClick={() => onEditStep(1)}>
              Edit
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <ReviewField label="Amount" value={formatCurrency(values.amount, values.currency)} />
          <ReviewField label="Currency" value={values.currency} />
          <ReviewField label="Payment Type" value={values.paymentType} />
          {values.paymentType === 'Recurring' && (
            <ReviewField label="Frequency" value={values.frequency} />
          )}
          <ReviewField label="Start Date" value={formatDate(values.startDate)} />
          {values.endDate && <ReviewField label="End Date" value={formatDate(values.endDate)} />}
          <ReviewField label="Description" value={values.description} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ReviewStep;
