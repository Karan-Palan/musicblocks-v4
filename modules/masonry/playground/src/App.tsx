import React from 'react';
import DivStack from './components/DivStack';
import NormalSVG from './components/NormalSVG';
import SVGWithValues from './components/SVGWithValues';

const App: React.FC = () => {
  return (
    <div>
      <h1>Div Stack</h1>
      <DivStack />
      <h1>Normal SVG</h1>
      <NormalSVG />
      <h1>SVG With Values</h1>
      <SVGWithValues />
    </div>
  );
};

export default App;
