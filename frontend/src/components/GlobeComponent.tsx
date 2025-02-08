import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';

export interface MarkerData {
  lat: number;
  lng: number;
  size: number;
  pictogram: string;
}

interface GlobeComponentProps {
  markers: MarkerData[];
}

const GlobeComponent: React.FC<GlobeComponentProps> = ({ markers }) => {
  const globeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (globeContainerRef.current) {
      new Globe(globeContainerRef.current)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-day.jpg')
        .htmlElementsData(markers)
        .htmlElement((d) => {
          const marker = d as MarkerData;
          const el = document.createElement('div');
          const img = document.createElement('img');
          img.src = marker.pictogram;
          img.style.width = `${marker.size}px`;
          img.style.height = 'auto';
          el.style.pointerEvents = 'auto';
          el.style.cursor = 'pointer';
          el.onclick = () => console.info(marker);
          el.appendChild(img);
          return el;
        });
    }
  }, [markers]);

  return (
    <div
      ref={globeContainerRef}
      style={{ width: '100vw', height: '100vh', margin: 0 }}
    />
  );
};

export default GlobeComponent;
