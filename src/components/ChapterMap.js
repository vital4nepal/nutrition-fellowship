import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './ChapterMap.css';
import borders from '../data/chapterBorders.json';
import { chapterPages } from '../data/chapterPages';

// The OpenStreetMap tile policy asks for this exact address and for the credit to stay on the map.
const TILES = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const PIN_SIZE = 40;
// The Lucide MapPin shape, filled. Its tip is at 12, 22 in a 24 unit box, and the marker anchors there.
const pinIcon = (city) =>
  L.divIcon({
    className: '',
    iconSize: [PIN_SIZE, PIN_SIZE],
    iconAnchor: [PIN_SIZE / 2, (PIN_SIZE * 22) / 24],
    html: `<svg viewBox="0 0 24 24" width="${PIN_SIZE}" height="${PIN_SIZE}" class="overflow-visible" aria-hidden="true">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" class="fill-accent stroke-paper" stroke-width="1.5" />
      <circle cx="12" cy="10" r="3" class="fill-paper" />
      <text x="23" y="10" dominant-baseline="central" font-size="10" paint-order="stroke" stroke-width="4" stroke-linejoin="round" class="fill-ink stroke-paper font-semibold">${city}</text>
    </svg>`,
  });

const line = { interactive: false, fill: false };

/** A street map of one chapter country: its borders, its neighbours and a pin on the capital. */
export default function ChapterMap({ id, label }) {
  const frame = useRef(null);
  const { capital, at } = chapterPages[id];

  useEffect(() => {
    const node = frame.current;
    const { bounds, limit, land, inner, neighbours } = borders[id];
    // On a phone a drag over the map must scroll the page, so the map takes drags only after a tap.
    const map = L.map(node, {
      scrollWheelZoom: false,
      dragging: !L.Browser.mobile,
      zoomSnap: 0.5,
      maxBounds: limit,
      maxBoundsViscosity: 1,
    });
    map.attributionControl.setPrefix(false);
    L.tileLayer(TILES, { attribution: ATTRIBUTION, maxZoom: 19 }).addTo(map);

    L.polyline(neighbours, { ...line, weight: 1.5, className: 'stroke-line-strong' }).addTo(map);
    // Each ring is its own polygon. As rings of one polygon, the islands would be cut out as holes.
    L.polygon(land.map((ring) => [ring]), { interactive: false, weight: 2.5, fillOpacity: 1, className: 'fill-meadow/30 stroke-green' }).addTo(map);
    L.polyline(inner, { ...line, weight: 1, className: 'stroke-green' }).addTo(map);
    L.marker(at, { icon: pinIcon(capital), interactive: false, keyboard: false }).addTo(map);

    map.fitBounds(bounds, { padding: [16, 16] });
    map.setMinZoom(map.getZoom());

    const arm = () => {
      map.scrollWheelZoom.enable();
      map.dragging.enable();
    };
    const disarm = (event) => {
      if (node.contains(event.relatedTarget)) return;
      map.scrollWheelZoom.disable();
      if (L.Browser.mobile) map.dragging.disable();
    };
    // A tap outside does not always move the focus on a phone, so it drops the focus by hand.
    const release = (event) => {
      if (!node.contains(event.target) && node.contains(document.activeElement)) document.activeElement.blur();
    };
    map.on('click', () => node.focus({ preventScroll: true }));
    node.addEventListener('focusin', arm);
    node.addEventListener('focusout', disarm);
    document.addEventListener('pointerdown', release);

    return () => {
      document.removeEventListener('pointerdown', release);
      node.removeEventListener('focusin', arm);
      node.removeEventListener('focusout', disarm);
      map.remove();
    };
  }, [id, capital, at]);

  return (
    <div
      ref={frame}
      role="region"
      aria-label={`Map of ${label}. A pin marks ${capital}, the capital.`}
      className="isolate h-full w-full"
    />
  );
}
