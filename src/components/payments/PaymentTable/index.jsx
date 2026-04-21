import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import PaymentToolbar from './PaymentToolbar';
import StatusChip from '../../common/StatusChip';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDate } from '../../../utils/formatDate';

const columns = [
  { id: 'id', label: 'Payment ID', sortable: true },
  { id: 'paymentName', label: 'Payment Name', sortable: true },
  { id: 'amount', label: 'Amount', sortable: true, align: 'right' },
  { id: 'startDate', label: 'Scheduled Date', sortable: true },
  { id: 'frequency', label: 'Frequency' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions', align: 'center' },
];

const PaymentTable = ({ payments = [] }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('startDate');
  const [order, setOrder] = useState('asc');

  const filtered = useMemo(() => {
    let data = [...payments];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((p) => p.paymentName.toLowerCase().includes(q));
    }
    if (statusFilter !== 'All') {
      data = data.filter((p) => p.status === statusFilter);
    }
    data.sort((a, b) => {
      const aVal = a[orderBy];
      const bVal = b[orderBy];
      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
      return 0;
    });
    return data;
  }, [payments, search, statusFilter, orderBy, order]);

  const handleSort = (col) => {
    const isAsc = orderBy === col && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(col);
  };

  const handleExport = () => {
    const header = 'ID,Payment Name,Amount,Currency,Date,Frequency,Status\n';
    const rows = filtered
      .map((p) =>
        [p.id, p.paymentName, p.amount, p.currency, p.startDate, p.frequency || 'One-time', p.status].join(',')
      )
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payments.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const paginatedData = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <PaymentToolbar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onExport={handleExport}
      />
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.id} align={col.align || 'left'}>
                  {col.sortable ? (
                    <TableSortLabel
                      active={orderBy === col.id}
                      direction={orderBy === col.id ? order : 'asc'}
                      onClick={() => handleSort(col.id)}
                    >
                      {col.label}
                    </TableSortLabel>
                  ) : (
                    col.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((p) => (
              <TableRow key={p.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate(`/payments/${p.id}`)}>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.paymentName}</TableCell>
                <TableCell align="right">{formatCurrency(p.amount, p.currency)}</TableCell>
                <TableCell>{formatDate(p.startDate)}</TableCell>
                <TableCell>
                  <Chip label={p.frequency || 'One-time'} size="small" variant="outlined" />
                </TableCell>
                <TableCell>
                  <StatusChip status={p.status} />
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/payments/${p.id}`);
                    }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Box>
  );
};

export default PaymentTable;
