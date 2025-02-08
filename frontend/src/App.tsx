import React from 'react';
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
    lat: 37.7750, // very close to the first marker
    lng: -122.4195,
    size: 45,
    pictogram:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMsHt2ljgxvaDbA9OXpW_B5Y9Oz0DyJZAiwg&s'
  }, 
  {
    lat: 37.7750, // very close to the first marker
    lng: -122.4195,
    size: 45,
    pictogram:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMsHt2ljgxvaDbA9OXpW_B5Y9Oz0DyJZAiwg&s'
  }
];

const App: React.FC = () => {
  return <GlobeComponent markers={markers} backgroundColor="#ff00ff" />;
};

export default App;
