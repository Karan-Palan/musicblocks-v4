import React from 'react';
import type { IBrickData } from '@/@types/brick';

/**
 * Props for BrickData component.
 */
interface BrickDataProps {
  instance: IBrickData; // The instance of BrickData
}

/**
 * Component to render a BrickData.
 * @param props - The props for BrickData.
 * @returns JSX.Element representing the BrickData as an SVG.
 */
const BrickDataComponent: React.FC<BrickDataProps> = ({ instance }) => {
  const renderProps = instance.renderProps();
  const { path: SVGpath, label, glyph, colorBg, colorFg, outline, scale } = renderProps;

  return (
    <g transform={`scale(${scale})`} id={instance.uuid}>
      <path
        d={SVGpath}
        style={{
          fill: colorBg,
          stroke: outline,
          strokeWidth: 1,
          strokeLinecap: 'round',
          strokeOpacity: 1,
        }}
      />
      {glyph && (
        <text x={5} y={20} style={{ fill: colorFg }}>
          {glyph}
        </text>
      )}
      {label && (
        <text x={25} y={20} style={{ fill: colorFg }}>
          {label}
        </text>
      )}
    </g>
  );
};

export default BrickDataComponent;
