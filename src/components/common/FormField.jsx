import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

const FormField = ({ name, control, label, type = 'text', rules, multiline, rows, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...rest}
          label={label}
          type={type}
          fullWidth
          multiline={multiline}
          rows={rows}
          error={!!error}
          helperText={error?.message}
          variant="outlined"
          size="medium"
        />
      )}
    />
  );
};

export default FormField;
