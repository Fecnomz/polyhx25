import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three';

export interface MarkerData {
  lat: number;
  lng: number;
  size: number;
  pictogram: string;
}

interface ClusterData {
  lat: number;
  lng: number;
  markers: MarkerData[];
}

interface GlobeComponentProps {
  markers: MarkerData[];
  backgroundColor?: string;
}

const GlobeComponent: React.FC<GlobeComponentProps> = ({
  markers,
  backgroundColor = '#000000'
}) => {
  const globeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (globeContainerRef.current) {
      const clusters: ClusterData[] = [];
      const threshold = 0.5;
      markers.forEach(marker => {
        let added = false;
        for (const cluster of clusters) {
          const firstMarker = cluster.markers[0];
          if (
            Math.abs(firstMarker.lat - marker.lat) < threshold &&
            Math.abs(firstMarker.lng - marker.lng) < threshold
          ) {
            cluster.markers.push(marker);
            added = true;
            break;
          }
        }
        if (!added) {
          clusters.push({ lat: marker.lat, lng: marker.lng, markers: [marker] });
        }
      });

      const globe = new Globe(globeContainerRef.current)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-day.jpg')
        .atmosphereColor('#ffffff')
        .htmlElementsData(clusters)
        .htmlElement((d) => {
          const cluster = d as ClusterData;

          if (cluster.markers.length === 1) {
            const marker = cluster.markers[0];
            const el = document.createElement('div');
            el.style.pointerEvents = 'auto';
            el.style.cursor = 'pointer';
            el.onclick = () => console.info(marker);

            const img = document.createElement('img');
            img.src = marker.pictogram;
            img.style.width = marker.size + 'px';
            img.style.height = 'auto';
            img.style.transition = 'transform 0.3s ease';

            el.appendChild(img);

            el.addEventListener('mouseenter', () => {
              img.style.transform = 'scale(1.2)';
            });
            el.addEventListener('mouseleave', () => {
              img.style.transform = 'scale(1)';
            });
            return el;
          }

          const baseSize = cluster.markers[0].size;

          const initialOffset = 10; 
          const hoverSpacing = baseSize + 5; 
          const liftAmount = 10;

          const containerWidth = baseSize + (cluster.markers.length - 1) * initialOffset;

          const container = document.createElement('div');
          container.style.position = 'relative';
          container.style.width = containerWidth + 'px';
          container.style.height = baseSize + 'px';
          container.style.cursor = 'pointer';
          container.style.transition = 'width 0.3s ease';
          container.style.pointerEvents = 'auto';

          cluster.markers.forEach((marker, index) => {
            const img = document.createElement('img');
            img.src = marker.pictogram;
            img.style.width = baseSize + 'px';
            img.style.height = 'auto';
            img.style.position = 'absolute';
            img.style.top = '0';
            img.style.transform = `translate(${index * initialOffset}px, 0px)`;
            img.style.transition = 'transform 0.3s ease';
            img.style.zIndex = `${index}`;

            img.addEventListener('click', (e) => {
              e.stopPropagation();
              console.info(marker);
            });
            container.appendChild(img);
          });

          let expandTimeout: number | null = null;

          container.addEventListener('mouseenter', () => {
            Array.from(container.children).forEach((child, i) => {
              (child as HTMLElement).style.transition = 'transform 0.2s ease';
              (child as HTMLElement).style.transform = `translate(${i * initialOffset}px, -${liftAmount}px)`;
            });
            expandTimeout = window.setTimeout(() => {
              Array.from(container.children).forEach((child, i) => {
                (child as HTMLElement).style.transition = 'transform 0.3s ease';
                (child as HTMLElement).style.transform = `translate(${i * hoverSpacing}px, -${liftAmount}px)`;
              });
              const newWidth = baseSize + (cluster.markers.length - 1) * hoverSpacing;
              container.style.transition = 'width 0.3s ease';
              container.style.width = newWidth + 'px';
            }, 200);
          });

          container.addEventListener('mouseleave', () => {
            if (expandTimeout) {
              clearTimeout(expandTimeout);
              expandTimeout = null;
            }
            Array.from(container.children).forEach((child, i) => {
              (child as HTMLElement).style.transition = 'transform 0.3s ease';
              (child as HTMLElement).style.transform = `translate(${i * initialOffset}px, 0px)`;
            });
            container.style.transition = 'width 0.3s ease';
            container.style.width = containerWidth + 'px';
          });

          return container;
        });

      globe.scene().background = new THREE.Color(backgroundColor);
    }
  }, [markers, backgroundColor]);

  return (
    <div
      ref={globeContainerRef}
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0
      }}
    />
  );
};

export default GlobeComponent;
