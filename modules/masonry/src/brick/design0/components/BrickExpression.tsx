import React from 'react';
import type { IBrickExpression } from '@/@types/brick';

/**
 * Props for BrickExpression component.
 */
interface BrickExpressionProps {
  instance: IBrickExpression;
}

/**
 * Component to render a BrickExpression.
 * @param props - The props for BrickExpression.
 * @returns JSX.Element representing the BrickExpression as an SVG.
 */
const BrickExpressionComponent: React.FC<BrickExpressionProps> = ({ instance }) => {
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

export default BrickExpressionComponent;
