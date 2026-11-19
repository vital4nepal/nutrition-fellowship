import React from 'react';

const PIE_SIZE = 80;

/** The wedge of a pie `size` wide from 12 o'clock, clockwise. `fraction` is between 0 and 1 and never reaches 1. */
const wedgePath = (fraction, size) => {
  const centre = size / 2;
  const radius = centre - 1;
  const angle = fraction * 2 * Math.PI;
  const x = centre + radius * Math.sin(angle);
  const y = centre - radius * Math.cos(angle);
  return `M ${centre} ${centre} L ${centre} ${centre - radius} A ${radius} ${radius} 0 ${fraction > 0.5 ? 1 : 0} 1 ${x} ${y} Z`;
};

/** A share as a slice of a pie `size` pixels wide. `share` is a percent, or `[filled, total]`. `hue` colours the filled slice. */
const Pie = ({ share, hue, size = PIE_SIZE }) => {
  const fraction = typeof share === 'number' ? share / 100 : share[0] / share[1];
  const centre = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" className="shrink-0">
      <circle cx={centre} cy={centre} r={centre - 1} fill="#FFFFFF" />
      <path d={wedgePath(fraction, size)} className={hue.wedge} />
      <circle cx={centre} cy={centre} r={centre - 1} fill="none" stroke="#8A877E" strokeWidth="1.5" />
    </svg>
  );
};

export default Pie;
