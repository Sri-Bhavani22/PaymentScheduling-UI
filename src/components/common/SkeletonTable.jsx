import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const SkeletonTable = ({ rows = 5 }) => {
  return (
    <Box>
      <Skeleton variant="rectangular" height={48} sx={{ mb: 1, borderRadius: 1 }} />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={40} sx={{ mb: 0.5, borderRadius: 1 }} />
      ))}
    </Box>
  );
};

export default SkeletonTable;
