import React from 'react';
import './App.css';
import Theatre from './Theatre';

function App() {
  return (
    <div className="app-container">
      <Theatre category="club" numberOfSeats="3"/>
    </div>
  );
}

export default App;
