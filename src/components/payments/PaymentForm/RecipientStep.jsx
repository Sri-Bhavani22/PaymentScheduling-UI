import Grid from '@mui/material/Grid';
import FormField from '../../common/FormField';

const RecipientStep = ({ control }) => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormField name="paymentName" control={control} label="Payment Name" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormField name="accountNumber" control={control} label="Account Number" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormField
          name="bankIfsc"
          control={control}
          label="Bank / IFSC Code"
          placeholder="e.g. SBIN0001234"
          inputProps={{ style: { textTransform: 'uppercase' } }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormField name="email" control={control} label="Email (Optional)" type="email" />
      </Grid>
    </Grid>
  );
};

export default RecipientStep;
