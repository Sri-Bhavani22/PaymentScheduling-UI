import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ScheduleIcon from '@mui/icons-material/Schedule';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { formatDateTime } from '../../../utils/formatDate';

const eventConfig = {
  Created: { color: 'grey', icon: <AddCircleIcon fontSize="small" /> },
  Scheduled: { color: 'info', icon: <ScheduleIcon fontSize="small" /> },
  Processing: { color: 'warning', icon: <HourglassEmptyIcon fontSize="small" /> },
  Completed: { color: 'success', icon: <CheckCircleIcon fontSize="small" /> },
  Failed: { color: 'error', icon: <ErrorIcon fontSize="small" /> },
};

const PaymentTimeline = ({ timeline = [] }) => {
  if (timeline.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No timeline events.
      </Typography>
    );
  }

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Payment History
      </Typography>
      <Timeline position="alternate">
        {timeline.map((item, index) => {
          const config = eventConfig[item.event] || { color: 'grey', icon: null };
          return (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color={config.color}>{config.icon}</TimelineDot>
                {index < timeline.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="subtitle2">{item.event}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDateTime(item.date)}
                </Typography>
                {item.reason && (
                  <Box sx={{ mt: 0.5 }}>
                    <Typography variant="caption" color="error">
                      Reason: {item.reason}
                    </Typography>
                  </Box>
                )}
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Paper>
  );
};

export default PaymentTimeline;
