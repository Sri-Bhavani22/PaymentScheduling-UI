import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import StatusChip from '../../common/StatusChip';
import { formatCurrency } from '../../../utils/formatCurrency';

const UpcomingTable = ({ payments = [] }) => {
  const navigate = useNavigate();

  const upcoming = payments
    .filter((p) => ['Scheduled', 'Pending'].includes(p.status))
    .sort((a, b) => dayjs(a.startDate).diff(dayjs(b.startDate)))
    .slice(0, 5);

  if (upcoming.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
        No upcoming payments.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Payee</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {upcoming.map((p) => (
            <TableRow key={p.id} hover>
              <TableCell>{p.payeeName}</TableCell>
              <TableCell align="right">{formatCurrency(p.amount, p.currency)}</TableCell>
              <TableCell>{dayjs(p.startDate).format('DD MMM YYYY')}</TableCell>
              <TableCell>
                <StatusChip status={p.status} />
              </TableCell>
              <TableCell align="center">
                <Button size="small" onClick={() => navigate(`/payments/${p.id}`)}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UpcomingTable;
