import React from 'react';
import {
  createBrickBlock,
  createBrickData,
  createBrickExpression,
  createBrickStatement,
} from '../brickFactory';
import BrickDataComponent from './BrickData';
import BrickBlockComponent from './BrickBlock';
import BrickExpressionComponent from './BrickExpression';
import BrickStatementComponent from './BrickStatement';
import type { TColor } from '@/@types/brick';

type BrickType = 'block' | 'data' | 'expression' | 'statement';

interface BrickWrapperProps {
  type: BrickType;
  params:
    | {
        name: string;
        label: string;
        glyph: string;
        args: { id: string; label: string }[];
        colorBg: TColor;
        colorFg: TColor;
        colorBgHighlight: TColor;
        colorFgHighlight: TColor;
        outline: TColor;
        scale: number;
        connectAbove: boolean;
        connectBelow: boolean;
        nestLengthY: number;
        folded?: boolean;
      }
    | {
        name: string;
        label: string;
        glyph: string;
        dynamic: boolean;
        value?: boolean | number | string;
        input?: 'boolean' | 'number' | 'string' | 'options';
        colorBg: TColor;
        colorFg: TColor;
        colorBgHighlight: TColor;
        colorFgHighlight: TColor;
        outline: TColor;
        scale: number;
      }
    | {
        name: string;
        label: string;
        glyph: string;
        args: Record<string, { label: string; dataType: string; meta: unknown }>;
        colorBg: TColor;
        colorFg: TColor;
        colorBgHighlight: TColor;
        colorFgHighlight: TColor;
        outline: TColor;
        scale: number;
      }
    | {
        name: string;
        label: string;
        glyph: string;
        args: Record<string, { label: string; dataType: string; meta: unknown }>;
        colorBg: TColor;
        colorFg: TColor;
        colorBgHighlight: TColor;
        colorFgHighlight: TColor;
        outline: TColor;
        scale: number;
        connectAbove: boolean;
        connectBelow: boolean;
      };
}

/**
 * Higher-order component to wrap different brick components.
 * @param props - The props for BrickWrapper.
 * @returns JSX.Element representing the specific brick component.
 */
const BrickWrapper: React.FC<BrickWrapperProps> = ({ type, params }) => {
  switch (type) {
    case 'block': {
      const instance = createBrickBlock(
        params as {
          name: string;
          label: string;
          glyph: string;
          args: { id: string; label: string }[];
          colorBg: TColor;
          colorFg: TColor;
          colorBgHighlight: TColor;
          colorFgHighlight: TColor;
          outline: TColor;
          scale: number;
          connectAbove: boolean;
          connectBelow: boolean;
          nestLengthY: number;
          folded?: boolean;
        },
      );
      return <BrickBlockComponent instance={instance} />;
    }

    case 'data': {
      const instance = createBrickData(
        params as {
          name: string;
          label: string;
          glyph: string;
          dynamic: boolean;
          value?: boolean | number | string;
          input?: 'boolean' | 'number' | 'string' | 'options';
          colorBg: TColor;
          colorFg: TColor;
          colorBgHighlight: TColor;
          colorFgHighlight: TColor;
          outline: TColor;
          scale: number;
        },
      );
      return <BrickDataComponent instance={instance} />;
    }

    case 'expression': {
      const instance = createBrickExpression(
        params as {
          name: string;
          label: string;
          glyph: string;
          args: Record<string, { label: string; dataType: string; meta: unknown }>;
          colorBg: TColor;
          colorFg: TColor;
          colorBgHighlight: TColor;
          colorFgHighlight: TColor;
          outline: TColor;
          scale: number;
        },
      );
      return <BrickExpressionComponent instance={instance} />;
    }

    case 'statement': {
      const instance = createBrickStatement(
        params as {
          name: string;
          label: string;
          glyph: string;
          args: Record<string, { label: string; dataType: string; meta: unknown }>;
          colorBg: TColor;
          colorFg: TColor;
          colorBgHighlight: TColor;
          colorFgHighlight: TColor;
          outline: TColor;
          scale: number;
          connectAbove: boolean;
          connectBelow: boolean;
        },
      );
      return <BrickStatementComponent instance={instance} />;
    }

    default:
      return null;
  }
};

export default BrickWrapper;
