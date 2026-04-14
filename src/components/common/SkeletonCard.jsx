import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const SkeletonCard = () => {
  return (
    <Card>
      <CardContent>
        <Skeleton variant="text" width="60%" height={28} />
        <Skeleton variant="text" width="40%" height={40} sx={{ mt: 1 }} />
        <Skeleton variant="text" width="30%" height={20} sx={{ mt: 1 }} />
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
