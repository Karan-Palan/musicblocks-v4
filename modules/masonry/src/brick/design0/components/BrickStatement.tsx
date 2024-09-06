import React from 'react';
import type { IBrickStatement } from '@/@types/brick';

/**
 * Props for BrickStatement component.
 */
interface BrickStatementProps {
  instance: IBrickStatement;
}

/**
 * Component to render a BrickStatement.
 * @param props - The props for BrickStatement.
 * @returns JSX.Element representing the BrickStatement as an SVG.
 */
const BrickStatementComponent: React.FC<BrickStatementProps> = ({ instance }) => {
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

export default BrickStatementComponent;
