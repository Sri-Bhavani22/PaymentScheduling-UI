import { Controller, useWatch } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormHelperText from '@mui/material/FormHelperText';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import FormField from '../../common/FormField';

const currencies = ['INR', 'USD', 'EUR', 'GBP'];
const frequencies = ['Daily', 'Weekly', 'Monthly'];

const PaymentStep = ({ control }) => {
  const paymentType = useWatch({ control, name: 'paymentType' });

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormField name="amount" control={control} label="Amount" type="number" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Controller
          name="currency"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField {...field} select label="Currency" fullWidth error={!!error} helperText={error?.message}>
              {currencies.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Controller
          name="paymentType"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl error={!!error}>
              <FormLabel>Payment Type</FormLabel>
              <RadioGroup row {...field}>
                <FormControlLabel value="One-time" control={<Radio />} label="One-time" />
                <FormControlLabel value="Recurring" control={<Radio />} label="Recurring" />
              </RadioGroup>
              {error && <FormHelperText>{error.message}</FormHelperText>}
            </FormControl>
          )}
        />
      </Grid>
      {paymentType === 'Recurring' && (
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="frequency"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                select
                label="Frequency"
                fullWidth
                error={!!error}
                helperText={error?.message}
              >
                {frequencies.map((f) => (
                  <MenuItem key={f} value={f}>
                    {f}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
      )}
      <Grid size={{ xs: 12, sm: 6 }}>
        <Controller
          name="startDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              label="Start Date"
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : '')}
              minDate={dayjs()}
              slotProps={{
                textField: { fullWidth: true, error: !!error, helperText: error?.message },
              }}
            />
          )}
        />
      </Grid>
      {paymentType === 'Recurring' && (
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="endDate"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                label="End Date"
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : '')}
                minDate={dayjs()}
                slotProps={{
                  textField: { fullWidth: true, error: !!error, helperText: error?.message },
                }}
              />
            )}
          />
        </Grid>
      )}
      <Grid size={{ xs: 12 }}>
        <FormField
          name="description"
          control={control}
          label="Description (Optional)"
          multiline
          rows={3}
        />
      </Grid>
    </Grid>
  );
};

export default PaymentStep;
