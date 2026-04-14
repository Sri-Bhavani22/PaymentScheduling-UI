import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PaymentsIcon from '@mui/icons-material/Payments';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeMode } from '../../contexts/ThemeContext';

const DRAWER_WIDTH = 260;

const AppBar = ({ onToggleSidebar, sidebarOpen }) => {
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeMode();

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        ml: sidebarOpen ? `${DRAWER_WIDTH}px` : 0,
        width: sidebarOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
        transition: 'width 0.3s, margin-left 0.3s',
      }}
    >
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={onToggleSidebar} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <PaymentsIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          sx={{ cursor: 'pointer', flexGrow: 1 }}
          onClick={() => navigate('/')}
        >
          Payment Scheduler
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={mode === 'light' ? 'Dark mode' : 'Light mode'}>
            <IconButton color="inherit" onClick={toggleTheme}>
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Account">
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main', cursor: 'pointer' }}>
              J
            </Avatar>
          </Tooltip>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
