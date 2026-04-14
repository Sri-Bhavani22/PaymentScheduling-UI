import Chip from '@mui/material/Chip';
import { getStatusColor } from '../../utils/validators';

const StatusChip = ({ status }) => {
  return <Chip label={status} color={getStatusColor(status)} size="small" />;
};

export default StatusChip;
