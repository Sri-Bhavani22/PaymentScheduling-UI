import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import PaymentStep from '../PaymentStep';

function Wrapper({ defaultPaymentType = 'One-time' }) {
  const { control } = useForm({
    defaultValues: {
      amount: '',
      currency: 'INR',
      paymentType: defaultPaymentType,
      frequency: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  });
  return <PaymentStep control={control} />;
}

describe('PaymentStep', () => {
  it('does not show frequency field for One-time', () => {
    render(<Wrapper />);
    expect(screen.queryByText(/frequency/i, { selector: 'label' })).not.toBeInTheDocument();
  });

  it('shows frequency field when paymentType is Recurring', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    await user.click(screen.getByLabelText(/recurring/i));

    await waitFor(() => {
      expect(screen.getByLabelText(/frequency/i)).toBeInTheDocument();
    });
  });
});