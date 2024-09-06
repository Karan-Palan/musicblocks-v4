import React from 'react';
import type { IBrickBlock } from '@/@types/brick';

/**
 * Props for BrickBlock component.
 */
interface BrickBlockProps {
  instance: IBrickBlock;
}

/**
 * Component to render a BrickBlock.
 * @param props - The props for BrickBlock.
 * @returns JSX.Element representing the BrickBlock as an SVG.
 */
const BrickBlockComponent: React.FC<BrickBlockProps> = ({ instance }) => {
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

export default BrickBlockComponent;
