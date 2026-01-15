import React from 'react';
import { 
  Box, 
  Stack, 
  Card, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress, 
  Fade, 
  Alert, 
  Grid, 
  Paper 
} from '@mui/material';
import { ElectricBolt as BoltIcon } from '@mui/icons-material';

const ControlPanel = ({ 
  prompt, 
  setPrompt, 
  loading, 
  handleGenerate, 
  error 
}) => {
  const samplePrompts = [
    'SaaS Hero Section', 
    'E-commerce Product Grid', 
    'Cyberpunk Portfolio', 
    'Minimalist Pricing Table'
  ];

  return (
    <Stack spacing={3} sx={{ height: '100%' }}>
      <Card 
        elevation={0}
        sx={{ 
          p: 3, 
          borderRadius: 5, 
          bgcolor: 'rgba(255,255,255,0.02)', 
          border: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0
        }}
      >
        <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: '0.2em', fontSize: '0.7rem' }}>
          GENERATE
        </Typography>
        <Typography variant="h5" sx={{ mt: 1, mb: 3, fontWeight: 900, lineHeight: 1.2 }}>
          Transform your <br />concept into code.
        </Typography>
        
        <Box component="form" onSubmit={handleGenerate}>
          <TextField 
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            placeholder="Describe your component... (e.g. A neon-themed pricing table with hover effects)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: 'rgba(0,0,0,0.3)',
                fontSize: '0.95rem',
                transition: 'all 0.2s',
                '&:focus-within': {
                  bgcolor: 'rgba(0,0,0,0.5)',
                }
              }
            }}
          />
          <Button 
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={loading || !prompt.trim()}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <BoltIcon />}
            sx={{ 
              mt: 3, 
              py: 1.8, 
              borderRadius: 3, 
              fontSize: '1rem',
              boxShadow: '0 10px 20px rgba(99, 102, 241, 0.2)',
              '&:hover': { boxShadow: '0 15px 30px rgba(99, 102, 241, 0.3)' }
            }}
          >
            {loading ? 'Synthesizing...' : 'Generate Component'}
          </Button>
        </Box>
      </Card>

      {error && (
        <Fade in={!!error}>
          <Alert severity="error" variant="filled" sx={{ borderRadius: 3, py: 1 }}>{error}</Alert>
        </Fade>
      )}

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 800, px: 1, mb: 1, display: 'block', letterSpacing: '0.1em' }}>
          QUICK START
        </Typography>
        <Grid container spacing={1}>
           {samplePrompts.map(tag => (
             <Grid item xs={6} key={tag}>
                <Paper 
                  onClick={() => setPrompt(tag)}
                  sx={{ 
                    p: 2, 
                    borderRadius: 3, 
                    bgcolor: 'rgba(255,255,255,0.02)', 
                    border: '1px solid rgba(255,255,255,0.04)',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', borderColor: 'primary.main' },
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%'
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 700, lineHeight: 1.2 }}>{tag}</Typography>
                </Paper>
             </Grid>
           ))}
        </Grid>
      </Box>
    </Stack>
  );
};

export default ControlPanel;
