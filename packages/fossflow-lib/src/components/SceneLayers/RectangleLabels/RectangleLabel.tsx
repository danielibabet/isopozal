import React, { useMemo, memo } from 'react';
import { Box, Typography } from '@mui/material';
import { useScene } from 'src/hooks/useScene';
import { useRectangle } from 'src/hooks/useRectangle';
import { getTilePosition } from 'src/utils';
import { PROJECTED_TILE_SIZE } from 'src/config';
import { Label } from 'src/components/Label/Label';
import { RectangleLabel as RectangleLabelType } from 'src/types';

interface Props {
  rectangle: ReturnType<typeof useScene>['rectangles'][0];
}

export const RectangleLabel = memo(({ rectangle: sceneRectangle }: Props) => {
  const rectangle = useRectangle(sceneRectangle.id);

  const labels = useMemo(() => {
    if (!rectangle) return [];
    return rectangle.labels || [];
  }, [rectangle]);

  // Calculate label positions based on percentage and edge
  const labelPositions = useMemo(() => {
    if (!rectangle) return [];

    const { from, to } = sceneRectangle;

    return labels
      .map((label) => {
        const edge = label.edge || 'top';
        const position = label.position; // 0-100 percentage

        let tile = { x: 0, y: 0 };

        // Calculate position along the specified edge
        switch (edge) {
          case 'top':
            tile = {
              x: from.x + ((to.x - from.x) * position) / 100,
              y: from.y
            };
            break;
          case 'right':
            tile = {
              x: to.x,
              y: from.y + ((to.y - from.y) * position) / 100
            };
            break;
          case 'bottom':
            tile = {
              x: from.x + ((to.x - from.x) * position) / 100,
              y: to.y
            };
            break;
          case 'left':
            tile = {
              x: from.x,
              y: from.y + ((to.y - from.y) * position) / 100
            };
            break;
        }

        const tilePosition = getTilePosition({ tile });

        return { label, position: tilePosition };
      })
      .filter(
        (
          item
        ): item is {
          label: RectangleLabelType;
          position: { x: number; y: number };
        } => {
          return item !== null;
        }
      );
  }, [labels, sceneRectangle.from, sceneRectangle.to]);

  return (
    <>
      {labelPositions.map(({ label, position }) => {
        return (
          <Box
            key={label.id}
            sx={{ position: 'absolute', pointerEvents: 'none' }}
            style={{
              maxWidth: PROJECTED_TILE_SIZE.width,
              left: position.x,
              top: position.y
            }}
          >
            <Label
              maxWidth={150}
              labelHeight={label.height || 0}
              showLine={label.showLine !== false}
              sx={{
                py: 0.75,
                px: 1,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                opacity: 0.95
              }}
            >
              <Typography color="text.secondary" variant="body2">
                {label.text}
              </Typography>
            </Label>
          </Box>
        );
      })}
    </>
  );
});
