import React from 'react';
import { countryMaps } from '../data/maps';

const PIN_RADIUS = 14;
// A tall map is drawn smaller on the page, so its pins grow to stay about the same size on screen.
const TALL_FROM = 400;

/** A numbered pin. The number matches the list beside the map. */
const Pin = ({ x, y, number, scale }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <circle r={PIN_RADIUS} className="fill-accent stroke-paper" strokeWidth="3" />
    <text textAnchor="middle" dy="0.35em" fontSize="15" className="fill-paper font-semibold">
      {number}
    </text>
  </g>
);

/** One country with its neighbours faint around it and a numbered pin on each place that has news. */
export const CountryMap = ({ id, label }) => {
  const map = countryMaps[id];
  const scale = Math.max(1, Number(map.viewBox.split(' ')[3]) / TALL_FROM);
  return (
    <svg viewBox={map.viewBox} role="img" aria-label={`Map of ${label} with a pin on the capital`} className="mx-auto max-h-[28rem] w-full">
      {map.neighbours.map((path) => (
        <path key={path.slice(0, 40)} d={path} className="fill-line/40 stroke-line" strokeWidth="1" />
      ))}
      <path d={map.outline} className="fill-meadow stroke-green" strokeWidth="2" strokeLinejoin="round" />
      {map.pins.map((pin, index) => (
        <Pin key={pin.id} x={pin.x} y={pin.y} number={index + 1} scale={scale} />
      ))}
    </svg>
  );
};
