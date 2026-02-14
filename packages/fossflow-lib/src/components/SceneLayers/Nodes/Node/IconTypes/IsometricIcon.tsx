import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { PROJECTED_TILE_SIZE } from 'src/config';
import { useResizeObserver } from 'src/hooks/useResizeObserver';

interface Props {
  url: string;
  scale?: number;
  onImageLoaded?: () => void;
}

export const IsometricIcon = ({ url, scale = 1, onImageLoaded }: Props) => {
  const ref = useRef<HTMLImageElement>(null);
  const { size, observe, disconnect } = useResizeObserver();

  // Get base path from window location for GitHub Pages support
  const getBasePath = () => {
    const pathname = window.location.pathname;
    // If pathname starts with /isopozal, use that as base
    if (pathname.startsWith('/isopozal')) {
      return '/isopozal';
    }
    return '';
  };

  const blockUrl = `${getBasePath()}/block.png`;

  useEffect(() => {
    if (!ref.current) return;

    observe(ref.current);

    return disconnect;
  }, [observe, disconnect]);

  return (
    <>
      {/* Block layer - background - VISUAL ONLY, NOT CLICKEABLE */}
      <Box
        component="img"
        src={blockUrl}
        sx={{
          position: 'absolute',
          width: PROJECTED_TILE_SIZE.width * scale,
          top: -PROJECTED_TILE_SIZE.height * scale, // Move up one tile height
          left: -PROJECTED_TILE_SIZE.width * scale / 2,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      {/* AWS Icon layer - on top face with isometric projection - VISUAL ONLY, NOT CLICKEABLE */}
      <Box
        ref={ref}
        component="img"
        onLoad={onImageLoaded}
        src={url}
        sx={{
          position: 'absolute',
          width: PROJECTED_TILE_SIZE.width * scale * 0.46,
          top: -PROJECTED_TILE_SIZE.height * scale * 1.06, // Adjust relative to new block position
          left: -size.width / 2,
          pointerEvents: 'none',
          transform: 'rotateX(53deg) rotateZ(-45deg) rotateZ(90deg)',
          transformOrigin: 'center center',
          transformStyle: 'preserve-3d',
          zIndex: 2
        }}
      />
    </>
  );
};
