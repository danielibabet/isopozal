import React, { useState, useMemo } from 'react';
import {
  Box,
  IconButton as MUIIconButton,
  FormControlLabel,
  Switch,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Paper
} from '@mui/material';
import { RectangleLabel } from 'src/types';
import { useRectangle } from 'src/hooks/useRectangle';
import { ColorSelector } from 'src/components/ColorSelector/ColorSelector';
import { CustomColorInput } from 'src/components/ColorSelector/CustomColorInput';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useScene } from 'src/hooks/useScene';
import {
  Close as CloseIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { generateId } from 'src/utils';
import { ControlsContainer } from '../components/ControlsContainer';
import { Section } from '../components/Section';
import { DeleteButton } from '../components/DeleteButton';

interface Props {
  id: string;
}

export const RectangleControls = ({ id }: Props) => {
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const rectangle = useRectangle(id);
  const { updateRectangle, deleteRectangle } = useScene();
  const [useCustomColor, setUseCustomColor] = useState(!!rectangle?.customColor);

  // Get all labels
  const labels = useMemo(() => {
    if (!rectangle) return [];
    return rectangle.labels || [];
  }, [rectangle]);

  // If rectangle doesn't exist, return null
  if (!rectangle) {
    return null;
  }

  const handleAddLabel = () => {
    if (labels.length >= 256) return;

    const newLabel: RectangleLabel = {
      id: generateId(),
      text: '',
      position: 50,
      height: 0,
      edge: 'top',
      showLine: true
    };

    const updatedLabels = [...labels, newLabel];
    updateRectangle(rectangle.id, {
      labels: updatedLabels
    });
  };

  const handleUpdateLabel = (
    labelId: string,
    updates: Partial<RectangleLabel>
  ) => {
    const updatedLabels = labels.map((label) => {
      return label.id === labelId ? { ...label, ...updates } : label;
    });

    updateRectangle(rectangle.id, {
      labels: updatedLabels
    });
  };

  const handleDeleteLabel = (labelId: string) => {
    const updatedLabels = labels.filter((label) => {
      return label.id !== labelId;
    });
    updateRectangle(rectangle.id, {
      labels: updatedLabels
    });
  };

  return (
    <ControlsContainer>
      <Box
        sx={{ position: 'relative', paddingTop: '24px', paddingBottom: '24px' }}
      >
        {/* Close button */}
        <MUIIconButton
          aria-label="Close"
          onClick={() => {
            return uiStateActions.setItemControls(null);
          }}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 2
          }}
          size="small"
        >
          <CloseIcon />
        </MUIIconButton>
        <Section title="Etiquetas">
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {labels.length} / 256 etiquetas
              </Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddLabel}
                disabled={labels.length >= 256}
                size="small"
                variant="outlined"
              >
                Añadir Etiqueta
              </Button>
            </Box>

            {labels.length === 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: 'center', py: 2 }}
              >
                Sin etiquetas. Haz clic en &quot;Añadir Etiqueta&quot; para crear una.
              </Typography>
            )}

            {labels.map((label, index) => {
              return (
                <Paper key={label.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Etiqueta {index + 1}
                    </Typography>
                    <MUIIconButton
                      size="small"
                      onClick={() => {
                        return handleDeleteLabel(label.id);
                      }}
                      color="error"
                    >
                      <DeleteIcon fontSize="small" />
                    </MUIIconButton>
                  </Box>

                  <TextField
                    label="Texto"
                    value={label.text}
                    onChange={(e) => {
                      return handleUpdateLabel(label.id, {
                        text: e.target.value
                      });
                    }}
                    fullWidth
                    sx={{ mb: 2 }}
                  />

                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                      label="Posición (%)"
                      type="number"
                      value={label.position}
                      onChange={(e) => {
                        const inputValue = e.target.value;

                        // Allow empty input
                        if (inputValue === '') {
                          handleUpdateLabel(label.id, { position: 0 });
                          return;
                        }

                        const value = parseInt(inputValue, 10);
                        if (!Number.isNaN(value)) {
                          handleUpdateLabel(label.id, {
                            position: Math.max(0, Math.min(100, value))
                          });
                        }
                      }}
                      onBlur={(e) => {
                        // On blur, ensure we have a valid value
                        if (e.target.value === '') {
                          handleUpdateLabel(label.id, { position: 0 });
                        }
                      }}
                      inputProps={{ min: 0, max: 100 }}
                      sx={{ flex: 1 }}
                    />

                    <Select
                      value={label.edge || 'top'}
                      onChange={(e) => {
                        return handleUpdateLabel(label.id, {
                          edge: e.target.value as 'top' | 'right' | 'bottom' | 'left'
                        });
                      }}
                      sx={{ flex: 1 }}
                    >
                      <MenuItem value="top">Arriba</MenuItem>
                      <MenuItem value="right">Derecha</MenuItem>
                      <MenuItem value="bottom">Abajo</MenuItem>
                      <MenuItem value="left">Izquierda</MenuItem>
                    </Select>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Desplazamiento Vertical
                    </Typography>
                    <Box sx={{ px: 1 }}>
                      <input
                        type="range"
                        min="-100"
                        max="100"
                        step="10"
                        value={label.height || 0}
                        onChange={(e) => {
                          return handleUpdateLabel(label.id, {
                            height: parseInt(e.target.value, 10)
                          });
                        }}
                        style={{ width: '100%' }}
                      />
                    </Box>
                  </Box>

                  <Box>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={label.showLine !== false}
                          onChange={(e) => {
                            return handleUpdateLabel(label.id, {
                              showLine: e.target.checked
                            });
                          }}
                        />
                      }
                      label="Mostrar Línea Punteada"
                    />
                  </Box>
                </Paper>
              );
            })}
          </Box>
        </Section>
        <Section title="Color">
          <FormControlLabel
            control={
              <Switch
                checked={useCustomColor}
                onChange={(e) => {
                  setUseCustomColor(e.target.checked);
                  if (!e.target.checked) {
                    updateRectangle(rectangle.id, { customColor: '' });
                  }
                }}
              />
            }
            label="Personalizar Color"
            sx={{ mb: 2 }}
          />
          {useCustomColor ? (
            <CustomColorInput
              value={rectangle.customColor || '#000000'}
              onChange={(color) => {
                updateRectangle(rectangle.id, { customColor: color });
              }}
            />
          ) : (
            <ColorSelector
              onChange={(color) => {
                updateRectangle(rectangle.id, { color, customColor: '' });
              }}
              activeColor={rectangle.color}
            />
          )}
        </Section>
        <Section>
          <Box>
            <DeleteButton
              onClick={() => {
                uiStateActions.setItemControls(null);
                deleteRectangle(rectangle.id);
              }}
            />
          </Box>
        </Section>
      </Box>
    </ControlsContainer>
  );
};
