import React, { useMemo, memo } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import {
  PROJECTED_TILE_SIZE,
  DEFAULT_LABEL_HEIGHT,
  MARKDOWN_EMPTY_VALUE
} from 'src/config';
import { getTilePosition } from 'src/utils';
import { useIcon } from 'src/hooks/useIcon';
import { ViewItem } from 'src/types';
import { useModelItem } from 'src/hooks/useModelItem';
import { ExpandableLabel } from 'src/components/Label/ExpandableLabel';
import { RichTextEditor } from 'src/components/RichTextEditor/RichTextEditor';

interface Props {
  node: ViewItem;
  order: number;
}

export const Node = memo(({ node, order }: Props) => {
  const modelItem = useModelItem(node.id);
  const { iconComponent, icon } = useIcon(modelItem?.icon);

  const position = useMemo(() => {
    return getTilePosition({
      tile: node.tile,
      origin: 'BOTTOM'
    });
  }, [node.tile]);

  const description = useMemo(() => {
    if (
      !modelItem ||
      modelItem.description === undefined ||
      modelItem.description === MARKDOWN_EMPTY_VALUE
    )
      return null;

    return modelItem.description;
  }, [modelItem?.description]);

  // Generate icon display name: "Category - Icon Name"
  const iconDisplayName = useMemo(() => {
    if (!icon?.id) return null;
    
    const category = icon.collection?.replace(/-/g, ' ') || 'General';
    const iconName = icon.id.replace(/-/g, ' ');
    
    return `${category} - ${iconName}`;
  }, [icon]);

  // If modelItem doesn't exist, don't render the node
  if (!modelItem) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: order
      }}
    >
      <Box
        sx={{ position: 'absolute' }}
        style={{
          left: position.x,
          top: position.y
        }}
      >
        {(iconDisplayName || modelItem?.name || description) && (
          <Box
            sx={{ position: 'absolute' }}
            style={{ bottom: PROJECTED_TILE_SIZE.height / 2 }}
          >
            <ExpandableLabel
              maxWidth={250}
              expandDirection="BOTTOM"
              labelHeight={node.labelHeight ?? DEFAULT_LABEL_HEIGHT}
            >
              <Stack spacing={1}>
                {iconDisplayName && (
                  <Typography variant="caption" sx={{ color: 'black', fontWeight: 600 }}>
                    {iconDisplayName}
                  </Typography>
                )}
                {modelItem.name && modelItem.name !== 'Untitled' && modelItem.name !== 'Sin título' && modelItem.name.trim() !== '' && (
                  <Typography fontWeight={600} sx={{ color: 'black' }}>{modelItem.name}</Typography>
                )}
                {modelItem.description &&
                  modelItem.description !== MARKDOWN_EMPTY_VALUE && (
                    <Box sx={{ color: 'black' }}>
                      <RichTextEditor value={modelItem.description} readOnly />
                    </Box>
                  )}
              </Stack>
            </ExpandableLabel>
          </Box>
        )}
        {iconComponent && (
          <Box
            sx={{
              position: 'absolute'
            }}
          >
            {iconComponent}
          </Box>
        )}
      </Box>
    </Box>
  );
});
