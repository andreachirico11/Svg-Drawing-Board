import { Line, Path, Polyline } from '@svgdotjs/svg.js';

export type shapeTypes = Line | Path | Polyline;

export enum shapes {
  'line' = 'line',
  'path' = 'path',
  'polyline' = 'polyline',
}
