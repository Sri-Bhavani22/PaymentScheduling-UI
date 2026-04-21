import Button from '@mui/material/Button';

const PaymentColumns = (navigate) => [
  { field: 'id', headerName: 'Payment ID', width: 120 },
  { field: 'paymentName', headerName: 'Payment Name', flex: 1, minWidth: 160 },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 140,
    align: 'right',
    headerAlign: 'right',
    valueFormatter: (value) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(value);
    },
  },
  {
    field: 'startDate',
    headerName: 'Scheduled Date',
    width: 140,
    valueFormatter: (value) => {
      return new Date(value).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    },
  },
  {
    field: 'frequency',
    headerName: 'Frequency',
    width: 120,
    renderCell: (params) => params.value || 'One-time',
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 100,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Button
        size="small"
        onClick={() => navigate(`/payments/${params.row.id}`)}
      >
        View
      </Button>
    ),
  },
];

export default PaymentColumns;
