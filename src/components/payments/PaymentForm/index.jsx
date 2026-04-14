import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import PayeeStep from './PayeeStep';
import PaymentStep from './PaymentStep';
import ReviewStep from './ReviewStep';
import { payeeSchema, paymentSchema, fullSchema } from './validationSchema';
import { useCreatePayment } from '../../../hooks/usePayments';
import { useNotification } from '../../../hooks/useNotification';

const steps = ['Payee Details', 'Payment Details', 'Review & Confirm'];
const stepSchemas = [payeeSchema, paymentSchema, fullSchema];

const defaultValues = {
  payeeName: '',
  accountNumber: '',
  bankIfsc: '',
  email: '',
  amount: '',
  currency: 'INR',
  paymentType: 'One-time',
  frequency: '',
  startDate: '',
  endDate: '',
  description: '',
};

const PaymentForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const { notify } = useNotification();
  const createPayment = useCreatePayment();

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(fullSchema),
    mode: 'onTouched',
  });

  const handleNext = async () => {
    const schema = stepSchemas[activeStep];
    const fields = Object.keys(schema.fields);
    const valid = await trigger(fields);
    if (valid) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleEditStep = (step) => setActiveStep(step);

  const onSubmit = async (data) => {
    try {
      const result = await createPayment.mutateAsync(data);
      notify('Payment scheduled successfully!', 'success');
      navigate(`/payments/${result.id}`);
    } catch {
      notify('Failed to schedule payment. Please try again.', 'error');
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <PayeeStep control={control} />;
      case 1:
        return <PaymentStep control={control} />;
      case 2:
        return <ReviewStep values={getValues()} onEditStep={handleEditStep} />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ minHeight: 300, mb: 3 }}>{renderStep()}</Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
          Back
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
          >
            Schedule Payment
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default PaymentForm;
