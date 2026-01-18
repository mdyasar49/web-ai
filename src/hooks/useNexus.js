import { useState, useEffect } from 'react';
import { generateWebsite } from '../services/apiService';

export const useNexus = () => {
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

  useEffect(() => {
    setMounted(true);
    const savedHistory = JSON.parse(localStorage.getItem('nexus_history') || '[]');
    setHistory(savedHistory);
  }, []);

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
      console.log('Data received from API:', data);
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

  return {
    prompt, setPrompt,
    loading,
    result, setResult,
    error,
    copying,
    mounted,
    activeTab, setActiveTab,
    dialogOpen,
    snackbar, setSnackbar,
    history,
    openDialog, closeDialog,
    showSnackbar,
    handleGenerate,
    copyToClipboard,
    deleteFromHistory
  };
};
