import React from 'react';
import { MarkerData } from './GlobeComponent';

interface SidePanelProps {
  marker: MarkerData | null;
  onClose: () => void;
}

const SidePanel: React.FC<SidePanelProps> = ({ marker, onClose }) => {
  if (!marker) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '50vw',
        height: '100vh',
        background: '#222',
        color: '#fff',
        boxShadow: '-4px 0 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '15px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s ease',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: '24px',
          cursor: 'pointer',
        }}
      >
        ✕
      </button>
      <h2>Marker Details</h2>
      <p>Latitude: {marker.lat}</p>
      <p>Longitude: {marker.lng}</p>
      <img
        src={marker.pictogram}
        alt="Marker"
        style={{ width: '80px', height: 'auto', borderRadius: '10px', marginTop: '10px' }}
      />
    </div>
  );
};

export default SidePanel;