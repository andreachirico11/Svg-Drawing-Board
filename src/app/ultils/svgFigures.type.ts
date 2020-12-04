import { Circle, Ellipse, Line, Path, Rect } from '@svgdotjs/svg.js';

export type shapeTypes = Line | Path | Circle | Ellipse | Rect;

export enum shapes {
  'line' = 'line',
  'path' = 'path',
  'circle' = 'circle',
  'ellipse' = 'ellipse',
  'rect' = 'rect',
}
