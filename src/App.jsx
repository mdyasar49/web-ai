import React, { useState, useEffect } from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  TextField, 
  Button, 
  IconButton, 
  Card, 
  CardContent, 
  Grid, 
  CircularProgress, 
  Alert, 
  AlertTitle,
  Chip,
  Fade,
  Paper,
  Divider,
  Stack
} from '@mui/material';
import { 
  Code as CodeIcon, 
  ElectricBolt as BoltIcon, 
  ContentCopy as CopyIcon, 
  Check as CheckIcon,
  Language as GlobeIcon
} from '@mui/icons-material';
import { generateWebsite } from './services/geminiService';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copying, setCopying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await generateWebsite(prompt);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to generate your website code.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.reactCode);
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  const tags = ['SaaS Dashboard', 'Agency Portfolio', 'Crypto Wallet', 'Travel App', 'Health platform'];

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: 'background.default',
        position: 'relative',
        overflowX: 'hidden',
        transition: 'opacity 1s ease',
        opacity: mounted ? 1 : 0
      }}
    >
      {/* Background Decorative Elements */}
      <Box 
        sx={{ 
          position: 'fixed', 
          inset: 0, 
          pointerEvents: 'none', 
          zIndex: -1,
          overflow: 'hidden'
        }}
      >
        <Box 
          sx={{ 
            position: 'absolute', 
            top: '-10%', 
            left: '-10%', 
            width: '40%', 
            height: '40%', 
            bgcolor: 'primary.light', 
            borderRadius: '50%', 
            filter: 'blur(120px)', 
            opacity: 0.2,
            animation: 'pulse 4s infinite'
          }} 
        />
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: '-10%', 
            right: '-10%', 
            width: '40%', 
            height: '40%', 
            bgcolor: 'secondary.light', 
            borderRadius: '50%', 
            filter: 'blur(120px)', 
            opacity: 0.2,
            animation: 'pulse 4s infinite',
            animationDelay: '1s'
          }} 
        />
      </Box>

      {/* Navbar */}
      <AppBar 
        position="sticky" 
        sx={{ 
          bgcolor: 'rgba(255, 255, 255, 0.7)', 
          backdropFilter: 'blur(20px)', 
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: 'none'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Paper 
                elevation={4}
                sx={{ 
                  p: 1, 
                  bgcolor: 'primary.main', 
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 16px rgba(79, 70, 229, 0.2)'
                }}
              >
                <CodeIcon sx={{ color: 'white', fontSize: 20 }} />
              </Paper>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 900, 
                  color: 'text.primary', 
                  letterSpacing: -0.5,
                  fontSize: '1.5rem'
                }}
              >
                ReactGen<Box component="span" sx={{ color: 'primary.main' }}>AI</Box>
              </Typography>
            </Box>
            
            <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', sm: 'flex' } }}>
              {['How it works', 'Showcase'].map((text) => (
                <Typography 
                  key={text}
                  sx={{ 
                    fontSize: '0.875rem', 
                    fontWeight: 700, 
                    color: 'text.secondary', 
                    cursor: 'pointer',
                    '&:hover': { color: 'primary.main' },
                    transition: 'color 0.2s'
                  }}
                >
                  {text}
                </Typography>
              ))}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip 
            label="Powering Next-Gen Development" 
            color="primary" 
            variant="outlined"
            sx={{ 
              mb: 4, 
              fontWeight: 900, 
              fontSize: '0.65rem', 
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              borderRadius: '8px',
              borderWidth: 2,
              animation: 'bounce 2s infinite'
            }}
          />
          <Typography 
            variant="h1" 
            sx={{ 
              fontWeight: 900, 
              fontSize: { xs: '3.5rem', sm: '5.5rem' },
              lineHeight: 0.9,
              mb: 4,
              letterSpacing: -2
            }}
          >
            Magic code <br />
            <Box 
              component="span" 
              sx={{ 
                color: 'transparent',
                background: 'linear-gradient(90deg, #4f46e5, #9333ea, #4f46e5)',
                backgroundSize: '200% auto',
                backgroundClip: 'text',
                animation: 'gradient 6s ease infinite'
              }}
            >
              for your vision.
            </Box>
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: '1.25rem', 
              color: 'text.secondary', 
              maxWidth: 600, 
              mx: 'auto',
              fontWeight: 500
            }}
          >
            Generate high-performance, responsive React components styled with Tailwind CSS from a simple description.
          </Typography>
        </Box>

        {/* Input Area */}
        <Box 
          component="form" 
          onSubmit={handleGenerate}
          sx={{ 
            maxWidth: 800, 
            mx: 'auto', 
            mb: 10,
            position: 'relative'
          }}
        >
          <Paper
            elevation={24}
            sx={{
              p: 1.5,
              borderRadius: '28px',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1.5,
              bgcolor: 'white',
              border: '1px solid rgba(0,0,0,0.05)',
              boxShadow: '0 25px 50px -12px rgba(79, 70, 229, 0.15)',
              transition: 'all 0.3s',
              '&:focus-within': {
                borderColor: 'primary.light',
                boxShadow: '0 25px 50px -12px rgba(79, 70, 229, 0.25)'
              }
            }}
          >
            <TextField
              fullWidth
              variant="standard"
              placeholder="e.g. A modern SaaS landing page for an AI automation tool..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
              InputProps={{
                disableUnderline: true,
                sx: { 
                  px: 2, 
                  py: 1, 
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  '& ::placeholder': { color: 'text.disabled', opacity: 1 }
                }
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={loading || !prompt.trim()}
              startIcon={loading ? <CircularProgress size={24} color="inherit" /> : <BoltIcon />}
              sx={{
                px: 5,
                py: 2,
                borderRadius: '20px',
                fontSize: '1rem',
                fontWeight: 900,
                textTransform: 'none',
                boxShadow: '0 10px 20px rgba(79, 70, 229, 0.3)',
                '&:hover': {
                  bgcolor: 'text.primary',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
                }
              }}
            >
              {loading ? 'Generating' : 'Generate'}
            </Button>
          </Paper>

          <Box sx={{ mt: 4, display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => setPrompt(`A professional ${tag} website`)}
                sx={{
                  fontWeight: 900,
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  bgcolor: 'white',
                  border: '1px solid rgba(0,0,0,0.05)',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    borderColor: 'primary.main',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.2s'
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Error State */}
        {error && (
          <Fade in={!!error}>
            <Alert 
              severity="error" 
              sx={{ 
                maxWidth: 600, 
                mx: 'auto', 
                mb: 6, 
                borderRadius: 4,
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
              }}
            >
              <AlertTitle sx={{ fontWeight: 900 }}>Generation failed</AlertTitle>
              {error}
            </Alert>
          </Fade>
        )}

        {/* Results Area */}
        {loading && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <CircularProgress size={64} sx={{ mb: 4 }} />
            <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>Gemini is brainstorming...</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Writing Production-ready JSX
            </Typography>
          </Box>
        )}

        {result && (
          <Fade in={!!result}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={4}>
                <Stack spacing={4}>
                  <Card 
                    sx={{ 
                      borderRadius: 8, 
                      boxShadow: '0 20px 40px rgba(79, 70, 229, 0.1)',
                      border: '1px solid rgba(0,0,0,0.05)'
                    }}
                  >
                    <CardContent sx={{ p: 5 }}>
                      <Typography variant="overline" sx={{ fontWeight: 900, color: 'primary.main', letterSpacing: '0.3em' }}>
                        Concept Created
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 900, mb: 3, mt: 1 }}>
                        {result.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 4, fontWeight: 500 }}>
                        {result.description}
                      </Typography>
                      
                      <Divider sx={{ my: 4 }} />
                      
                      <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.disabled', letterSpacing: '0.3em', mb: 3, display: 'block' }}>
                        The Palette
                      </Typography>
                      <Grid container spacing={2}>
                        {Object.entries(result.colors).map(([key, color]) => (
                          <Grid item xs={4} key={key} sx={{ textAlign: 'center' }}>
                            <Box 
                              sx={{ 
                                width: '100%', 
                                aspectSqr: 1, 
                                borderRadius: 3, 
                                bgcolor: color,
                                border: '4px solid white',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                mb: 1.5,
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'scale(1.1) rotate(-4deg)' }
                              }} 
                            />
                            <Typography variant="caption" sx={{ fontWeight: 900, display: 'block', textTransform: 'capitalize' }}>{key}</Typography>
                            <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.disabled', fontWeight: 600 }}>{color}</Typography>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>

                  <Card 
                    sx={{ 
                      bgcolor: 'text.primary', 
                      color: 'white', 
                      borderRadius: 8,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <Box sx={{ position: 'absolute', bottom: -50, right: -50, width: 200, height: 200, bgcolor: 'primary.main', opacity: 0.3, filter: 'blur(50px)', borderRadius: '50%' }} />
                    <CardContent sx={{ p: 5, position: 'relative' }}>
                      <Typography variant="h5" sx={{ fontWeight: 900, mb: 2 }}>Ready to ship?</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.7, mb: 4, fontWeight: 500 }}>
                        This component is using <strong>Tailwind CSS v3+</strong> and standard React hooks.
                      </Typography>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={copyToClipboard}
                        startIcon={copying ? <CheckIcon /> : <CopyIcon />}
                        sx={{
                          bgcolor: copying ? 'success.main' : 'white',
                          color: copying ? 'white' : 'text.primary',
                          py: 2,
                          borderRadius: 4,
                          fontWeight: 900,
                          '&:hover': {
                            bgcolor: copying ? 'success.dark' : 'rgba(255,255,255,0.9)'
                          }
                        }}
                      >
                        {copying ? 'Copied!' : 'Copy JSX Code'}
                      </Button>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>

              <Grid item xs={12} md={8}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    bgcolor: '#0a0c10', 
                    borderRadius: 10, 
                    overflow: 'hidden',
                    height: '100%',
                    minHeight: 600,
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <Box sx={{ p: 3, bgcolor: '#11141a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <Stack direction="row" spacing={1}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f56' }} />
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27c93f' }} />
                    </Stack>
                    <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', letterSpacing: '0.2em' }}>
                      GENERATEDSITE.JSX
                    </Typography>
                    <Box sx={{ px: 2, py: 0.5, bgcolor: 'rgba(79, 70, 229, 0.1)', border: '1px solid rgba(79, 70, 229, 0.2)', borderRadius: 2 }}>
                       <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 900, fontSize: '0.6rem' }}>ES6 REACT</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1, p: 4, overflow: 'auto' }}>
                    <pre style={{ margin: 0 }}>
                      <code style={{ fontFamily: 'Fira Code, monospace', color: '#818cf8', fontSize: '0.875rem', lineHeight: 1.7 }}>
                        {result.reactCode}
                      </code>
                    </pre>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Fade>
        )}
      </Container>

      {/* Footer */}
      <Box sx={{ borderTop: '1px solid rgba(0,0,0,0.05)', py: 10, textAlign: 'center' }}>
        <Stack alignItems="center" spacing={3}>
           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text.disabled' }}>
              <GlobeIcon sx={{ fontSize: 24 }} />
              <Typography variant="caption" sx={{ fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                ReactGenAI v1.1
              </Typography>
           </Box>
           <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, fontWeight: 500 }}>
             Designed for speed. Engineered for precision. <br />
             Generated with the latest Gemini 2.0 Flash model.
           </Typography>
           <Divider sx={{ width: 40 }} />
           <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 700, letterSpacing: '0.1em' }}>
             © 2026 CRAFTED BY ANTIGRAVITY AI
           </Typography>
        </Stack>
      </Box>

      {/* Global styles for pulses and gradients */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.05); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0.2; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </Box>
  );
};

export default App;
