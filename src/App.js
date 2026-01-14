import React, { useState, useEffect } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline,
  Box, 
  Typography, 
  Container, 
  TextField, 
  Button, 
  IconButton, 
  Card, 
  Grid, 
  CircularProgress, 
  Alert, 
  Chip, 
  Fade, 
  Paper, 
  Divider, 
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import { 
  Code as CodeIcon, 
  ElectricBolt as BoltIcon, 
  ContentCopy as CopyIcon, 
  Check as CheckIcon,
  AutoAwesome as MagicIcon,
  Dashboard as DashboardIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  Monitor as PreviewIcon,
  Palette as PaletteIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Delete as DeleteIcon,
  Restore as RestoreIcon
} from '@mui/icons-material';
import { generateWebsite } from './services/geminiService';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6366f1' },
    secondary: { main: '#06b6d4' },
    background: { default: '#09090b', paper: '#121217' },
    divider: 'rgba(255,255,255,0.08)',
  },
  typography: { fontFamily: 'Inter, sans-serif' },
  shape: { borderRadius: 12 },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4f46e5' },
    secondary: { main: '#0891b2' },
    background: { default: '#f8fafc', paper: '#ffffff' },
    divider: 'rgba(0,0,0,0.08)',
  },
  typography: { fontFamily: 'Inter, sans-serif' },
  shape: { borderRadius: 12 },
});

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copying, setCopying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [dialogOpen, setDialogOpen] = useState({ type: null, open: false });
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [history, setHistory] = useState([]);
  const [themeMode, setThemeMode] = useState('dark');

  useEffect(() => {
    setMounted(true);
    const savedHistory = JSON.parse(localStorage.getItem('nexus_history') || '[]');
    setHistory(savedHistory);
    const savedTheme = localStorage.getItem('nexus_theme') || 'dark';
    setThemeMode(savedTheme);
    console.log("🚀 Nexus AI Dashboard is running!");
  }, []);

  const toggleTheme = () => {
    const newTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newTheme);
    localStorage.setItem('nexus_theme', newTheme);
  };

  const saveToHistory = (item) => {
    const newHistory = [item, ...history.filter(h => h.id !== item.id)].slice(0, 20);
    setHistory(newHistory);
    localStorage.setItem('nexus_history', JSON.stringify(newHistory));
  };

  const deleteFromHistory = (id) => {
    const newHistory = history.filter(h => h.id !== id);
    setHistory(newHistory);
    localStorage.setItem('nexus_history', JSON.stringify(newHistory));
  };

  const openDialog = (type) => setDialogOpen({ type, open: true });
  const closeDialog = () => setDialogOpen({ type: null, open: false });
  const showSnackbar = (message) => setSnackbar({ open: true, message });

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await generateWebsite(prompt);
      const historyItem = { ...data, id: Date.now(), prompt };
      setResult(historyItem);
      saveToHistory(historyItem);
      setActiveTab(0);
    } catch (err) {
      console.error("Generation Error:", err);
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

  const samplePrompts = ['SaaS Hero Section', 'E-commerce Product Grid', 'Cyberpunk Portfolio', 'Minimalist Pricing Table'];

  return (
    <ThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box 
        sx={{ 
          height: '100vh', 
          bgcolor: 'background.default',
          color: 'text.primary',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.8s ease'
        }}
      >
      {/* Background Glows */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
         <Box sx={{ position: 'absolute', top: '-10%', right: '-5%', width: '40vw', height: '40vw', background: `radial-gradient(circle, ${themeMode === 'dark' ? '#6366f1' : '#4f46e5'}10 0%, transparent 70%)`, filter: 'blur(80px)' }} />
         <Box sx={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '30vw', height: '30vw', background: `radial-gradient(circle, ${themeMode === 'dark' ? '#06b6d4' : '#0891b2'}08 0%, transparent 70%)`, filter: 'blur(80px)' }} />
      </Box>

      {/* Header */}
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
              <Tooltip title="Toggle Theme"><IconButton size="small" onClick={toggleTheme} sx={{ color: 'primary.main' }}>{themeMode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}</IconButton></Tooltip>
              <Tooltip title="History"><IconButton size="small" onClick={() => openDialog('history')} sx={{ opacity: 0.8 }}><HistoryIcon fontSize="small" /></IconButton></Tooltip>
              <Tooltip title="Models"><IconButton size="small" onClick={() => openDialog('models')} sx={{ opacity: 0.5 }}><DashboardIcon fontSize="small" /></IconButton></Tooltip>
              <Tooltip title="Settings"><IconButton size="small" onClick={() => openDialog('settings')} sx={{ opacity: 0.5 }}><SettingsIcon fontSize="small" /></IconButton></Tooltip>
           </Stack>
           <Divider orientation="vertical" flexItem sx={{ height: 20, my: 'auto' }} />
           <Button variant="outlined" size="small" onClick={() => openDialog('docs')} sx={{ borderRadius: 2, fontSize: '0.75rem' }}>Documentation</Button>
        </Stack>
      </Box>

      {/* Workspace */}
      <Box sx={{ flex: 1, p: 3, position: 'relative', zIndex: 1, overflow: 'hidden' }}>
        <Grid container spacing={3} sx={{ height: '100%' }}>
          
          {/* LEFT: Control Side */}
          <Grid item xs={12} md={4} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
          </Grid>

          {/* RIGHT: Output Side */}
          <Grid item xs={12} md={8} sx={{ height: '100%' }}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {result ? (
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
                      border: '1px solid rgba(255,255,255,0.06)'
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
              ) : (
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
                    p: 4
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
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Dialogs */}
      <Dialog open={dialogOpen.open} onClose={closeDialog} PaperProps={{ sx: { borderRadius: 4, bgcolor: 'background.paper', minWidth: 400, maxWidth: 500 } }}>
        <DialogTitle sx={{ fontWeight: 900 }}>
          {dialogOpen.type === 'models' && "Intelligent Models"}
          {dialogOpen.type === 'settings' && "Workspace Settings"}
          {dialogOpen.type === 'docs' && "Documentation"}
          {dialogOpen.type === 'history' && "Generation History"}
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: 'divider' }}>
          {dialogOpen.type === 'history' && (
            <List>
              {history.length === 0 ? (
                <Typography variant="body2" sx={{ textAlign: 'center', py: 4, color: 'text.disabled' }}>No history yet.</Typography>
              ) : (
                history.map((item) => (
                  <ListItem key={item.id} sx={{ p: 2, borderRadius: 2, mb: 1, '&:hover': { bgcolor: 'action.hover' } }}>
                    <ListItemText 
                      primary={item.name} 
                      secondary={item.prompt.substring(0, 40) + '...'} 
                      primaryTypographyProps={{ fontWeight: 900 }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton size="small" onClick={() => { setResult(item); setPrompt(item.prompt); closeDialog(); }} sx={{ mr: 1, color: 'primary.main' }}>
                        <RestoreIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => deleteFromHistory(item.id)} color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              )}
            </List>
          )}
          {dialogOpen.type === 'models' && (
            <Stack spacing={2}>
              <Paper sx={{ p: 2, bgcolor: themeMode === 'dark' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(79, 70, 229, 0.05)', border: '1px solid', borderColor: 'primary.main' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>Gemini 2.0 Flash (Default)</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>High speed, multimodal, optimized for code generation.</Typography>
              </Paper>
              <Paper sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.02)', border: '1px solid', borderColor: 'divider', opacity: 0.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>Gemini 1.5 Pro</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Reasoning focused. Coming Soon.</Typography>
              </Paper>
            </Stack>
          )}
          {dialogOpen.type === 'settings' && (
            <Stack spacing={3}>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main' }}>API CONFIGURATION</Typography>
                <TextField fullWidth size="small" label="Gemini API Key" type="password" sx={{ mt: 1 }} defaultValue="••••••••••••••••••••" disabled />
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>Managed via root .env file.</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main' }}>PREFERENCES</Typography>
                <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>Theme: {themeMode === 'dark' ? 'Obsidian Dark' : 'Crystal Light'} (Active)</Typography>
              </Box>
            </Stack>
          )}
          {dialogOpen.type === 'docs' && (
            <Stack spacing={2}>
               <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                 Welcome to <strong>Nexus AI</strong>. To generate a component:
               </Typography>
               <Typography variant="body2" sx={{ pl: 2 }}>
                 1. Enter a detailed prompt in the left panel.<br />
                 2. Click "Generate Component".<br />
                 3. View the code in the "Production Code" tab.<br />
                 4. Copy and paste into your project.
               </Typography>
               <Typography variant="caption" sx={{ color: 'text.secondary' }}>Note: Components are styled with Tailwind CSS v3.</Typography>
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={closeDialog} color="inherit" sx={{ fontWeight: 800 }}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
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
    </ThemeProvider>
  );
};

export default App;
