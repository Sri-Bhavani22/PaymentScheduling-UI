import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useNavigate } from 'react-router-dom';

const statuses = ['All', 'Pending', 'Scheduled', 'Processing', 'Completed', 'Failed', 'Cancelled'];

const PaymentToolbar = ({ search, onSearchChange, statusFilter, onStatusChange, onExport }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
      <TextField
        size="small"
        placeholder="Search payment..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
        sx={{ minWidth: 220 }}
      />
      <TextField
        size="small"
        select
        label="Status"
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        sx={{ minWidth: 140 }}
      >
        {statuses.map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </TextField>
      <Box sx={{ flexGrow: 1 }} />
      <Button variant="outlined" size="small" startIcon={<FileDownloadIcon />} onClick={onExport}>
        Export CSV
      </Button>
      <Button variant="contained" startIcon={<AddCircleIcon />} onClick={() => navigate('/create')}>
        New Payment
      </Button>
    </Box>
  );
};

export default PaymentToolbar;
