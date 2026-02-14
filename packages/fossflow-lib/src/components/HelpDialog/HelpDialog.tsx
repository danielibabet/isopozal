import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Divider,
  Stack
} from '@mui/material';
import { Close as CloseIcon, Launch as LaunchIcon } from '@mui/icons-material';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { DialogTypeEnum } from 'src/types/ui';
import { useTranslation } from 'src/stores/localeStore';

interface ShortcutItem {
  action: string;
  shortcut: string;
  description: string;
}

export const HelpDialog = () => {
  const { t } = useTranslation('helpDialog');
  
  const dialog = useUiStateStore((state) => {
    return state.dialog;
  });
  const setDialog = useUiStateStore((state) => {
    return state.actions.setDialog;
  });

  const isOpen = dialog === DialogTypeEnum.HELP;

  const handleClose = () => {
    setDialog(null);
  };

  const keyboardShortcuts = [
    {
      action: t('undoAction'),
      shortcut: 'Ctrl+Z',
      description: t('undoDescription')
    },
    {
      action: t('redoAction'),
      shortcut: 'Ctrl+Y',
      description: t('redoDescription')
    },
    {
      action: t('redoAltAction'),
      shortcut: 'Ctrl+Shift+Z',
      description: t('redoAltDescription')
    },
    {
      action: t('helpAction'),
      shortcut: 'F1',
      description: t('helpDescription')
    },
    {
      action: t('zoomInAction'),
      shortcut: t('zoomInShortcut'),
      description: t('zoomInDescription')
    },
    {
      action: t('zoomOutAction'),
      shortcut: t('zoomOutShortcut'),
      description: t('zoomOutDescription')
    },
    {
      action: t('panCanvasAction'),
      shortcut: t('panCanvasShortcut'),
      description: t('panCanvasDescription')
    },
    {
      action: t('contextMenuAction'),
      shortcut: t('contextMenuShortcut'),
      description: t('contextMenuDescription')
    }
  ];

  const mouseInteractions = [
    {
      action: t('selectToolAction'),
      shortcut: t('selectToolShortcut'),
      description: t('selectToolDescription')
    },
    {
      action: t('panToolAction'),
      shortcut: t('panToolShortcut'),
      description: t('panToolDescription')
    },
    {
      action: t('addItemAction'),
      shortcut: t('addItemShortcut'),
      description: t('addItemDescription')
    },
    {
      action: t('drawRectangleAction'),
      shortcut: t('drawRectangleShortcut'),
      description: t('drawRectangleDescription')
    },
    {
      action: t('createConnectorAction'),
      shortcut: t('createConnectorShortcut'),
      description: t('createConnectorDescription')
    },
    {
      action: t('addTextAction'),
      shortcut: t('addTextShortcut'),
      description: t('addTextDescription')
    }
  ];

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          minHeight: '60vh'
        }
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="div">
            {t('title')}
          </Typography>
          <Button
            onClick={handleClose}
            sx={{
              minWidth: 'auto',
              p: 1,
              bgcolor: 'transparent',
              boxShadow: 'none',
              '&:hover': { bgcolor: 'transparent' },
              '&:focus': { bgcolor: 'transparent' },
              '&:active': { bgcolor: 'transparent' }
            }}
          >
            <CloseIcon />
          </Button>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('keyboardShortcuts')}
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>{t('action')}</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>{t('shortcut')}</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>{t('description')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {keyboardShortcuts.map((shortcut, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{shortcut.action}</TableCell>
                      <TableCell>
                        <code
                          style={{
                            backgroundColor: '#f5f5f5',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontFamily: 'monospace',
                            color: '#000000'
                          }}
                        >
                          {shortcut.shortcut}
                        </code>
                      </TableCell>
                      <TableCell>{shortcut.description}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h6" gutterBottom>
            {t('mouseInteractions')}
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>{t('action')}</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>{t('method')}</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>{t('description')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mouseInteractions.map((interaction, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{interaction.action}</TableCell>
                      <TableCell>
                        <code
                          style={{
                            backgroundColor: '#f5f5f5',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontFamily: 'monospace',
                            color: '#000000'
                          }}
                        >
                          {interaction.shortcut}
                        </code>
                      </TableCell>
                      <TableCell>{interaction.description}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Card superior con botón GitHub */}
        <Box sx={{ mb: 2, p: 2, border: '1px solid #3c4b64', borderRadius: 2, bgcolor: 'background.paper', textAlign: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<LaunchIcon />}
            href="https://github.com/danielibabet/isopozal"
            target="_blank"
            rel="noopener noreferrer"
            size="large"
          >
            Github
          </Button>
        </Box>

        {/* 3 columnas con recursos */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Columna 1: AWS */}
            <Box sx={{ flex: 1, p: 2, border: '1px solid #3c4b64', borderRadius: 2, bgcolor: 'background.paper' }}>
              <Typography variant="h6" gutterBottom color="primary.main">
                Recursos Oficiales AWS
              </Typography>
              <Typography variant="body2" paragraph>
                Utilizando iconos oficiales Release 2025.07.31.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<LaunchIcon />}
                href="https://aws.amazon.com/architecture/icons/"
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                AWS Architecture Icons
              </Button>
            </Box>

            {/* Columna 2: FossFlow GitHub */}
            <Box sx={{ flex: 1, p: 2, border: '1px solid #3c4b64', borderRadius: 2, bgcolor: 'background.paper' }}>
              <Typography variant="h6" gutterBottom color="primary.main">
                GitHub de FossFLOW
              </Typography>
              <Typography variant="body2" paragraph>
                Github utilizado como base
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<LaunchIcon />}
                href="https://github.com/stan-smith/FossFLOW"
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                Github
              </Button>
            </Box>

            {/* Columna 3: Buy Me A Coffee */}
            <Box sx={{ flex: 1, p: 2, border: '1px solid #3c4b64', borderRadius: 2, bgcolor: 'background.paper' }}>
              <Typography variant="h6" gutterBottom color="primary.main">
                Buy Me A Coffee
              </Typography>
              <Typography variant="body2" paragraph sx={{ color: 'transparent', userSelect: 'none' }}>
                .
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<LaunchIcon />}
                href="https://buymeacoffee.com/dibanezb"
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                Buy Me A Coffee
              </Button>
            </Box>
          </Stack>
        </Box>

        <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
          <Typography variant="body2" color="info.contrastText">
            <strong>{t('note')}</strong> {t('noteContent')}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          {t('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
