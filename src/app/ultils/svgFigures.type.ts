import { Circle, Ellipse, Line, Path, Polyline, Rect } from '@svgdotjs/svg.js';

export type shapeTypes = Line | Path | Circle | Ellipse | Rect | Polyline;

export enum shapes {
  'line' = 'line',
  'path' = 'path',
  'circle' = 'circle',
  'ellipse' = 'ellipse',
  'rect' = 'rect',
  'polyline' = 'polyline',
}
