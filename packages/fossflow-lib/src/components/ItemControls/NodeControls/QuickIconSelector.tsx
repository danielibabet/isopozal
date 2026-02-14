import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Box, Stack, Typography, Divider, TextField, InputAdornment, Alert } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Icon } from 'src/types';
import { useModelStore } from 'src/stores/modelStore';
import { useIconCategories } from 'src/hooks/useIconCategories';
import { IconGrid } from '../IconSelectionControls/IconGrid';
import { Icons } from '../IconSelectionControls/Icons';
import { Section } from '../components/Section';

interface Props {
  onIconSelected: (icon: Icon) => void;
  onClose?: () => void;
  currentIconId?: string;
}

export const QuickIconSelector = ({ onIconSelected, onClose }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const icons = useModelStore((state) => state.icons);
  const { iconCategories } = useIconCategories();

  // Filter icons based on search - simple string matching
  const filteredIcons = useMemo(() => {
    if (!searchTerm) return null;
    
    const searchLower = searchTerm.toLowerCase().trim();
    return icons.filter(icon => icon.name.toLowerCase().includes(searchLower));
  }, [searchTerm, icons]);

  // Focus search input on mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle navigation if we're showing search results
      if (!filteredIcons || filteredIcons.length === 0) return;
      
      const itemsPerRow = 4; // Adjust based on your grid layout
      const totalItems = filteredIcons.length;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHoveredIndex(prev => 
            Math.min(prev + itemsPerRow, totalItems - 1)
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHoveredIndex(prev => 
            Math.max(prev - itemsPerRow, 0)
          );
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setHoveredIndex(prev => 
            prev > 0 ? prev - 1 : prev
          );
          break;
        case 'ArrowRight':
          e.preventDefault();
          setHoveredIndex(prev => 
            prev < totalItems - 1 ? prev + 1 : prev
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredIcons[hoveredIndex]) {
            handleIconSelect(filteredIcons[hoveredIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredIcons, hoveredIndex, onClose]);

  const handleIconSelect = useCallback((icon: Icon) => {
    onIconSelected(icon);
  }, [onIconSelected]);

  const handleIconDoubleClick = useCallback((icon: Icon) => {
    handleIconSelect(icon);
    onClose?.();
  }, [handleIconSelect, onClose]);

  return (
    <Box>
      <Section sx={{ py: 2 }}>
        <Stack spacing={2}>
          {/* Search Box */}
          <TextField
            ref={searchInputRef}
            fullWidth
            placeholder="Buscar servicios AWS (pulsa Enter)"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setHoveredIndex(0); // Reset hover when searching
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            size="small"
            autoFocus
          />
        </Stack>
      </Section>

      {/* Search Results */}
      {searchTerm && filteredIcons && (
        <>
          <Section sx={{ py: 1 }}>
            <Typography variant="caption" color="text.secondary">
              BUSCAR RESULTADOS ({filteredIcons.length} servicios)
            </Typography>
          </Section>
          <Divider />
          <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
            {filteredIcons.length > 0 ? (
              <Section>
                <IconGrid
                  icons={filteredIcons}
                  onClick={handleIconSelect}
                  onDoubleClick={handleIconDoubleClick}
                  hoveredIndex={hoveredIndex}
                  onHover={setHoveredIndex}
                />
              </Section>
            ) : (
              <Section>
                <Alert severity="info">No se encontraron coincidencias para "{searchTerm}"</Alert>
              </Section>
            )}
          </Box>
        </>
      )}

      {/* Original Icon Libraries - Show when no search */}
      {!searchTerm && (
        <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
          <Icons
            iconCategories={iconCategories}
            onClick={handleIconSelect}
            onMouseDown={() => {}} // Not needed for selection
          />
        </Box>
      )}

      {/* Help Text */}
      <Section sx={{ py: 1 }}>
        <Typography variant="caption" color="text.secondary">
          {searchTerm 
            ? '← → para navegar • Enter para seleccionar • Doble clic para seleccionar y cerrar'
            : 'Escriba para buscar • Clic en la categoría para expandir • Doble clic para seleccionar y cerrar'
          }
        </Typography>
      </Section>
    </Box>
  );
};
