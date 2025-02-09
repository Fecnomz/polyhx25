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
  onMarkerClick: (marker: MarkerData) => void;
}

const GlobeComponent: React.FC<GlobeComponentProps> = ({
  markers,
  backgroundColor = '#000000',
  onMarkerClick
}) => {
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (globeContainerRef.current && !globeRef.current) {
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

      globeRef.current = new Globe(globeContainerRef.current)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-day.jpg')
        .atmosphereColor('#ffffff')
        .htmlElementsData(clusters)
        .htmlElement((d) => {
          const cluster = d as ClusterData;
          const baseSize = cluster.markers[0].size;

          const initialOffset = 6;
          const hoverSpacing = baseSize + 5;
          const liftAmount = 10;

          const container = document.createElement('div');
          container.style.position = 'relative';
          container.style.width = `${baseSize}px`;
          container.style.height = `${baseSize}px`;
          container.style.cursor = 'pointer';
          container.style.pointerEvents = 'auto';

          let expandTimeout: number | null = null;
          let collapseTimeout: number | null = null;

          cluster.markers.forEach((marker, index) => {
            const img = document.createElement('img');
            img.src = marker.pictogram;
            img.style.width = `${baseSize}px`;
            img.style.height = 'auto';
            img.style.position = 'absolute';
            img.style.top = '0';
            img.style.left = `${index * initialOffset}px`;
            img.style.transition = 'transform 0.3s ease';
            img.style.zIndex = `${index}`;
            img.style.pointerEvents = 'auto';

            img.addEventListener('click', (e) => {
              e.stopPropagation();
              console.info(marker);
              onMarkerClick(marker);

              globeRef.current.pointOfView(
                { lat: marker.lat, lng: marker.lng, altitude: 0.75 },
                1500
              );
            });

            container.appendChild(img);
          });

          container.addEventListener('mouseenter', () => {
            if (collapseTimeout) {
              clearTimeout(collapseTimeout);
              collapseTimeout = null;
            }

            expandTimeout = window.setTimeout(() => {
              Array.from(container.children).forEach((child, i) => {
                (child as HTMLElement).style.transition = 'transform 0.2s ease-out';
                (child as HTMLElement).style.transform = `translate(${i * hoverSpacing}px, -${liftAmount}px)`;
                (child as HTMLElement).style.zIndex = '100';
              });
            }, 100);
          });

          container.addEventListener('mouseleave', () => {
            if (expandTimeout) {
              clearTimeout(expandTimeout);
              expandTimeout = null;
            }

            collapseTimeout = window.setTimeout(() => {
              Array.from(container.children).forEach((child, i) => {
                (child as HTMLElement).style.transition = 'transform 0.3s ease-in-out';
                (child as HTMLElement).style.transform = `translate(${i * initialOffset}px, 0px)`;
                (child as HTMLElement).style.zIndex = `${i}`;
              });
            }, 200);
          });

          return container;
        });

      globeRef.current.scene().background = new THREE.Color(backgroundColor);
    }
  }, [markers, backgroundColor, onMarkerClick]);

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
