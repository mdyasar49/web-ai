import React from 'react';
import { 
  Box, 
  Typography, 
  Stack, 
  Paper, 
  Chip, 
  Tooltip, 
  IconButton, 
  Divider, 
  Button 
} from '@mui/material';
import { 
  AutoAwesome as MagicIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  History as HistoryIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useThemeMode } from '../../context/ThemeContext';

const Header = ({ openDialog }) => {
  const { themeMode, toggleTheme } = useThemeMode();

  return (
    <Box 
      sx={{ 
        px: 4, 
        py: 2, 
        borderBottom: '1px solid', 
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'rgba(9, 9, 11, 0.8)',
        backdropFilter: 'blur(12px)',
        zIndex: 10
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
         <Paper 
          elevation={0}
          sx={{ 
            p: 0.8, 
            bgcolor: 'primary.main', 
            borderRadius: 1.5,
            display: 'flex'
          }}
         >
            <MagicIcon sx={{ color: 'white', fontSize: 20 }} />
         </Paper>
         <Typography variant="h6" sx={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: -0.5 }}>
           Nexus<Box component="span" sx={{ color: 'primary.main' }}>AI</Box>
         </Typography>
         <Chip label="BETA v2.0" size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 900, bgcolor: 'rgba(99, 102, 241, 0.1)', color: 'primary.light' }} />
      </Stack>

      <Stack direction="row" spacing={3} alignItems="center">
         <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Tooltip title="Toggle Theme">
              <IconButton size="small" onClick={toggleTheme} sx={{ color: 'primary.main' }}>
                {themeMode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
            <Tooltip title="History">
              <IconButton size="small" onClick={() => openDialog('history')} sx={{ opacity: 0.8 }}>
                <HistoryIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Models">
              <IconButton size="small" onClick={() => openDialog('models')} sx={{ opacity: 0.5 }}>
                <DashboardIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton size="small" onClick={() => openDialog('settings')} sx={{ opacity: 0.5 }}>
                <SettingsIcon fontSize="small" />
              </IconButton>
            </Tooltip>
         </Stack>
         <Divider orientation="vertical" flexItem sx={{ height: 20, my: 'auto' }} />
         <Button variant="outlined" size="small" onClick={() => openDialog('docs')} sx={{ borderRadius: 2, fontSize: '0.75rem' }}>
           Documentation
         </Button>
      </Stack>
    </Box>
  );
};

export default Header;
