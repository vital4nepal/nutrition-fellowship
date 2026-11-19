import React from 'react';

const PIE_SIZE = 80;
const PIE_RADIUS = PIE_SIZE / 2 - 1;

/** The wedge of a pie from 12 o'clock, clockwise. `fraction` is between 0 and 1 and never reaches 1. */
const wedgePath = (fraction) => {
  const centre = PIE_SIZE / 2;
  const angle = fraction * 2 * Math.PI;
  const x = centre + PIE_RADIUS * Math.sin(angle);
  const y = centre - PIE_RADIUS * Math.cos(angle);
  return `M ${centre} ${centre} L ${centre} ${centre - PIE_RADIUS} A ${PIE_RADIUS} ${PIE_RADIUS} 0 ${fraction > 0.5 ? 1 : 0} 1 ${x} ${y} Z`;
};

/** A share as a slice of a pie. `share` is a percent, or `[filled, total]`. `hue` colours the filled slice. */
const Pie = ({ share, hue }) => {
  const fraction = typeof share === 'number' ? share / 100 : share[0] / share[1];
  return (
    <svg width={PIE_SIZE} height={PIE_SIZE} viewBox={`0 0 ${PIE_SIZE} ${PIE_SIZE}`} aria-hidden="true" className="shrink-0">
      <circle cx={PIE_SIZE / 2} cy={PIE_SIZE / 2} r={PIE_RADIUS} fill="#FFFFFF" />
      <path d={wedgePath(fraction)} className={hue.wedge} />
      <circle cx={PIE_SIZE / 2} cy={PIE_SIZE / 2} r={PIE_RADIUS} fill="none" stroke="#8A877E" strokeWidth="1.5" />
    </svg>
  );
};

export default Pie;
