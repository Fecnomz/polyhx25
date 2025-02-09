import React, { useState } from 'react';
import Layout from './components/Layout';
import GlobeComponent, { MarkerData } from './components/GlobeComponent';

const markers: MarkerData[] = [
  {
    lat: 37.7749,
    lng: -122.4194,
    size: 45,
    pictogram:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMsHt2ljgxvaDbA9OXpW_B5Y9Oz0DyJZAiwg&s'
  },
  {
    lat: 37.7750,
    lng: -122.4195,
    size: 45,
    pictogram:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMsHt2ljgxvaDbA9OXpW_B5Y9Oz0DyJZAiwg&s'
  }, 
  {
    lat: 37.7750,
    lng: -122.4195,
    size: 45,
    pictogram:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMsHt2ljgxvaDbA9OXpW_B5Y9Oz0DyJZAiwg&s'
  }
];

const App: React.FC = () => {
    const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
    const [panelOpen, setPanelOpen] = useState(false);

    const openPanel = (marker: MarkerData) => {
        setSelectedMarker(marker);
        setPanelOpen(true);
    };

    return (
        <Layout
            globe={<GlobeComponent markers={markers} onMarkerClick={openPanel} />}
            panelOpen={panelOpen}
            selectedMarker={selectedMarker}
            closePanel={() => setPanelOpen(false)}
        />
    );
};

export default App;