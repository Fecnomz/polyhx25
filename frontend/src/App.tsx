import React from 'react';
import GlobeComponent, { MarkerData } from './components/GlobeComponent';

const markers: MarkerData[] = [
  { lat: 37.7749, lng: -122.4194, size: 30, pictogram: 'TODO' },
];

const App: React.FC = () => {
  return <GlobeComponent markers={markers} backgroundColor='#ff00ff'/>;
};

export default App;
