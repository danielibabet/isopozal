import { z } from 'zod';
import { id, coords, constrainedStrings } from './common';

export const rectangleLabelSchema = z.object({
  id,
  text: constrainedStrings.description,
  position: z.number().min(0).max(100), // Percentage along the edge (0-100)
  height: z.number().optional(), // Vertical offset
  edge: z.enum(['top', 'right', 'bottom', 'left']).optional(), // Which edge (defaults to 'top')
  showLine: z.boolean().optional() // Show the dotted line connecting label to rectangle (defaults to true)
});

export const rectangleSchema = z.object({
  id,
  color: id.optional(),
  customColor: z.string().optional(), // For custom RGB colors
  from: coords,
  to: coords,
  labels: z.array(rectangleLabelSchema).max(256).optional()
});
