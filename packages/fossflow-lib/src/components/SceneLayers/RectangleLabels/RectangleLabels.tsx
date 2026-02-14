import React, { memo } from 'react';
import { useScene } from 'src/hooks/useScene';
import { RectangleLabel } from './RectangleLabel';

export const RectangleLabels = memo(() => {
  const { rectangles } = useScene();

  return (
    <>
      {rectangles.map((rectangle) => {
        return <RectangleLabel key={rectangle.id} rectangle={rectangle} />;
      })}
    </>
  );
});
