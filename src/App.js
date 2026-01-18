import React from 'react';
import { 
  CssBaseline,
  Box, 
  Grid, 
  Snackbar
} from '@mui/material';
import { useNexus } from './hooks/useNexus';
import { useThemeMode } from './context/ThemeContext';
import Header from './components/Layout/Header';
import ControlPanel from './components/Chat/ControlPanel';
import Workspace from './components/Chat/Workspace';
import AppDialogs from './components/Shared/AppDialogs';

const App = () => {
  const nexus = useNexus();
  const { themeMode } = useThemeMode();

  return (
    <Box 
      sx={{ 
        height: '100vh', 
        bgcolor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        opacity: nexus.mounted ? 1 : 0,
        transition: 'opacity 0.8s ease'
      }}
    >
      <CssBaseline />
      
      {/* Background Glows */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
         <Box sx={{ 
           position: 'absolute', 
           top: '-10%', 
           right: '-5%', 
           width: '40vw', 
           height: '40vw', 
           background: `radial-gradient(circle, ${themeMode === 'dark' ? '#6366f1' : '#4f46e5'}10 0%, transparent 70%)`, 
           filter: 'blur(80px)' 
         }} />
         <Box sx={{ 
           position: 'absolute', 
           bottom: '-10%', 
           left: '-5%', 
           width: '30vw', 
           height: '30vw', 
           background: `radial-gradient(circle, ${themeMode === 'dark' ? '#06b6d4' : '#0891b2'}08 0%, transparent 70%)`, 
           filter: 'blur(80px)' 
         }} />
      </Box>

      <Header openDialog={nexus.openDialog} />

      {/* Main Workspace */}
      <Box sx={{ flex: 1, p: 3, position: 'relative', zIndex: 1, overflow: 'auto' }}>
        <Grid container spacing={3} sx={{ height: { md: '100%', xs: 'auto' } }}>
          
          {/* LEFT: Control Side */}
          <Grid item xs={12} md={4} sx={{ height: { md: '100%', xs: 'auto' }, display: 'flex', flexDirection: 'column' }}>
            <ControlPanel 
              prompt={nexus.prompt}
              setPrompt={nexus.setPrompt}
              loading={nexus.loading}
              handleGenerate={nexus.handleGenerate}
              error={nexus.error}
            />
          </Grid>

          {/* RIGHT: Output Side */}
          <Grid item xs={12} md={8} sx={{ height: '100%' }}>
            <Workspace 
              result={nexus.result}
              activeTab={nexus.activeTab}
              setActiveTab={nexus.setActiveTab}
              copying={nexus.copying}
              copyToClipboard={nexus.copyToClipboard}
            />
          </Grid>
        </Grid>
      </Box>

      <AppDialogs 
        dialogOpen={nexus.dialogOpen}
        closeDialog={nexus.closeDialog}
        history={nexus.history}
        setResult={nexus.setResult}
        setPrompt={nexus.setPrompt}
        deleteFromHistory={nexus.deleteFromHistory}
      />

      <Snackbar
        open={nexus.snackbar.open}
        autoHideDuration={3000}
        onClose={() => nexus.setSnackbar({ ...nexus.snackbar, open: false })}
        message={nexus.snackbar.message}
        sx={{ '& .MuiSnackbarContent-root': { borderRadius: 3, bgcolor: 'primary.main', fontWeight: 700 } }}
      />

      {/* Global CSS for Animations */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </Box>
  );
};

export default App;
