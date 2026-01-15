import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton, 
  Typography, 
  Stack, 
  Paper, 
  TextField,
  Box
} from '@mui/material';
import { 
  Restore as RestoreIcon, 
  Delete as DeleteIcon 
} from '@mui/icons-material';
import { useThemeMode } from '../../context/ThemeContext';

const AppDialogs = ({ 
  dialogOpen, 
  closeDialog, 
  history, 
  setResult, 
  setPrompt, 
  deleteFromHistory 
}) => {
  const { themeMode } = useThemeMode();

  return (
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
  );
};

export default AppDialogs;
