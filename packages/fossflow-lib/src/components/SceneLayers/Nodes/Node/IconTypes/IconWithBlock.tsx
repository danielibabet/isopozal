import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { PROJECTED_TILE_SIZE } from 'src/config';
import { useResizeObserver } from 'src/hooks/useResizeObserver';
import blockSvg from 'src/assets/block.svg';

interface Props {
  url: string;
  scale?: number;
  onImageLoaded?: () => void;
}

export const IconWithBlock = ({ url, scale = 1, onImageLoaded }: Props) => {
  const ref = useRef<HTMLImageElement>(null);
  const { size, observe, disconnect } = useResizeObserver();

  useEffect(() => {
    if (!ref.current) return;

    observe(ref.current);

    return disconnect;
  }, [observe, disconnect]);

  const blockSize = PROJECTED_TILE_SIZE.width * 0.8 * scale;
  const iconSize = PROJECTED_TILE_SIZE.width * 0.5 * scale;

  return (
    <Box
      sx={{
        position: 'absolute',
        pointerEvents: 'none'
      }}
    >
      {/* Isometric Block - using original SVG */}
      <Box
        component="img"
        src={blockSvg}
        sx={{
          position: 'absolute',
          width: blockSize,
          top: -blockSize * 0.55,
          left: -blockSize / 2
        }}
      />

      {/* Icon on top face - with isometric transformation */}
      <Box
        ref={ref}
        component="img"
        onLoad={onImageLoaded}
        src={url}
        sx={{
          position: 'absolute',
          width: iconSize,
          height: iconSize,
          top: -blockSize * 0.35,
          left: -iconSize / 2,
          pointerEvents: 'none',
          // Apply isometric transformation: rotate 45deg and scale Y to create diamond shape
          transform: 'rotate(45deg) scaleY(0.58)',
          transformOrigin: 'center center'
        }}
      />
    </Box>
  );
};
