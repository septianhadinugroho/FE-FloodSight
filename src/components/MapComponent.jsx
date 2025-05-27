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

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS.V2,
      center: position,
      zoom: 12
    });

    map.current.on('error', (error) => {
      console.error('Map error:', error);
    });

    map.current.on('load', () => {
      console.log('Map loaded successfully');

      try {
        map.current.addSource('flood-data', {
          type: 'geojson',
          data: '/geojson/banjir_jabodetabek_fix.geojson',
          cluster: false
        });

        map.current.addLayer({
          id: 'flood-lines',
          type: 'line',
          source: 'flood-data',
          filter: ['==', '$type', 'LineString'],
          paint: {
            'line-color': [
              'match',
              ['get', 'risk_level'],
              'critical', '#FF0000',
              'very_high', '#FF4500',
              'high', '#FF8C00',
              'medium', '#FFA500',
              '#FFD700'
            ],
            'line-width': 4,
            'line-opacity': 0.8
          }
        });

        map.current.addLayer({
          id: 'flood-points',
          type: 'circle',
          source: 'flood-data',
          filter: ['==', '$type', 'Point'],
          paint: {
            'circle-radius': 8,
            'circle-color': [
              'match',
              ['get', 'risk_level'],
              'critical', '#FF0000',
              'very_high', '#FF4500',
              'high', '#FF8C00',
              'medium', '#FFA500',
              '#FFD700'
            ],
            'circle-stroke-width': 2,
            'circle-stroke-color': '#FFFFFF'
          }
        });

        marker.current = new maptilersdk.Marker({
          draggable: true,
          color: '#3B82F6'
        })
          .setLngLat(position)
          .addTo(map.current);

        marker.current.on('dragend', () => {
          const { lng, lat } = marker.current.getLngLat();
          setPosition([lng, lat]);
          map.current.flyTo({
            center: [lng, lat],
            essential: true
          });
        });

        const createPopup = (e) => {
          const feature = e.features[0];
          if (!feature.properties) return;

          new maptilersdk.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
              <div class="p-2">
                <h3 class="font-bold">${feature.properties.name || 'Unnamed Location'}</h3>
                <p>${feature.properties.popupContent || ''}</p>
                <p class="mt-1 text-sm">Risk Level: 
                  <span class="font-semibold">${feature.properties.risk_level || 'unknown'}</span>
                </p>
              </div>
            `)
            .addTo(map.current);
        };

        map.current.on('click', 'flood-points', createPopup);
        map.current.on('click', 'flood-lines', createPopup);

        map.current.on('mouseenter', ['flood-points', 'flood-lines'], () => {
          map.current.getCanvas().style.cursor = 'pointer';
        });

        map.current.on('mouseleave', ['flood-points', 'flood-lines'], () => {
          map.current.getCanvas().style.cursor = '';
        });

      } catch (error) {
        console.error('Error loading map layers:', error);
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
      marker.current.setLngLat(position);
      map.current.flyTo({
        center: position,
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