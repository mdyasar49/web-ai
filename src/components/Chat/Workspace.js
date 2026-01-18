import React from 'react';
import { 
  Box, 
  Fade, 
  Paper, 
  Tabs, 
  Tab, 
  Button, 
  Stack, 
  Typography, 
  Divider, 
  Grid 
} from '@mui/material';
import { 
  Code as CodeIcon, 
  Palette as PaletteIcon, 
  ContentCopy as CopyIcon, 
  Check as CheckIcon,
  Monitor as PreviewIcon
} from '@mui/icons-material';

const Workspace = ({ 
  result, 
  activeTab, 
  setActiveTab, 
  copying, 
  copyToClipboard 
}) => {
  console.log('Workspace rendering with result:', result);
  if (!result) {
    return (
      <Box 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          flexDirection: 'column',
          borderRadius: 6,
          border: '2px dashed rgba(255,255,255,0.03)',
          bgcolor: 'rgba(255,255,255,0.01)',
          textAlign: 'center',
          p: 4,
          height: '100%'
        }}
      >
        <Box sx={{ position: 'relative', mb: 4 }}>
           <Paper sx={{ p: 2, borderRadius: '50%', bgcolor: 'rgba(99, 102, 241, 0.05)', animation: 'pulse-glow 4s infinite' }}>
              <PreviewIcon sx={{ fontSize: 80, color: 'primary.main', opacity: 0.2 }} />
           </Paper>
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 900, color: 'text.secondary', mb: 1 }}>
          Workspace Idle
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.disabled', maxWidth: 300, mx: 'auto' }}>
          Construct your vision using the control panel on the left to start the AI generation process.
        </Typography>
      </Box>
    );
  }

  return (
    <Fade in={!!result}>
      <Paper 
        elevation={0}
        sx={{ 
          flex: 1, 
          borderRadius: 6, 
          overflow: 'hidden', 
          display: 'flex', 
          flexDirection: 'column',
          bgcolor: '#0d0d0f',
          border: '1px solid rgba(255,255,255,0.06)',
          height: '100%',
          minHeight: { xs: '600px', md: '100%' }
        }}
      >
        {/* Workspace Tabs */}
        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', px: 2, bgcolor: '#111114', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ minHeight: 60 }}>
            <Tab 
              icon={<CodeIcon sx={{ fontSize: 18 }} />} 
              iconPosition="start" 
              label="Production Code" 
              sx={{ px: 3, fontSize: '0.8rem', minHeight: 60 }} 
            />
            <Tab 
              icon={<PaletteIcon sx={{ fontSize: 18 }} />} 
              iconPosition="start" 
              label="Design Specs" 
              sx={{ px: 3, fontSize: '0.8rem', minHeight: 60 }} 
            />
          </Tabs>
          
          {activeTab === 0 && (
            <Button 
              variant="contained" 
              size="small" 
              color="inherit"
              startIcon={copying ? <CheckIcon fontSize="small" /> : <CopyIcon fontSize="small" />}
              onClick={copyToClipboard}
              sx={{ 
                borderRadius: 2, 
                bgcolor: copying ? 'success.dark' : 'rgba(255,255,255,0.05)',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 800,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
               {copying ? 'Copied to Clipboard' : 'Copy JSX'}
            </Button>
          )}
        </Box>

        {/* Content Area */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 0 }}>
          {activeTab === 0 ? (
            <Box sx={{ p: 4 }}>
               <pre style={{ margin: 0, tabSize: 2 }}>
                 <code style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.9rem', color: '#818cf8', lineHeight: 1.7 }}>
                   {result.reactCode}
                 </code>
               </pre>
            </Box>
          ) : (
            <Box sx={{ p: 6, maxWidth: 700 }}>
               <Stack spacing={1} sx={{ mb: 4 }}>
                  <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: '0.2em' }}>GENERATED ASSET</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 900 }}>{result.name}</Typography>
               </Stack>

               <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 2, mb: 6, fontSize: '1.1rem' }}>
                 {result.description}
               </Typography>
               
               <Divider sx={{ mb: 6 }} />
               
               <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>System Palette</Typography>
               <Grid container spacing={3}>
                 {Object.entries(result.colors).map(([key, col]) => (
                   <Grid item xs={6} sm={4} key={key}>
                     <Paper 
                      elevation={0}
                      sx={{ 
                        p: 2, 
                        borderRadius: 4, 
                        bgcolor: 'rgba(255,255,255,0.02)', 
                        border: '1px solid rgba(255,255,255,0.04)',
                        textAlign: 'center'
                      }}
                     >
                        <Box sx={{ width: '100%', aspectRatio: '1/1', bgcolor: col, borderRadius: 3, mb: 2, boxShadow: `0 10px 20px ${col}22` }} />
                        <Typography variant="body2" sx={{ fontWeight: 900, textTransform: 'capitalize' }}>{key}</Typography>
                        <Typography variant="caption" sx={{ color: 'text.disabled', fontFamily: 'monospace' }}>{col.toUpperCase()}</Typography>
                     </Paper>
                   </Grid>
                 ))}
               </Grid>
            </Box>
          )}
        </Box>
      </Paper>
    </Fade>
  );
};

export default Workspace;
