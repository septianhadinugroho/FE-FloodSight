import { useEffect, useRef } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

maptilersdk.config.apiKey = 'fvfICxsPxewVtLpHCE4g';
maptilersdk.config.primaryLanguage = 'id';
maptilersdk.config.logoPosition = 'bottom-left';

export default function MapComponent({ position = [106.8272, -6.1751], setPosition }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  // Jabodetabek bounds (updated)
  const jabodetabekBounds = [
    [106.3, -6.8], // Southwest
    [107.2, -5.7]  // Northeast
  ];

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS.V2,
      center: position,
      zoom: 12,
      maxBounds: jabodetabekBounds // Restrict map to Jabodetabek
    });

    map.current.on('error', (error) => {
      console.error('Map error:', error);
    });

    map.current.on('load', () => {
      console.log('Map loaded successfully');

      try {
        marker.current = new maptilersdk.Marker({
          draggable: true,
          color: '#3B82F6'
        })
          .setLngLat(position)
          .addTo(map.current);

        marker.current.on('dragend', () => {
          const { lng, lat } = marker.current.getLngLat();
          const boundedLng = Math.max(106.3, Math.min(107.2, lng));
          const boundedLat = Math.max(-6.8, Math.min(-5.7, lat));
          console.log('Marker dragged to:', [boundedLng, boundedLat]);
          setPosition([boundedLng, boundedLat]);
          map.current.flyTo({
            center: [boundedLng, boundedLat],
            essential: true
          });
        });

        // Add map click event to move marker
        map.current.on('click', (e) => {
          const { lng, lat } = e.lngLat;
          const boundedLng = Math.max(106.3, Math.min(107.2, lng));
          const boundedLat = Math.max(-6.8, Math.min(-5.7, lat));
          console.log('Map clicked at:', [boundedLng, boundedLat]);
          marker.current.setLngLat([boundedLng, boundedLat]);
          setPosition([boundedLng, boundedLat]);
          map.current.flyTo({
            center: [boundedLng, boundedLat],
            essential: true
          });
        });
      } catch (error) {
        console.error('Error setting up map:', error);
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (map.current && marker.current && position) {
      const boundedLng = Math.max(106.3, Math.min(107.2, position[0]));
      const boundedLat = Math.max(-6.8, Math.min(-5.7, position[1]));
      marker.current.setLngLat([boundedLng, boundedLat]);
      map.current.flyTo({
        center: [boundedLng, boundedLat],
        essential: true
      });
    }
  }, [position]);

  return (
    <div
      ref={mapContainer}
      className="h-[70vh] md:h-[500px] w-full rounded-lg border-2 border-gray-300 mb-4"
    />
  );
}