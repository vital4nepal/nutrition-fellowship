import React from 'react';
import { Link } from 'react-router-dom';
import { countryMaps, regionMap } from '../data/maps';

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

/**
 * The four chapter countries on one map. The current one is dark green and the others are light.
 * Each country is a link to its page. `labels` is the text beside each pin, by country id.
 */
export const RegionMap = ({ currentId, labels, names }) => (
  <svg viewBox={regionMap.viewBox} role="group" aria-label="Map of the four chapter countries" className="mx-auto w-full">
    {regionMap.neighbours.map((path) => (
      <path key={path.slice(0, 40)} d={path} className="fill-line/40 stroke-line" strokeWidth="1" />
    ))}
    {Object.entries(regionMap.countries).map(([id, path]) => (
      <Link key={id} to={`/chapters/${id}`} aria-label={`${names[id]} chapter`}>
        <path
          d={path}
          strokeWidth="1.5"
          strokeLinejoin="round"
          className={`stroke-green transition-colors hover:fill-chart-pos ${id === currentId ? 'fill-green' : 'fill-meadow'}`}
        />
      </Link>
    ))}
    {regionMap.pins.map((pin) => (
      <g key={pin.id} pointerEvents="none">
        <circle cx={pin.x} cy={pin.y} r="7" className="fill-accent stroke-paper" strokeWidth="2.5" />
        <text
          x={pin.x}
          y={pin.y + 26}
          textAnchor="middle"
          fontSize="20"
          className="fill-ink stroke-paper font-semibold"
          strokeWidth="4"
          paintOrder="stroke"
        >
          {labels[pin.id]}
        </text>
      </g>
    ))}
  </svg>
);
