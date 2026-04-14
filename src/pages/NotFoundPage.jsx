import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 2,
      }}
    >
      <Typography variant="h1" color="primary" sx={{ fontWeight: 700, fontSize: 120 }}>
        404
      </Typography>
      <Typography variant="h5" color="text.secondary">
        Page not found
      </Typography>
      <Typography variant="body1" color="text.secondary">
        The page you are looking for does not exist or has been moved.
      </Typography>
      <Button variant="contained" startIcon={<HomeIcon />} onClick={() => navigate('/')} sx={{ mt: 2 }}>
        Go to Dashboard
      </Button>
    </Box>
  );
};

export default NotFoundPage;
